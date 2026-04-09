export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = await getDB();

  // Idempotency check — prevent duplicate event processing
  const existing = await db
    .prepare("SELECT id FROM stripe_events WHERE event_id = ?")
    .bind(event.id)
    .first();

  if (existing) {
    return NextResponse.json({ received: true }); // Already processed
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan || "pro";
      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;

      if (userId) {
        // Update subscription record
        await db
          .prepare(
            "INSERT INTO subscriptions (user_id, stripe_customer_id, stripe_subscription_id, plan, status) VALUES (?, ?, ?, ?, 'active') ON CONFLICT (user_id) DO UPDATE SET stripe_subscription_id = ?, plan = ?, status = 'active', updated_at = NOW()"
          )
          .bind(
            parseInt(userId),
            customerId,
            subscriptionId,
            plan,
            subscriptionId,
            plan
          )
          .run();

        // Update user role
        const role = plan === "team" ? "team_admin" : "pro";
        await db
          .prepare("UPDATE users SET role = ? WHERE id = ?")
          .bind(role, parseInt(userId))
          .run();
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as any;
      const subscriptionId = invoice.subscription as string;

      if (subscriptionId) {
        const subscription = await getStripe().subscriptions.retrieve(subscriptionId) as any;
        await db
          .prepare(
            "UPDATE subscriptions SET status = 'active', current_period_end = to_timestamp(?), updated_at = NOW() WHERE stripe_subscription_id = ?"
          )
          .bind(subscription.current_period_end, subscriptionId)
          .run();
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as any;
      const subscriptionId = subscription.id;

      await db
        .prepare(
          "UPDATE subscriptions SET status = ?, cancel_at_period_end = ?, current_period_end = to_timestamp(?), updated_at = NOW() WHERE stripe_subscription_id = ?"
        )
        .bind(
          subscription.status,
          subscription.cancel_at_period_end,
          subscription.current_period_end,
          subscriptionId
        )
        .run();
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const subscriptionId = subscription.id;

      // Mark subscription as canceled
      await db
        .prepare(
          "UPDATE subscriptions SET status = 'canceled', updated_at = NOW() WHERE stripe_subscription_id = ?"
        )
        .bind(subscriptionId)
        .run();

      // Revert user role to free
      const sub = await db
        .prepare("SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?")
        .bind(subscriptionId)
        .first();

      if (sub?.user_id) {
        await db
          .prepare("UPDATE users SET role = 'free' WHERE id = ?")
          .bind(sub.user_id)
          .run();
      }
      break;
    }
  }

  // Record processed event for idempotency
  await db
    .prepare("INSERT INTO stripe_events (event_id, event_type) VALUES (?, ?) ON CONFLICT (event_id) DO NOTHING")
    .bind(event.id, event.type)
    .run();

  return NextResponse.json({ received: true });
}
