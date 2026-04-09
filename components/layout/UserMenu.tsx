"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  userId: number;
  email: string;
  name?: string;
  role?: string;
}

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const fetchUser = () => {
      fetch("/api/auth/me")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (cancelled) return;
          if (data?.user) setUser(data.user);
          setLoading(false);
        })
        .catch(() => {
          if (!cancelled) setLoading(false);
        });
    };
    fetchUser();
    // Re-check after navigation (cookie may have been set just before redirect)
    const timer = setTimeout(fetchUser, 2000);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-[#F5F5F5] animate-pulse" data-testid="user-menu-loading" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth"
        className="px-4 py-2 text-sm font-medium text-white bg-[#0A0A0A] rounded-lg hover:bg-[#1a1a1a] transition-colors"
      >
        ログイン
      </Link>
    );
  }

  const initial = (user.name || user.email)[0].toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#F5F5F5] transition-colors"
        data-testid="user-menu-trigger"
        aria-label="ユーザーメニュー"
      >
        <div className="w-7 h-7 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-xs font-bold">
          {initial}
        </div>
        <span className="text-sm text-[#0A0A0A] hidden sm:inline max-w-[100px] truncate">
          {user.name || user.email.split("@")[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-[#E5E5E5] shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-[#E5E5E5]">
            <p className="text-sm font-medium text-[#0A0A0A] truncate">
              {user.name || "ユーザー"}
            </p>
            <p className="text-xs text-[#a3a3a3] truncate">{user.email}</p>
          </div>

          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
          >
            アカウント設定
          </Link>
          <Link
            href="/pricing"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
          >
            プラン管理
          </Link>
          {user.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
            >
              管理画面
            </Link>
          )}
          {(user.role === "team_admin" || user.role === "team_member") && (
            <Link
              href="/team"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
            >
              チーム管理
            </Link>
          )}

          <div className="border-t border-[#E5E5E5] mt-1 pt-1">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2.5 text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
