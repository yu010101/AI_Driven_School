export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { createToken } from "@/lib/db/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, company } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
    }

    const db = await getDB();

    // Check if user exists
    const existing = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (existing) {
      return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 409 });
    }

    // Create user
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db
      .prepare("INSERT INTO users (email, password_hash, name, company) VALUES (?, ?, ?, ?) RETURNING id, email")
      .bind(email, passwordHash, name || null, company || null)
      .first();

    if (!result) {
      return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
    }

    const token = await createToken(result.id, result.email);

    const response = NextResponse.json({ user: { id: result.id, email: result.email } });
    response.cookies.set("ai-dojo-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
  }
}
