"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-xl font-bold text-[#0A0A0A] mb-4">無効なリンクです</h1>
          <p className="text-sm text-[#525252] mb-6">
            パスワードリセットのリンクが無効です。もう一度リセットを依頼してください。
          </p>
          <Link
            href="/auth/forgot-password"
            className="inline-block px-6 py-3 text-sm font-bold text-white rounded-xl"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            パスワードリセットを依頼
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("パスワードが一致しません");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setMessage(data.error || "リセットに失敗しました");
      }
    } catch {
      setMessage("接続エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-xl font-bold text-[#0A0A0A] mb-4">パスワードを変更しました</h1>
          <p className="text-sm text-[#525252] mb-6">
            新しいパスワードでログインしてください。
          </p>
          <Link
            href="/auth"
            className="inline-block px-6 py-3 text-sm font-bold text-white rounded-xl"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            ログインへ
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

        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">新しいパスワード設定</h1>
        <p className="text-sm text-[#525252] mb-8">新しいパスワードを入力してください</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0A0A0A] mb-1">
              新しいパスワード
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
              placeholder="8文字以上"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0A0A0A] mb-1">
              パスワード確認
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
              placeholder="もう一度入力"
            />
          </div>

          {message && (
            <p className="text-sm text-[#525252] bg-[#F5F5F5] p-3 rounded-xl">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-bold text-white rounded-xl disabled:opacity-50"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            {loading ? "処理中..." : "パスワードを変更"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
