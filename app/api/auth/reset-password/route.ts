export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "トークンと新しいパスワードは必須です" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "パスワードは8文字以上にしてください" }, { status: 400 });
    }

    const db = await getDB();

    // Find user with valid token
    const user = await db
      .prepare(
        "SELECT id, email FROM users WHERE password_reset_token = ? AND password_reset_expires > NOW()"
      )
      .bind(token)
      .first();

    if (!user) {
      return NextResponse.json(
        { error: "リンクが無効または期限切れです。もう一度パスワードリセットを依頼してください。" },
        { status: 400 }
      );
    }

    // Update password and clear token
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db
      .prepare(
        "UPDATE users SET password_hash = ?, password_reset_token = NULL, password_reset_expires = NULL WHERE id = ?"
      )
      .bind(passwordHash, user.id)
      .run();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "パスワードリセットに失敗しました" }, { status: 500 });
  }
}
