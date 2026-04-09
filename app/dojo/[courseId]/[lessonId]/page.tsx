import { getCourse, getLessons, getLesson } from "@/lib/courses";
import { notFound } from "next/navigation";
import LessonClient from "./LessonClient";
import AccessGate from "@/components/AccessGate";

interface Props {
  params: { courseId: string; lessonId: string };
}

export default function LessonPage({ params }: Props) {
  const course = getCourse(params.courseId);
  if (!course) notFound();

  const lesson = getLesson(params.courseId, params.lessonId);
  if (!lesson) notFound();

  const allLessons = getLessons(params.courseId);
  const currentIndex = allLessons.findIndex((l) => l.slug === params.lessonId);
  const nextLesson = allLessons[currentIndex + 1] ?? null;

  return (
    <AccessGate requiredLevel={course.level}>
      <LessonClient
        courseId={params.courseId}
        courseTitle={course.title}
        lesson={{
          title: lesson.meta.title,
          step: lesson.meta.step,
          totalSteps: lesson.meta.totalSteps,
          expectedCommand: lesson.meta.expectedCommand,
          acceptableCommands: lesson.meta.acceptableCommands,
          simulatedOutput: lesson.meta.simulatedOutput,
          hint: lesson.meta.hint,
          content: lesson.content,
          slug: lesson.slug,
          relatedArticles: lesson.meta.relatedArticles,
          quiz: lesson.meta.quiz,
        }}
        nextLessonSlug={nextLesson?.slug ?? null}
        isLastLessonOfCourse={currentIndex === allLessons.length - 1}
      />
    </AccessGate>
  );
}

export function generateStaticParams() {
  // Dynamically generate from course content
  const fs = require("fs");
  const path = require("path");
  const coursesDir = path.join(process.cwd(), "content/courses");
  const params: { courseId: string; lessonId: string }[] = [];

  for (const courseId of fs.readdirSync(coursesDir)) {
    const courseDir = path.join(coursesDir, courseId);
    if (!fs.statSync(courseDir).isDirectory()) continue;
    for (const file of fs.readdirSync(courseDir)) {
      if (file.endsWith(".md")) {
        params.push({ courseId, lessonId: file.replace(/\.md$/, "") });
      }
    }
  }
  return params;
}
