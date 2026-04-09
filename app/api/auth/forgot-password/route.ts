export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  // Rate limit: 3 reset requests per minute per IP
  const ip = getClientIp(req.headers);
  const limit = rateLimit(`forgot:${ip}`, 3, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "試行回数が多すぎます。しばらく待ってからお試しください。" },
      { status: 429 }
    );
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "メールアドレスは必須です" }, { status: 400 });
    }

    const db = await getDB();
    const user = await db
      .prepare("SELECT id, email FROM users WHERE email = ?")
      .bind(email)
      .first();

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ ok: true });
    }

    // Generate token (URL-safe)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token in DB
    await db
      .prepare(
        "UPDATE users SET password_reset_token = ?, password_reset_expires = ? WHERE id = ?"
      )
      .bind(token, expires.toISOString(), user.id)
      .run();

    // Send email
    await sendPasswordResetEmail(user.email as string, token);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "処理に失敗しました" }, { status: 500 });
  }
}
