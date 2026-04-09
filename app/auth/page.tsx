"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function AuthForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const planIntent = searchParams.get("plan");

  const [mode, setMode] = useState<"login" | "register">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const body = mode === "register"
        ? { email, password, name, company }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "エラーが発生しました");
        return;
      }

      // Sync localStorage progress to server
      try {
        const localProgress = localStorage.getItem("claude-code-dojo-progress");
        if (localProgress) {
          const parsed = JSON.parse(localProgress);
          for (const [courseId, slugs] of Object.entries(parsed.completedLessons || {})) {
            for (const slug of slugs as string[]) {
              await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId, lessonSlug: slug, xpEarned: 0 }),
              });
            }
          }
        }
      } catch {}

      // Intent-based redirect
      if (planIntent && (planIntent === "pro" || planIntent === "team")) {
        // Start Stripe checkout after auth
        try {
          const checkoutRes = await fetch("/api/stripe/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plan: planIntent }),
          });
          const checkoutData = await checkoutRes.json();
          if (checkoutData.url) {
            window.location.href = checkoutData.url;
            return;
          }
        } catch {}
      }

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/dojo");
      }
    } catch {
      setError("接続エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-8 block">
          ← 戻る
        </Link>

        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">
          {mode === "register" ? "アカウント作成" : "ログイン"}
        </h1>
        <p className="text-sm text-[#525252] mb-2">
          学習記録がクラウドに保存されます
        </p>
        {planIntent && (
          <p className="text-sm text-[#0A0A0A] bg-[#F5F5F5] px-3 py-2 rounded-lg mb-6">
            {planIntent === "pro" ? "Pro" : "チーム"}プランの登録に進みます
          </p>
        )}
        {!planIntent && <div className="mb-6" />}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">名前</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
                  placeholder="山田太郎"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1">会社名</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
                  placeholder="株式会社〇〇（任意）"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-[#0A0A0A] mb-1">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0A0A0A] mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
              placeholder="8文字以上"
            />
          </div>

          {mode === "login" && (
            <p className="text-xs text-[#a3a3a3]">
              パスワードをお忘れの方は{" "}
              <a href="mailto:yuichiyoshida@radineer.com?subject=パスワードリセット" className="underline hover:text-[#525252]">
                お問い合わせください
              </a>
            </p>
          )}

          {error && (
            <p className="text-sm text-[#525252] bg-[#F5F5F5] p-3 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-bold text-white rounded-xl disabled:opacity-50"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            {loading
              ? "処理中..."
              : mode === "register"
              ? planIntent
                ? "登録してプラン選択に進む"
                : "無料で登録する"
              : "ログイン"}
          </button>
        </form>

        <p className="text-sm text-[#525252] mt-6 text-center">
          {mode === "register" ? (
            <>
              アカウントをお持ちの方は
              <button onClick={() => setMode("login")} className="font-bold text-[#0A0A0A] ml-1">
                ログイン
              </button>
            </>
          ) : (
            <>
              アカウントがない方は
              <button onClick={() => setMode("register")} className="font-bold text-[#0A0A0A] ml-1">
                登録
              </button>
            </>
          )}
        </p>

        {/* Social proof */}
        <div className="mt-10 pt-6 border-t border-[#E5E5E5]">
          <p className="text-xs text-[#a3a3a3] text-center">
            多くのビジネスパーソンがAI道場でClaude Codeを学んでいます
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-[#0A0A0A]">51</p>
              <p className="text-xs text-[#a3a3a3]">レッスン</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[#0A0A0A]">5</p>
              <p className="text-xs text-[#a3a3a3]">認定試験</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-[#0A0A0A]">10</p>
              <p className="text-xs text-[#a3a3a3]">コース</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
