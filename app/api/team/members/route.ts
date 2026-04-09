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

  // Check if user is team_admin or team_member
  const profile = await db
    .prepare("SELECT role FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  if (profile?.role !== "team_admin" && profile?.role !== "team_member" && profile?.role !== "admin") {
    return NextResponse.json({ error: "チーム機能へのアクセス権がありません" }, { status: 403 });
  }

  // Find org the user belongs to
  const membership = await db
    .prepare("SELECT org_id FROM org_members WHERE user_id = ?")
    .bind(user.userId)
    .first();

  if (!membership) {
    // If team_admin but no org, create one
    if (profile?.role === "team_admin") {
      const userInfo = await db
        .prepare("SELECT name, company FROM users WHERE id = ?")
        .bind(user.userId)
        .first();

      const orgResult = await db
        .prepare("INSERT INTO organizations (name, owner_user_id) VALUES (?, ?) RETURNING id")
        .bind(userInfo?.company || userInfo?.name || "チーム", user.userId)
        .first();

      if (orgResult) {
        await db
          .prepare("INSERT INTO org_members (org_id, user_id, role) VALUES (?, ?, 'admin')")
          .bind(orgResult.id, user.userId)
          .run();

        return NextResponse.json({ orgName: userInfo?.company || "チーム", members: [] });
      }
    }
    return NextResponse.json({ error: "チームが見つかりません" }, { status: 404 });
  }

  const org = await db
    .prepare("SELECT name FROM organizations WHERE id = ?")
    .bind(membership.org_id)
    .first();

  const members = await db
    .prepare(`
      SELECT
        om.id, om.user_id, u.email, u.name, om.role, om.joined_at,
        COALESCE(lp.cnt, 0) as lessons_completed
      FROM org_members om
      JOIN users u ON u.id = om.user_id
      LEFT JOIN (
        SELECT user_id, COUNT(*) as cnt FROM lesson_progress WHERE completed = true GROUP BY user_id
      ) lp ON lp.user_id = om.user_id
      WHERE om.org_id = ?
      ORDER BY om.joined_at ASC
    `)
    .bind(membership.org_id)
    .all();

  return NextResponse.json({
    orgName: org?.name || "チーム",
    members: members.results,
  });
}

export async function POST(req: NextRequest) {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const db = await getDB();

  // Check team_admin role
  const profile = await db
    .prepare("SELECT role FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  if (profile?.role !== "team_admin" && profile?.role !== "admin") {
    return NextResponse.json({ error: "メンバー追加の権限がありません" }, { status: 403 });
  }

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "メールアドレスは必須です" }, { status: 400 });
  }

  // Find user by email
  const targetUser = await db
    .prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first();

  if (!targetUser) {
    return NextResponse.json({ error: "このメールアドレスのユーザーが見つかりません" }, { status: 404 });
  }

  // Find org
  const membership = await db
    .prepare("SELECT org_id FROM org_members WHERE user_id = ?")
    .bind(user.userId)
    .first();

  if (!membership) {
    return NextResponse.json({ error: "チームが見つかりません" }, { status: 404 });
  }

  // Add member
  try {
    await db
      .prepare("INSERT INTO org_members (org_id, user_id, role) VALUES (?, ?, 'member')")
      .bind(membership.org_id, targetUser.id)
      .run();

    // Update user role to team_member
    await db
      .prepare("UPDATE users SET role = 'team_member' WHERE id = ? AND role = 'free'")
      .bind(targetUser.id)
      .run();
  } catch {
    return NextResponse.json({ error: "このユーザーは既にメンバーです" }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const db = await getDB();

  const profile = await db
    .prepare("SELECT role FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  if (profile?.role !== "team_admin" && profile?.role !== "admin") {
    return NextResponse.json({ error: "メンバー削除の権限がありません" }, { status: 403 });
  }

  const { userId: targetUserId } = await req.json();

  const membership = await db
    .prepare("SELECT org_id FROM org_members WHERE user_id = ?")
    .bind(user.userId)
    .first();

  if (!membership) {
    return NextResponse.json({ error: "チームが見つかりません" }, { status: 404 });
  }

  await db
    .prepare("DELETE FROM org_members WHERE org_id = ? AND user_id = ?")
    .bind(membership.org_id, targetUserId)
    .run();

  // Revert role to free
  await db
    .prepare("UPDATE users SET role = 'free' WHERE id = ? AND role = 'team_member'")
    .bind(targetUserId)
    .run();

  return NextResponse.json({ ok: true });
}
