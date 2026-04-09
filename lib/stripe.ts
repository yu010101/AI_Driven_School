import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
      typescript: true,
    });
  }
  return _stripe;
}

export const PLANS = {
  free: {
    name: "無料",
    priceId: null,
    maxLevel: 1,
    amount: 0,
  },
  pro: {
    name: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro_placeholder",
    maxLevel: 9,
    amount: 2980,
  },
  team: {
    name: "チーム",
    priceId: process.env.STRIPE_TEAM_PRICE_ID || "price_team_placeholder",
    maxLevel: 9,
    amount: 10000,
  },
} as const;

export type PlanKey = keyof typeof PLANS;
