"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Profile {
  id: number;
  email: string;
  name: string | null;
  company: string | null;
  role: string;
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    Promise.all([
      fetch("/api/account/profile").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/auth/me").then((r) => (r.ok ? r.json() : null)),
    ]).then(([profileData, meData]) => {
      if (!profileData?.profile) {
        router.push("/auth");
        return;
      }
      setProfile(profileData.profile);
      setName(profileData.profile.name || "");
      setCompany(profileData.profile.company || "");
      if (meData?.user?.plan) setPlan(meData.user.plan);
      setLoading(false);
    });
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company }),
      });
      if (res.ok) {
        setMessage("保存しました");
      } else {
        setMessage("保存に失敗しました");
      }
    } catch {
      setMessage("エラーが発生しました");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangingPassword(true);
    setPasswordMessage("");
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordMessage("パスワードを変更しました");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setPasswordMessage(data.error || "変更に失敗しました");
      }
    } catch {
      setPasswordMessage("エラーが発生しました");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleOpenPortal = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const handleDeleteAccount = async () => {
    const res = await fetch("/api/account/delete", { method: "POST" });
    if (res.ok) {
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const planLabels: Record<string, string> = {
    free: "無料プラン",
    pro: "Proプラン",
    team: "チームプラン",
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-xl mx-auto px-4 py-12">
        <Link href="/dojo" className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-8 block">
          ← 道場に戻る
        </Link>

        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-8">アカウント設定</h1>

        {/* Profile Section */}
        <section className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <h2 className="text-sm font-bold text-[#0A0A0A] mb-4">プロフィール</h2>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm text-[#525252] mb-1">メールアドレス</label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl bg-[#F5F5F5] text-[#a3a3a3]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#525252] mb-1">名前</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
                placeholder="山田太郎"
              />
            </div>
            <div>
              <label className="block text-sm text-[#525252] mb-1">会社名</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
                placeholder="株式会社〇〇"
              />
            </div>
            {message && (
              <p className="text-sm text-[#525252] bg-[#F5F5F5] p-3 rounded-xl">{message}</p>
            )}
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 text-sm font-bold text-white rounded-xl disabled:opacity-50"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              {saving ? "保存中..." : "保存"}
            </button>
          </form>
        </section>

        {/* Plan Section */}
        <section className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <h2 className="text-sm font-bold text-[#0A0A0A] mb-4">プラン</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#0A0A0A]">
                {planLabels[plan] || plan}
              </p>
              <p className="text-xs text-[#a3a3a3] mt-1">
                {plan === "free"
                  ? "Level 0-3 のコースにアクセス可能"
                  : "全コース + 認定試験にアクセス可能"}
              </p>
            </div>
            {plan === "free" ? (
              <Link
                href="/pricing"
                className="px-4 py-2 text-sm font-medium text-white rounded-lg"
                style={{ backgroundColor: "#0A0A0A" }}
              >
                アップグレード
              </Link>
            ) : (
              <button
                onClick={handleOpenPortal}
                className="px-4 py-2 text-sm font-medium text-[#525252] border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                プラン管理
              </button>
            )}
          </div>
        </section>

        {/* Password Section */}
        <section className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <h2 className="text-sm font-bold text-[#0A0A0A] mb-4">パスワード変更</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm text-[#525252] mb-1">現在のパスワード</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#525252] mb-1">新しいパスワード</label>
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
            {passwordMessage && (
              <p className="text-sm text-[#525252] bg-[#F5F5F5] p-3 rounded-xl">{passwordMessage}</p>
            )}
            <button
              type="submit"
              disabled={changingPassword}
              className="px-6 py-2.5 text-sm font-bold text-white rounded-xl disabled:opacity-50"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              {changingPassword ? "変更中..." : "パスワードを変更"}
            </button>
          </form>
        </section>

        {/* Danger Zone */}
        <section className="bg-white rounded-2xl border border-red-200 p-6">
          <h2 className="text-sm font-bold text-red-600 mb-4">アカウント削除</h2>
          <p className="text-xs text-[#525252] mb-4">
            アカウントを削除すると、学習記録・サブスクリプション・すべてのデータが完全に削除されます。この操作は取り消せません。
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              アカウントを削除
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-red-600">本当に削除しますか？</p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  削除する
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-[#525252] border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5] transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
