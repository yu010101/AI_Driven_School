export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { verifyToken } from "@/lib/db/auth";
import { getDB } from "@/lib/db";

export async function POST() {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const db = await getDB();
  const sub = await db
    .prepare("SELECT stripe_customer_id FROM subscriptions WHERE user_id = ? AND stripe_customer_id IS NOT NULL")
    .bind(user.userId)
    .first();

  if (!sub?.stripe_customer_id) {
    return NextResponse.json({ error: "サブスクリプションが見つかりません" }, { status: 404 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ai-driven-school.com";

  const session = await getStripe().billingPortal.sessions.create({
    customer: sub.stripe_customer_id as string,
    return_url: `${baseUrl}/account`,
  });

  return NextResponse.json({ url: session.url });
}
