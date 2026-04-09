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

  const profile = await db
    .prepare("SELECT role FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const [totalUsers, proUsers, teamUsers, totalLessons, recentSignups] = await Promise.all([
    db.prepare("SELECT COUNT(*) as count FROM users").first(),
    db.prepare("SELECT COUNT(*) as count FROM subscriptions WHERE plan = 'pro' AND status = 'active'").first(),
    db.prepare("SELECT COUNT(*) as count FROM subscriptions WHERE plan = 'team' AND status = 'active'").first(),
    db.prepare("SELECT COUNT(*) as count FROM lesson_progress WHERE completed = true").first(),
    db.prepare("SELECT COUNT(*) as count FROM users WHERE created_at > NOW() - INTERVAL '7 days'").first(),
  ]);

  return NextResponse.json({
    totalUsers: totalUsers?.count || 0,
    proUsers: proUsers?.count || 0,
    teamUsers: teamUsers?.count || 0,
    totalLessonsCompleted: totalLessons?.count || 0,
    recentSignups: recentSignups?.count || 0,
  });
}
