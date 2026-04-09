export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/db/auth";

export async function GET() {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const db = await getDB();

  const lessons = await db
    .prepare("SELECT course_id, lesson_slug, xp_earned FROM lesson_progress WHERE user_id = ? AND completed = true")
    .bind(user.userId)
    .all();

  const quizzes = await db
    .prepare("SELECT exam_id, score, total, completed_at FROM quiz_results WHERE user_id = ?")
    .bind(user.userId)
    .all();

  const completedLessons: Record<string, string[]> = {};
  let totalXp = 0;

  for (const l of lessons.results) {
    if (!completedLessons[l.course_id]) completedLessons[l.course_id] = [];
    completedLessons[l.course_id].push(l.lesson_slug);
    totalXp += l.xp_earned;
  }

  return NextResponse.json({
    completedLessons,
    xp: totalXp,
    quizResults: quizzes.results,
  });
}

export async function POST(req: NextRequest) {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const { courseId, lessonSlug, xpEarned, type, examId, score, total } = await req.json();
  const db = await getDB();

  // Server-side XP validation: cap per-lesson XP to prevent manipulation
  const MAX_XP_PER_LESSON = 150;
  const validXp = Math.min(Math.max(0, xpEarned || 0), MAX_XP_PER_LESSON);

  if (type === "quiz") {
    await db
      .prepare("INSERT INTO quiz_results (user_id, exam_id, score, total) VALUES (?, ?, ?, ?)")
      .bind(user.userId, examId, score, total)
      .run();
    return NextResponse.json({ ok: true });
  }

  // Lesson completion — upsert
  await db
    .prepare(
      "INSERT INTO lesson_progress (user_id, course_id, lesson_slug, completed, xp_earned) VALUES (?, ?, ?, true, ?) ON CONFLICT(user_id, course_id, lesson_slug) DO NOTHING"
    )
    .bind(user.userId, courseId, lessonSlug, validXp)
    .run();

  return NextResponse.json({ ok: true });
}
