export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/db/auth";
import { getDB } from "@/lib/db";

export async function GET() {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const db = await getDB();

  // Check admin role
  const profile = await db
    .prepare("SELECT role FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const result = await db
    .prepare(`
      SELECT
        u.id, u.email, u.name, u.role, u.created_at,
        COALESCE(s.plan, 'free') as plan,
        COALESCE(lp.cnt, 0) as lessons_completed
      FROM users u
      LEFT JOIN subscriptions s ON s.user_id = u.id AND s.status = 'active'
      LEFT JOIN (
        SELECT user_id, COUNT(*) as cnt FROM lesson_progress WHERE completed = true GROUP BY user_id
      ) lp ON lp.user_id = u.id
      ORDER BY u.created_at DESC
      LIMIT 500
    `)
    .all();

  return NextResponse.json({ users: result.results });
}
