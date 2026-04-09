export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/db/auth";
import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "現在のパスワードと新しいパスワードは必須です" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "新しいパスワードは8文字以上にしてください" }, { status: 400 });
  }

  const db = await getDB();
  const dbUser = await db
    .prepare("SELECT password_hash FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  if (!dbUser) {
    return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, dbUser.password_hash as string);
  if (!valid) {
    return NextResponse.json({ error: "現在のパスワードが正しくありません" }, { status: 401 });
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await db
    .prepare("UPDATE users SET password_hash = ? WHERE id = ?")
    .bind(newHash, user.userId)
    .run();

  return NextResponse.json({ ok: true });
}
