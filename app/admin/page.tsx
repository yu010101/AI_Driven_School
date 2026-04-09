"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface UserRow {
  id: number;
  email: string;
  name: string | null;
  role: string;
  created_at: string;
  plan: string;
  lessons_completed: number;
}

interface Stats {
  totalUsers: number;
  proUsers: number;
  teamUsers: number;
  totalLessonsCompleted: number;
  recentSignups: number;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/users").then((r) => r.json()),
      fetch("/api/admin/stats").then((r) => r.json()),
    ]).then(([usersData, statsData]) => {
      setUsers(usersData.users || []);
      setStats(statsData);
      setLoading(false);
    });
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.name || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0A0A0A]">管理画面</h1>
            <p className="text-sm text-[#525252] mt-1">ユーザー管理・統計</p>
          </div>
          <Link href="/dojo" className="text-sm text-[#525252] hover:text-[#0A0A0A]">
            ← 道場に戻る
          </Link>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "総ユーザー", value: stats.totalUsers },
              { label: "Proユーザー", value: stats.proUsers },
              { label: "チームユーザー", value: stats.teamUsers },
              { label: "総レッスン完了", value: stats.totalLessonsCompleted },
              { label: "直近7日の登録", value: stats.recentSignups },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-[#E5E5E5] p-4">
                <p className="text-xs text-[#a3a3a3] mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#0A0A0A]">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="名前またはメールで検索..."
            className="w-full max-w-sm px-4 py-3 text-sm border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#0A0A0A] bg-white"
          />
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <th className="text-left text-xs font-medium text-[#a3a3a3] px-4 py-3">ユーザー</th>
                  <th className="text-left text-xs font-medium text-[#a3a3a3] px-4 py-3">プラン</th>
                  <th className="text-left text-xs font-medium text-[#a3a3a3] px-4 py-3">レッスン</th>
                  <th className="text-left text-xs font-medium text-[#a3a3a3] px-4 py-3">登録日</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#E5E5E5] last:border-0">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-[#0A0A0A]">{user.name || "—"}</p>
                      <p className="text-xs text-[#a3a3a3]">{user.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                          user.plan === "pro"
                            ? "bg-blue-100 text-blue-700"
                            : user.plan === "team"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.plan === "pro" ? "Pro" : user.plan === "team" ? "Team" : "Free"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#525252]">
                      {user.lessons_completed}/51
                    </td>
                    <td className="px-4 py-3 text-sm text-[#a3a3a3]">
                      {new Date(user.created_at).toLocaleDateString("ja-JP")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <p className="text-sm text-[#a3a3a3] text-center py-8">ユーザーが見つかりません</p>
          )}
        </div>
      </div>
    </div>
  );
}
