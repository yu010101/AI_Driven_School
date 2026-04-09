"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import CertQuiz from "@/components/CertQuiz";

// Lazy imports will be replaced once data files exist
import { claude101Questions } from "@/lib/cert-data/claude-101";
import { codeInActionQuestions } from "@/lib/cert-data/code-in-action";
import { mcpQuestions } from "@/lib/cert-data/mcp";
import { skillsQuestions } from "@/lib/cert-data/skills";
import { subagentsQuestions } from "@/lib/cert-data/subagents";

const examConfig: Record<string, { title: string; description: string }> = {
  "claude-101": {
    title: "Claude 101",
    description: "Claude Codeの基本概念",
  },
  "code-in-action": {
    title: "Claude Code in Action",
    description: "実務でのClaude Code活用",
  },
  mcp: {
    title: "MCP（Model Context Protocol）",
    description: "外部サービス連携",
  },
  skills: {
    title: "Agent Skills",
    description: "スキル作成と活用",
  },
  subagents: {
    title: "Subagents + Enterprise",
    description: "マルチエージェントと企業運用",
  },
  "mock-exam": {
    title: "模擬試験",
    description: "全範囲からランダム30問",
  },
};

function getQuestions(examId: string) {
  switch (examId) {
    case "claude-101":
      return claude101Questions;
    case "code-in-action":
      return codeInActionQuestions;
    case "mcp":
      return mcpQuestions;
    case "skills":
      return skillsQuestions;
    case "subagents":
      return subagentsQuestions;
    case "mock-exam":
      // Combine all questions for mock exam
      return [
        ...claude101Questions,
        ...codeInActionQuestions,
        ...mcpQuestions,
        ...skillsQuestions,
        ...subagentsQuestions,
      ];
    default:
      return [];
  }
}

export default function CertExamPage() {
  const params = useParams();
  const examId = params.examId as string;

  const config = examConfig[examId];
  const questions = useMemo(() => getQuestions(examId), [examId]);

  if (!config || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#525252]">試験が見つかりません</p>
      </div>
    );
  }

  return (
    <CertQuiz
      title={config.title}
      description={config.description}
      questions={questions}
      isMockExam={examId === "mock-exam"}
    />
  );
}
