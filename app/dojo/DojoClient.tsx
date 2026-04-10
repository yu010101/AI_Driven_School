"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { getCourseProgress, getTotalXP, MAX_XP } from "@/lib/progress";
import type { CourseMeta } from "@/lib/courses";

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

const RANK_LABELS = [
  { min: 0, label: "白帯", emoji: "🤍", color: "bg-gray-300" },
  { min: 13, label: "青帯", emoji: "💙", color: "bg-blue-500" },
  { min: 28, label: "茶帯", emoji: "🟤", color: "bg-amber-700" },
  { min: 51, label: "黒帯", emoji: "🖤", color: "bg-[#0A0A0A]" },
];

function getRank(totalCompleted: number) {
  let rank = RANK_LABELS[0];
  for (const r of RANK_LABELS) {
    if (totalCompleted >= r.min) rank = r;
  }
  return rank;
}

interface Props {
  courses: CourseMeta[];
  isAuthenticated?: boolean;
  userPlan?: "free" | "pro" | "team";
}

export default function DojoClient({ courses, isAuthenticated = false, userPlan = "free" }: Props) {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [xp, setXp] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [resumeInfo, setResumeInfo] = useState<{ courseId: string; courseTitle: string; lessonSlug: string; completed: number; total: number } | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const map: Record<string, number> = {};
    let total = 0;
    courses.forEach((c) => {
      const count = getCourseProgress(c.id);
      map[c.id] = count;
      total += count;
    });
    setProgressMap(map);
    setTotalCompleted(total);
    setXp(getTotalXP());

    // Calculate streak (simple: count consecutive days with progress, based on total completed)
    // For MVP, show streak based on total completed sessions
    if (total > 0) {
      setStreak(Math.min(total, 7)); // Cap at 7 for display
    }

    // Find resume point — first incomplete course
    const courseOrder = ["level0-setup", "level1-tips10", "level2-automation", "level3-dx-design", "level4-skills", "level5-openclaw", "level6-antigravity"];
    for (const cid of courseOrder) {
      const course = courses.find(c => c.id === cid);
      if (!course) continue;
      const done = map[cid] ?? 0;
      if (done > 0 && done < course.totalLessons) {
        // Find next incomplete lesson slug
        const lessonFiles = Object.keys(firstLessonMap);
        setResumeInfo({
          courseId: cid,
          courseTitle: course.title,
          lessonSlug: firstLessonMap[cid],
          completed: done,
          total: course.totalLessons,
        });
        break;
      }
    }
  }, [courses]);

  const rank = getRank(totalCompleted);
  const xpPct = Math.min((xp / MAX_XP) * 100, 100);

  return (
    <div className="min-h-screen dojo-bg">
      {/* Header */}
      <header className="border-b border-dojo-border bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-dojo-text-muted hover:text-dojo-text transition-colors">
              ← 戻る
            </Link>
          </div>
          {/* Rank + XP */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{rank.emoji}</span>
              <span className="text-xs font-bold text-dojo-text">{rank.label}</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-sm streak-flame">🔥</span>
                <span className="text-xs font-bold text-dojo-text">{streak}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${xpPct}%`,
                    background: "var(--dojo-vermillion)",
                  }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-dojo-text-muted">{xp} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Page heading */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-6">
        <h1 className="text-3xl font-bold text-dojo-text" style={{ letterSpacing: '-0.02em' }}>
          全コース
        </h1>
        <p className="text-sm text-dojo-text-muted mt-2">
          51レッスン。実務レシピ + Anthropic公式認定対策。
        </p>
      </section>

      {/* Resume panel — returning users */}
      {resumeInfo && (
        <section className="max-w-5xl mx-auto px-4 mb-8">
          <Link
            href={`/dojo/${resumeInfo.courseId}/${resumeInfo.lessonSlug}`}
            className="block bg-white rounded-2xl border-2 border-dojo-vermillion p-5 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-dojo-text-muted mb-1">前回の続き</p>
                <p className="font-bold text-dojo-text group-hover:text-dojo-vermillion transition-colors">
                  {resumeInfo.courseTitle}
                </p>
                <p className="text-sm text-dojo-text-muted mt-1">
                  {resumeInfo.completed}/{resumeInfo.total} レッスン完了
                </p>
              </div>
              <span
                className="px-5 py-2.5 text-white font-semibold rounded-xl text-sm"
                style={{ backgroundColor: "var(--dojo-vermillion)" }}
              >
                続きから
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Course List */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((totalCompleted / 51) * 100, 100)}%`,
                  background: "var(--dojo-vermillion)",
                }}
              />
            </div>
            <span className="text-xs font-medium text-dojo-text-muted">
              {Math.round((totalCompleted / 51) * 100)}%
            </span>
          </div>
          <span className="text-xs text-dojo-text-muted">
            {totalCompleted} / 51 完了
          </span>
        </div>

        {/* Free courses (Level 0-1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.filter(c => c.level <= 1).map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              completedLessons={progressMap[course.id] ?? 0}
              firstLessonSlug={firstLessonMap[course.id] ?? "01"}
              basePath="/dojo"
            />
          ))}
        </div>

        {/* Registration gate — shown to unauthenticated users */}
        {!isAuthenticated && (
          <div className="mt-8 rounded-2xl border border-dojo-border p-6 bg-white">
            <p className="text-sm text-dojo-text mb-2 font-medium">無料登録でLevel 3まで解放</p>
            <p className="text-xs text-dojo-text-muted mb-4">アカウント登録で13レッスン追加。学習記録もクラウドに保存されます。</p>
            <Link
              href="/auth"
              className="inline-block px-6 py-2.5 text-sm font-bold text-white rounded-xl"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              無料で登録
            </Link>
          </div>
        )}

        {/* Level 2-3 courses (visible to authenticated users) */}
        {isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {courses.filter(c => c.level >= 2 && c.level <= 3).map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                completedLessons={progressMap[course.id] ?? 0}
                firstLessonSlug={firstLessonMap[course.id] ?? "01"}
                basePath="/dojo"
              />
            ))}
          </div>
        )}

        {/* Pro upgrade gate — shown to free users */}
        {isAuthenticated && userPlan === "free" && (
          <div className="mt-8 rounded-2xl border border-dojo-border p-6 bg-white">
            <p className="text-sm text-dojo-text mb-2 font-medium">Proプランで全コース解放</p>
            <p className="text-xs text-dojo-text-muted mb-4">Level 4以降の上級コース + 認定試験にアクセス。¥2,980/月、いつでもキャンセル可能。</p>
            <Link
              href="/pricing"
              className="inline-block px-6 py-2.5 text-sm font-bold text-white rounded-xl"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              Proプランを見る
            </Link>
          </div>
        )}

        {/* Advanced courses (Level 4+) — visible to pro/team users */}
        {(userPlan === "pro" || userPlan === "team") && courses.some(c => c.level >= 4) && (
          <div className="mt-8">
            {!showAdvanced ? (
              <button
                onClick={() => setShowAdvanced(true)}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-dojo-border text-dojo-text-muted hover:border-dojo-vermillion hover:text-dojo-vermillion transition-all text-sm font-medium"
              >
                上級コースを見る
              </button>
            ) : (
              <div className="dojo-slide-enter">
                <h3 className="text-lg font-bold text-dojo-text mb-4 font-heading flex items-center gap-2">
                  <span style={{ color: "var(--dojo-vermillion)" }}>上級</span> コース
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.filter(c => c.level >= 4).map((course) => (
                    <CourseCard
                      key={course.id}
                      {...course}
                      completedLessons={progressMap[course.id] ?? 0}
                      firstLessonSlug={firstLessonMap[course.id] ?? "01"}
                      basePath="/dojo"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-dojo-border py-8 text-center">
        <p className="text-sm text-dojo-text-muted">
          <Link href="/" className="hover:text-dojo-text transition-colors">AI道場</Link>
        </p>
      </footer>
    </div>
  );
}
