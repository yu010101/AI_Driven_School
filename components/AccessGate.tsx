"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  requiredLevel: number;
  children: React.ReactNode;
}

/**
 * Client-side access gate that checks user's subscription plan
 * before rendering protected content.
 * Level 0-1: free (no auth needed)
 * Level 2-3: requires authentication (free plan)
 * Level 4+: requires pro/team subscription
 */
export default function AccessGate({ requiredLevel, children }: Props) {
  const [status, setStatus] = useState<"loading" | "granted" | "needsAuth" | "needsPro">("loading");

  useEffect(() => {
    // Level 0-1 is always accessible
    if (requiredLevel <= 1) {
      setStatus("granted");
      return;
    }

    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.user) {
          setStatus("needsAuth");
          return;
        }

        const plan = data.user.plan || "free";

        // Level 2-3: any authenticated user
        if (requiredLevel <= 3) {
          setStatus("granted");
          return;
        }

        // Level 4+: requires pro or team
        if (plan === "pro" || plan === "team") {
          setStatus("granted");
        } else {
          setStatus("needsPro");
        }
      })
      .catch(() => {
        setStatus("needsAuth");
      });
  }, [requiredLevel]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "needsAuth") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
        <div className="max-w-sm text-center">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">ログインが必要です</h2>
          <p className="text-sm text-[#525252] mb-6">
            このコンテンツにアクセスするにはアカウント登録が必要です。
          </p>
          <Link
            href="/auth"
            className="inline-block px-6 py-3 text-sm font-bold text-white rounded-xl"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            無料で登録
          </Link>
        </div>
      </div>
    );
  }

  if (status === "needsPro") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
        <div className="max-w-sm text-center">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">Proプランが必要です</h2>
          <p className="text-sm text-[#525252] mb-6">
            このコンテンツはProプラン以上で利用できます。月額¥2,980で全コース・認定試験にアクセス。
          </p>
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 text-sm font-bold text-white rounded-xl"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            プランを見る
          </Link>
          <Link
            href="/dojo"
            className="block mt-4 text-sm text-[#525252] hover:text-[#0A0A0A]"
          >
            ← 道場に戻る
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
