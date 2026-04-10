import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "用語集",
  description: "AI道場で使われる専門用語の解説。Claude Code、MCP、SKILL.md、Hooks、Subagentsなど。",
};

const terms = [
  {
    term: "Claude Code",
    reading: "クロード コード",
    description: "Anthropic社が提供するターミナルベースのAIアシスタント。自然言語でコーディング、ファイル操作、プロジェクト管理ができる。",
    relatedLevel: "Level 0",
  },
  {
    term: "CLAUDE.md",
    reading: "クロード エムディー",
    description: "プロジェクトのルートに置く設定ファイル。Claude Codeが毎回自動で読み込み、プロジェクト固有のルールや文脈を理解する「説明書」。",
    relatedLevel: "Level 0",
  },
  {
    term: "MCP",
    reading: "エムシーピー / Model Context Protocol",
    description: "Claude Codeと外部サービス（Gmail、Slack、freeeなど）を接続するプロトコル。APIキーを登録すれば、AIが外部サービスを直接操作できる。",
    relatedLevel: "Level 3",
  },
  {
    term: "SKILL.md",
    reading: "スキル エムディー",
    description: "Claude Codeに専門知識を与える拡張ファイル。SEO、経理、デザインなど、特定分野のルールを記述することでAIの回答品質を劇的に向上させる。",
    relatedLevel: "Level 4",
  },
  {
    term: "Skills",
    reading: "スキルズ",
    description: "SKILL.mdファイルとして配布されるClaude Codeの拡張プラグイン。1,300以上が公開されており、無料でインストールできる。",
    relatedLevel: "Level 4",
  },
  {
    term: "Hooks",
    reading: "フック",
    description: "Claude Codeの特定のアクション（ファイル編集、コミットなど）の前後に自動で実行される処理。CI/CDのようなパイプラインを構築できる。",
    relatedLevel: "Level 8",
  },
  {
    term: "Permission Mode",
    reading: "パーミッション モード",
    description: "Claude Codeが実行できる操作の範囲を制御する設定。Restrictive（全て確認）、Default（読取は自動、書込は確認）、Permissive（全て自動）の3段階。",
    relatedLevel: "Level 8",
  },
  {
    term: "Context Window",
    reading: "コンテキスト ウィンドウ",
    description: "AIが一度に処理できるテキストの最大量（約100Kトークン）。会話が長くなると古い情報を忘れるため、/clearで定期的にリセットする。",
    relatedLevel: "Level 8",
  },
  {
    term: "Subagent",
    reading: "サブエージェント",
    description: "メインのClaude Codeセッションから分離して並列で動くAIワーカー。大規模タスクを分割して同時処理する際に使用する。",
    relatedLevel: "Level 5",
  },
  {
    term: "OpenClaw",
    reading: "オープンクロー",
    description: "CFO/COO/CMO/CEOの4つのAIエージェントで構成されるAI経営OS。実際にRadineer社で稼働しているシステムをLevel 5で学べる。",
    relatedLevel: "Level 5",
  },
  {
    term: "Sandbox",
    reading: "サンドボックス",
    description: "AIの操作を安全な範囲に制限する実行環境。プロジェクト外のファイル変更やシステム設定の変更を防止する。",
    relatedLevel: "Level 9",
  },
  {
    term: "ZDR",
    reading: "ゼットディーアール / Zero Data Retention",
    description: "Anthropic社がAPIで送信されたデータを保存しない設定。機密データを扱う企業向けのセキュリティ機能。",
    relatedLevel: "Level 9",
  },
  {
    term: "Token",
    reading: "トークン",
    description: "AIが処理するテキストの最小単位。日本語は約1文字=1トークン、英語は約4文字=1トークン。料金はトークン数で計算される。",
    relatedLevel: "Level 8",
  },
  {
    term: "cron",
    reading: "クロン",
    description: "指定した時間に自動でコマンドを実行するスケジュール機能。GitHub Actionsと組み合わせて、朝のブリーフィング自動生成などに使う。",
    relatedLevel: "Level 5",
  },
];

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">用語集</h1>
        <p className="text-sm text-[#525252] mb-8">
          AI道場で使われる専門用語の解説。{terms.length}用語を収録。
        </p>

        <div className="space-y-4">
          {terms.map((t) => (
            <div
              key={t.term}
              className="bg-white rounded-xl border border-[#E5E5E5] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-[#0A0A0A]">{t.term}</h2>
                  <p className="text-xs text-[#94A3B8] mb-2">{t.reading}</p>
                  <p className="text-sm text-[#525252] leading-relaxed">
                    {t.description}
                  </p>
                </div>
                <span className="text-xs font-medium text-[#94A3B8] bg-[#F5F5F5] px-2 py-0.5 rounded-full whitespace-nowrap">
                  {t.relatedLevel}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dojo"
            className="text-sm font-medium text-[#0A0A0A] hover:underline"
          >
            道場で学習を始める
          </Link>
        </div>
      </div>
    </div>
  );
}
