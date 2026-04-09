import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "認定対策",
  description: "Anthropic公式認定の試験対策。Claude 101からMCP Advancedまで、100問以上の択一クイズと模擬試験。",
};

const exams = [
  {
    id: "claude-101",
    title: "Claude 101",
    description: "Claude Codeの基本概念。インストール、起動、CLAUDE.md、基本操作。",
    questionCount: 20,
  },
  {
    id: "code-in-action",
    title: "Claude Code in Action",
    description: "ファイル操作、プロンプト設計、出力形式指定、実務ワークフロー。",
    questionCount: 30,
  },
  {
    id: "mcp",
    title: "MCP（Model Context Protocol）",
    description: "外部サービス連携、MCPサーバー設定、Gmail/Slack/freee接続。",
    questionCount: 20,
  },
  {
    id: "skills",
    title: "Agent Skills",
    description: "SKILL.md作成、カスタムコマンド、スキルの組み合わせ、SkillGraph。",
    questionCount: 15,
  },
  {
    id: "subagents",
    title: "Subagents + Enterprise",
    description: "マルチエージェント、Hooks、Permission、Context Window、コスト管理、GitHub Actions。",
    questionCount: 15,
  },
  {
    id: "mock-exam",
    title: "模擬試験",
    description: "全範囲からランダム30問。本番と同じ形式で実力を測る。",
    questionCount: 30,
  },
];

export default function CertIndexPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-8 block">
          ← 戻る
        </Link>

        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">認定対策</h1>
        <p className="text-sm text-[#525252] mb-4">
          Anthropic公式認定の試験対策。100問以上の択一クイズで知識を確認。
        </p>
        <Link href="/dojo/cert/about" className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-12 block">
          Anthropic公式認定について詳しく
        </Link>

        <div className="space-y-3">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              href={`/dojo/cert/${exam.id}`}
              className="block bg-white rounded-xl border border-[#E5E5E5] p-5 hover:border-[#0A0A0A] transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-[#0A0A0A]">{exam.title}</h3>
                <span className="text-xs text-[#94A3B8]">{exam.questionCount}問</span>
              </div>
              <p className="text-sm text-[#525252]">{exam.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
