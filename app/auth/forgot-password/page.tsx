"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
      } else {
        setError(data.error || "送信に失敗しました");
      }
    } catch {
      setError("接続エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-xl font-bold text-[#0A0A0A] mb-4">メールを送信しました</h1>
          <p className="text-sm text-[#525252] mb-2">
            <strong>{email}</strong> にパスワードリセットのリンクを送信しました。
          </p>
          <p className="text-sm text-[#a3a3a3] mb-6">
            メールが届かない場合は迷惑メールフォルダを確認してください。リンクは1時間有効です。
          </p>
          <Link
            href="/auth"
            className="text-sm text-[#525252] hover:text-[#0A0A0A] underline"
          >
            ログインに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/auth" className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-8 block">
          ← ログインに戻る
        </Link>

        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">パスワードリセット</h1>
        <p className="text-sm text-[#525252] mb-8">
          登録メールアドレスにリセットリンクを送信します
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0A0A0A] mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
              placeholder="you@example.com"
            />
          </div>

          {error && (
            <p className="text-sm text-[#525252] bg-[#F5F5F5] p-3 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-bold text-white rounded-xl disabled:opacity-50"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            {loading ? "送信中..." : "リセットリンクを送信"}
          </button>
        </form>
      </div>
    </div>
  );
}
