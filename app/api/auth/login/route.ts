export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { createToken } from "@/lib/db/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 10 login attempts per minute per IP
    const ip = getClientIp(req.headers);
    const limit = rateLimit(`login:${ip}`, 10, 60_000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "試行回数が多すぎます。しばらく待ってからお試しください。" },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
    }

    const db = await getDB();
    const user = await db
      .prepare("SELECT id, email, password_hash FROM users WHERE email = ?")
      .bind(email)
      .first();

    if (!user) {
      return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
    }

    const token = await createToken(user.id, user.email);

    const response = NextResponse.json({ user: { id: user.id, email: user.email } });
    response.cookies.set("ai-dojo-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "ログインに失敗しました" }, { status: 500 });
  }
}
