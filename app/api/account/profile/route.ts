export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/db/auth";
import { getDB } from "@/lib/db";

export async function GET() {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const db = await getDB();
  const profile = await db
    .prepare("SELECT id, email, name, company, role, created_at FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  if (!profile) {
    return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
  }

  return NextResponse.json({ profile });
}

export async function PATCH(req: NextRequest) {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const { name, company } = await req.json();
  const db = await getDB();

  await db
    .prepare("UPDATE users SET name = ?, company = ? WHERE id = ?")
    .bind(name || null, company || null, user.userId)
    .run();

  return NextResponse.json({ ok: true });
}
