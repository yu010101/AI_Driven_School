"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress, getTotalCompleted, getTotalXP } from "@/lib/progress";

interface ResumePoint {
  courseId: string;
  courseTitle: string;
  lessonSlug: string;
  completed: number;
  total: number;
}

const courseNames: Record<string, string> = {
  "level0-setup": "5分セットアップ",
  "level1-tips10": "実務Tips 10選",
  "level2-automation": "自動化パイプライン",
  "level3-dx-design": "DX設計",
  "level4-skills": "Agent Skills",
  "level5-openclaw": "OpenClaw AI経営OS",
  "level6-antigravity": "AntiGravity",
  "level7-exam": "認定試験対策",
  "level8-essential": "Essential Tips",
  "level9-enterprise": "Enterprise",
};

const firstLessonMap: Record<string, string> = {
  "level0-setup": "01-install",
  "level1-tips10": "01-meeting-to-slack",
  "level2-automation": "01-meeting-pipeline",
  "level3-dx-design": "01-what-is-mcp",
  "level4-skills": "01-what-are-skills",
  "level5-openclaw": "01-overview",
  "level6-antigravity": "01-what-is-antigravity",
  "level7-exam": "01-claude101",
  "level8-essential": "01-hooks",
  "level9-enterprise": "01-github-actions",
};

const courseTotalLessons: Record<string, number> = {
  "level0-setup": 3,
  "level1-tips10": 10,
  "level2-automation": 5,
  "level3-dx-design": 5,
  "level4-skills": 5,
  "level5-openclaw": 7,
  "level6-antigravity": 3,
  "level7-exam": 5,
  "level8-essential": 4,
  "level9-enterprise": 4,
};

export default function WelcomeBack() {
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [resume, setResume] = useState<ResumePoint | null>(null);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    // Check if logged in
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.user) return;
        setUser(data.user);

        // Get progress from localStorage
        const completed = getTotalCompleted();
        const totalXp = getTotalXP();
        setTotalCompleted(completed);
        setXp(totalXp);

        if (completed === 0) return;

        // Find resume point
        const progress = getProgress();
        const courseOrder = Object.keys(firstLessonMap);
        for (const cid of courseOrder) {
          const done = (progress.completedLessons[cid] || []).length;
          const total = courseTotalLessons[cid] || 0;
          if (done > 0 && done < total) {
            setResume({
              courseId: cid,
              courseTitle: courseNames[cid] || cid,
              lessonSlug: firstLessonMap[cid],
              completed: done,
              total,
            });
            break;
          }
        }
      })
      .catch(() => {});
  }, []);

  if (!user || totalCompleted === 0) return null;

  return (
    <section className="pb-8 md:pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6 md:p-8">
          <p className="text-sm text-[#94A3B8] mb-1">おかえりなさい</p>
          <p className="text-lg font-bold text-[#0A0A0A] mb-4">
            {user.name || "ユーザー"}さん
          </p>

          <div className="flex items-center gap-6 mb-4">
            <div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{totalCompleted}</p>
              <p className="text-xs text-[#94A3B8]">レッスン完了</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{xp}</p>
              <p className="text-xs text-[#94A3B8]">XP</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{Math.round((totalCompleted / 51) * 100)}%</p>
              <p className="text-xs text-[#94A3B8]">全体進捗</p>
            </div>
          </div>

          {resume && (
            <Link
              href={`/dojo/${resume.courseId}/${resume.lessonSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              {resume.courseTitle} の続き ({resume.completed}/{resume.total})
              <span>&rarr;</span>
            </Link>
          )}

          {!resume && (
            <Link
              href="/dojo"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              道場へ <span>&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
