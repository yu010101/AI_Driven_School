"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const plans = [
  {
    key: "free",
    name: "無料",
    price: "¥0",
    period: "",
    description: "まずは体験してみたい方に",
    features: [
      "Level 0-1 コース（13レッスン）",
      "ブラウザ上のインタラクティブ学習",
      "学習進捗の保存",
    ],
    cta: "無料で始める",
    href: "/auth",
    highlight: false,
  },
  {
    key: "pro",
    name: "Pro",
    price: "¥2,980",
    period: "/月",
    description: "本格的にAIスキルを身につけたい方に",
    features: [
      "全51レッスン（Level 0-9）",
      "認定試験アクセス（5トラック）",
      "学習進捗のクラウド同期",
      "新コース追加時に自動アクセス",
    ],
    cta: "Proプランを始める",
    href: null,
    highlight: true,
  },
  {
    key: "team",
    name: "チーム",
    price: "¥10,000",
    period: "/人/月",
    description: "チームでAI導入を進めたい企業に",
    features: [
      "Proプランの全機能",
      "チーム進捗ダッシュボード",
      "メンバー管理・招待",
      "請求書払い対応",
    ],
    cta: "チームプランを始める",
    href: null,
    highlight: false,
  },
];

function PricingContent() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("checkout") === "cancel";
  const [loading, setLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async (plan: string) => {
    setLoading(plan);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();

      if (res.status === 401) {
        window.location.href = `/auth?redirect=/pricing&plan=${plan}`;
        return;
      }

      if (!res.ok) {
        setCheckoutError(data.error || "チェックアウトに失敗しました。");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError("チェックアウトURLの取得に失敗しました。もう一度お試しください。");
      }
    } catch {
      setCheckoutError("接続エラーが発生しました。ネットワーク接続を確認してください。");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
            料金プラン
          </h1>
          <p className="text-[#525252] text-sm max-w-md mx-auto">
            あなたに合ったプランで、AIスキルを実務レベルに。
          </p>
        </div>

        {canceled && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-[#F5F5F5] rounded-xl text-sm text-[#525252] text-center">
            チェックアウトがキャンセルされました。プランを選び直してください。
          </div>
        )}

        {checkoutError && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 text-center">
            {checkoutError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-[#0A0A0A] text-white ring-2 ring-[#0A0A0A] md:scale-[1.03]"
                  : "bg-white border border-[#E5E5E5]"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block px-3 py-1 text-xs font-bold bg-white text-[#0A0A0A] rounded-full mb-4">
                  人気
                </span>
              )}
              <h2
                className={`text-xl font-bold mb-1 ${
                  plan.highlight ? "text-white" : "text-[#0A0A0A]"
                }`}
              >
                {plan.name}
              </h2>
              <p
                className={`text-sm mb-6 ${
                  plan.highlight ? "text-gray-300" : "text-[#525252]"
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span
                    className={`text-sm ${
                      plan.highlight ? "text-gray-300" : "text-[#525252]"
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={plan.highlight ? "text-green-400" : "text-green-600"}>
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {plan.href ? (
                <Link
                  href={plan.href}
                  className={`block w-full py-3 text-sm font-bold text-center rounded-xl transition-all ${
                    plan.highlight
                      ? "bg-white text-[#0A0A0A] hover:bg-gray-100"
                      : "bg-[#0A0A0A] text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  onClick={() => handleCheckout(plan.key)}
                  disabled={loading === plan.key}
                  className={`block w-full py-3 text-sm font-bold text-center rounded-xl transition-all disabled:opacity-50 ${
                    plan.highlight
                      ? "bg-white text-[#0A0A0A] hover:bg-gray-100"
                      : "bg-[#0A0A0A] text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  {loading === plan.key ? "処理中..." : plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#a3a3a3] mt-12">
          全プラン、いつでもキャンセル可能。チームプランは3名以上から。
        </p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
