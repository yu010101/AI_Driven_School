export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/db/auth";
import { getDB } from "@/lib/db";
import { getUserPlan } from "@/lib/subscription";

export async function GET() {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const db = await getDB();
  const profile = await db
    .prepare("SELECT name, company, role FROM users WHERE id = ?")
    .bind(user.userId)
    .first();

  const subscription = await getUserPlan(user.userId);

  return NextResponse.json({
    user: {
      userId: user.userId,
      email: user.email,
      name: profile?.name || null,
      company: profile?.company || null,
      role: profile?.role || "free",
      plan: subscription.plan,
      planStatus: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    },
  });
}
