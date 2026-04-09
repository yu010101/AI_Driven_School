import { getDB } from "@/lib/db";

export type UserPlan = "free" | "pro" | "team";

export interface SubscriptionInfo {
  plan: UserPlan;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string | null;
}

export async function getUserPlan(userId: number): Promise<SubscriptionInfo> {
  const db = await getDB();

  // Check user role override first (admin-granted)
  const user = await db
    .prepare("SELECT role FROM users WHERE id = ?")
    .bind(userId)
    .first();

  if (user?.role === "admin" || user?.role === "pro" || user?.role === "team_admin") {
    return {
      plan: user.role === "admin" ? "pro" : user.role === "team_admin" ? "team" : "pro",
      status: "active",
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      stripeCustomerId: null,
    };
  }

  // Check active subscription
  const sub = await db
    .prepare(
      "SELECT plan, status, current_period_end, cancel_at_period_end, stripe_customer_id FROM subscriptions WHERE user_id = ? AND status IN ('active', 'trialing') ORDER BY created_at DESC LIMIT 1"
    )
    .bind(userId)
    .first();

  if (sub) {
    return {
      plan: sub.plan as UserPlan,
      status: sub.status as string,
      currentPeriodEnd: sub.current_period_end as string | null,
      cancelAtPeriodEnd: !!sub.cancel_at_period_end,
      stripeCustomerId: sub.stripe_customer_id as string | null,
    };
  }

  return {
    plan: "free",
    status: "none",
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    stripeCustomerId: null,
  };
}

export function canAccessLevel(plan: UserPlan, level: number): boolean {
  switch (plan) {
    case "pro":
    case "team":
      return true; // all levels
    case "free":
    default:
      return level <= 3;
  }
}
