export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/db/auth";
import { getDB } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const db = await getDB();

  // Cancel Stripe subscription if exists
  try {
    const sub = await db
      .prepare("SELECT stripe_subscription_id FROM subscriptions WHERE user_id = ? AND status = 'active'")
      .bind(user.userId)
      .first();

    if (sub?.stripe_subscription_id) {
      await getStripe().subscriptions.cancel(sub.stripe_subscription_id as string);
    }
  } catch (err) {
    console.error("Failed to cancel Stripe subscription:", err);
  }

  // Delete user data (cascades to lesson_progress, quiz_results, subscriptions, org_members)
  await db.prepare("DELETE FROM subscriptions WHERE user_id = ?").bind(user.userId).run();
  await db.prepare("DELETE FROM lesson_progress WHERE user_id = ?").bind(user.userId).run();
  await db.prepare("DELETE FROM quiz_results WHERE user_id = ?").bind(user.userId).run();
  await db.prepare("DELETE FROM org_members WHERE user_id = ?").bind(user.userId).run();
  await db.prepare("DELETE FROM users WHERE id = ?").bind(user.userId).run();

  // Clear auth cookie
  const response = NextResponse.json({ ok: true });
  response.cookies.set("ai-dojo-token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
