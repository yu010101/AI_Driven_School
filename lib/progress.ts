"use client";

const STORAGE_KEY = "claude-code-dojo-progress";

const XP_PER_LESSON: Record<string, number> = {
  "level0-setup": 10,
  "level1-tips10": 20,
  "level2-automation": 35,
  "level3-dx-design": 50,
  "level4-skills": 60,
  "level5-openclaw": 75,
  "level6-antigravity": 100,
  "level7-exam": 120,
  "level8-essential": 80,
  "level9-enterprise": 100,
};

export interface ProgressData {
  completedLessons: Record<string, string[]>;
  xp: number;
}

// Always read from localStorage (fast, sync)
export function getProgress(): ProgressData {
  if (typeof window === "undefined") {
    return { completedLessons: {}, xp: 0 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: {}, xp: 0 };
    const data = JSON.parse(raw);
    return { completedLessons: data.completedLessons || {}, xp: data.xp || 0 };
  } catch {
    return { completedLessons: {}, xp: 0 };
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Save to localStorage AND API (if logged in)
export function markLessonComplete(
  courseId: string,
  lessonSlug: string
): ProgressData {
  const progress = getProgress();
  if (!progress.completedLessons[courseId]) {
    progress.completedLessons[courseId] = [];
  }
  const xpEarned = XP_PER_LESSON[courseId] ?? 15;
  if (!progress.completedLessons[courseId].includes(lessonSlug)) {
    progress.completedLessons[courseId].push(lessonSlug);
    progress.xp += xpEarned;
  }
  saveProgress(progress);

  // Async API save (fire and forget)
  syncToServer(courseId, lessonSlug, xpEarned);

  return progress;
}

// Sync single lesson to server
async function syncToServer(courseId: string, lessonSlug: string, xpEarned: number) {
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, lessonSlug, xpEarned }),
    });
  } catch {
    // Silently fail — localStorage is the source of truth for now
  }
}

// Sync quiz result to server
export async function syncQuizResult(examId: string, score: number, total: number) {
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "quiz", examId, score, total }),
    });
  } catch {}
}

// Fetch server progress and merge with localStorage
export async function fetchAndMergeProgress(): Promise<ProgressData> {
  const local = getProgress();

  try {
    const res = await fetch("/api/progress");
    if (!res.ok) return local;

    const server = await res.json();
    const merged = { ...local };

    // Merge server data into local
    for (const [courseId, slugs] of Object.entries(server.completedLessons || {})) {
      if (!merged.completedLessons[courseId]) {
        merged.completedLessons[courseId] = [];
      }
      for (const slug of slugs as string[]) {
        if (!merged.completedLessons[courseId].includes(slug)) {
          merged.completedLessons[courseId].push(slug);
        }
      }
    }

    // Recalculate XP
    let totalXp = 0;
    for (const [courseId, slugs] of Object.entries(merged.completedLessons)) {
      totalXp += slugs.length * (XP_PER_LESSON[courseId] ?? 15);
    }
    merged.xp = totalXp;

    saveProgress(merged);
    return merged;
  } catch {
    return local;
  }
}

export function isLessonComplete(courseId: string, lessonSlug: string): boolean {
  const progress = getProgress();
  return progress.completedLessons[courseId]?.includes(lessonSlug) ?? false;
}

export function getCourseProgress(courseId: string): number {
  const progress = getProgress();
  return progress.completedLessons[courseId]?.length ?? 0;
}

export function getTotalXP(): number {
  return getProgress().xp;
}

export function getTotalCompleted(): number {
  const progress = getProgress();
  return Object.values(progress.completedLessons).reduce(
    (sum, slugs) => sum + slugs.length,
    0
  );
}

export const MAX_XP = 3100;
