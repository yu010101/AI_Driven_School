import fs from "fs";
import path from "path";
import matter from "gray-matter";

const coursesDir = path.join(process.cwd(), "content/courses");

export interface RelatedArticle {
  title: string;
  path: string;
}

export interface LessonMeta {
  title: string;
  step: number;
  totalSteps: number;
  expectedCommand: string;
  acceptableCommands?: string[];
  simulatedOutput: string;
  hint: string;
  relatedArticles?: RelatedArticle[];
  quiz?: { question: string; choices: string[]; answer: number }[];
}

export interface Lesson {
  meta: LessonMeta;
  content: string;
  slug: string;
}

export interface CourseMeta {
  id: string;
  title: string;
  description: string;
  emoji: string;
  level: number;
  totalLessons: number;
  estimatedMinutes: number;
  certification?: string;
}

export function getCourses(): CourseMeta[] {
  const dirs = fs.readdirSync(coursesDir);
  return dirs
    .map((dir) => {
      const metaPath = path.join(coursesDir, dir, "course.json");
      if (!fs.existsSync(metaPath)) return null;
      const raw = fs.readFileSync(metaPath, "utf-8");
      return JSON.parse(raw) as CourseMeta;
    })
    .filter((c): c is CourseMeta => c !== null)
    .sort((a, b) => a.level - b.level);
}

export function getCourse(courseId: string): CourseMeta | null {
  const metaPath = path.join(coursesDir, courseId, "course.json");
  if (!fs.existsSync(metaPath)) return null;
  return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
}

export function getLessons(courseId: string): Lesson[] {
  const courseDir = path.join(coursesDir, courseId);
  if (!fs.existsSync(courseDir)) return [];

  const files = fs
    .readdirSync(courseDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(courseDir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      meta: data as LessonMeta,
      content,
      slug: file.replace(/\.md$/, ""),
    };
  });
}

export function getLesson(
  courseId: string,
  lessonSlug: string
): Lesson | null {
  const filePath = path.join(coursesDir, courseId, `${lessonSlug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: data as LessonMeta,
    content,
    slug: lessonSlug,
  };
}
