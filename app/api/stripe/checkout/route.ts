export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS, type PlanKey } from "@/lib/stripe";
import { verifyToken } from "@/lib/db/auth";
import { getDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const { plan } = (await req.json()) as { plan: PlanKey };

  if (!plan || !PLANS[plan] || plan === "free") {
    return NextResponse.json({ error: "無効なプランです" }, { status: 400 });
  }

  const planInfo = PLANS[plan];
  const db = await getDB();

  // Get or create Stripe customer
  let sub = await db
    .prepare("SELECT stripe_customer_id FROM subscriptions WHERE user_id = ?")
    .bind(user.userId)
    .first();

  let customerId = sub?.stripe_customer_id as string | undefined;

  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: user.email,
      metadata: { userId: String(user.userId) },
    });
    customerId = customer.id;

    // Create subscription record (inactive)
    await db
      .prepare(
        "INSERT INTO subscriptions (user_id, stripe_customer_id, plan, status) VALUES (?, ?, ?, 'inactive') ON CONFLICT (user_id) DO UPDATE SET stripe_customer_id = ?"
      )
      .bind(user.userId, customerId, plan, customerId)
      .run();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ai-driven-school.com";

  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [
      {
        price: planInfo.priceId!,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/dojo?checkout=success`,
    cancel_url: `${baseUrl}/pricing?checkout=cancel`,
    metadata: {
      userId: String(user.userId),
      plan,
    },
  });

  return NextResponse.json({ url: session.url });
}
