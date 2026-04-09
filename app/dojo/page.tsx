import { getCourses } from "@/lib/courses";
import type { Metadata } from "next";
import { verifyToken } from "@/lib/db/auth";
import { getUserPlan } from "@/lib/subscription";
import DojoClient from "./DojoClient";

export const metadata: Metadata = {
  title: "道場",
  description:
    "経営者・ビジネスマン向け。セットアップ不要、ブラウザ上でClaude Codeをステップバイステップで学べるインタラクティブ学習プラットフォーム。",
};

export default async function DojoPage() {
  const courses = getCourses();

  let isAuthenticated = false;
  let userPlan: "free" | "pro" | "team" = "free";

  try {
    const user = await verifyToken();
    if (user) {
      isAuthenticated = true;
      const sub = await getUserPlan(user.userId);
      userPlan = sub.plan;
    }
  } catch {}

  return (
    <DojoClient
      courses={courses}
      isAuthenticated={isAuthenticated}
      userPlan={userPlan}
    />
  );
}
