"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Member {
  id: number;
  user_id: number;
  email: string;
  name: string | null;
  role: string;
  joined_at: string;
  lessons_completed: number;
}

export default function TeamPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [orgName, setOrgName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/team/members")
      .then((r) => {
        if (r.status === 403 || r.status === 401) {
          router.push("/dojo");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) {
          setMembers(data.members || []);
          setOrgName(data.orgName || "チーム");
          setLoading(false);
        }
      });
  }, [router]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setMessage("");

    const res = await fetch("/api/team/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("メンバーを追加しました");
      setInviteEmail("");
      // Refresh members
      const refreshRes = await fetch("/api/team/members");
      const refreshData = await refreshRes.json();
      setMembers(refreshData.members || []);
    } else {
      setMessage(data.error || "追加に失敗しました");
    }
    setInviting(false);
  };

  const handleRemove = async (userId: number) => {
    if (!confirm("このメンバーを削除しますか？")) return;

    const res = await fetch("/api/team/members", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      setMembers(members.filter((m) => m.user_id !== userId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0A0A0A]">{orgName}</h1>
            <p className="text-sm text-[#525252] mt-1">
              {members.length} メンバー
            </p>
          </div>
          <Link href="/dojo" className="text-sm text-[#525252] hover:text-[#0A0A0A]">
            ← 道場に戻る
          </Link>
        </div>

        {/* Invite */}
        <section className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
          <h2 className="text-sm font-bold text-[#0A0A0A] mb-4">メンバーを追加</h2>
          <form onSubmit={handleInvite} className="flex gap-3">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              placeholder="メールアドレスを入力"
              className="flex-1 px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A]"
            />
            <button
              type="submit"
              disabled={inviting}
              className="px-6 py-3 text-sm font-bold text-white rounded-xl disabled:opacity-50"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              {inviting ? "追加中..." : "追加"}
            </button>
          </form>
          {message && (
            <p className="text-sm text-[#525252] mt-3 bg-[#F5F5F5] p-3 rounded-xl">{message}</p>
          )}
          <p className="text-xs text-[#a3a3a3] mt-2">
            既にアカウントを持っているユーザーのメールアドレスを入力してください。
          </p>
        </section>

        {/* Members */}
        <section className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <th className="text-left text-xs font-medium text-[#a3a3a3] px-4 py-3">メンバー</th>
                  <th className="text-left text-xs font-medium text-[#a3a3a3] px-4 py-3">進捗</th>
                  <th className="text-left text-xs font-medium text-[#a3a3a3] px-4 py-3">参加日</th>
                  <th className="text-right text-xs font-medium text-[#a3a3a3] px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-b border-[#E5E5E5] last:border-0">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-[#0A0A0A]">{m.name || "—"}</p>
                      <p className="text-xs text-[#a3a3a3]">{m.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0A0A0A] rounded-full"
                            style={{ width: `${Math.min((m.lessons_completed / 51) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#a3a3a3]">{m.lessons_completed}/51</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#a3a3a3]">
                      {m.joined_at ? new Date(m.joined_at).toLocaleDateString("ja-JP") : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {m.role !== "admin" && (
                        <button
                          onClick={() => handleRemove(m.user_id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          削除
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {members.length === 0 && (
            <p className="text-sm text-[#a3a3a3] text-center py-8">まだメンバーがいません</p>
          )}
        </section>
      </div>
    </div>
  );
}
