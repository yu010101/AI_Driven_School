import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anthropic公式認定について",
  description: "Anthropic公式認定の受験方法、費用、出題範囲、合格ラインなど、試験に関する全ての情報。",
};

export default function CertAboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link href="/dojo/cert" className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-8 block">
          ← 認定対策に戻る
        </Link>

        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-8">Anthropic公式認定について</h1>

        {/* What is it */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">認定とは</h2>
          <p className="text-sm text-[#525252] leading-relaxed mb-4">
            Anthropicは「Anthropic Academy」として公式の学習・認定プログラムを提供しています。Skilljarプラットフォーム上で受講でき、コース修了時にデジタル証明書が発行されます。Claude Code、MCP、API開発、AIリテラシーなど幅広いトピックをカバーしています。
          </p>
        </section>

        {/* Available certifications */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">利用可能なコース（2026年4月時点）</h2>
          <div className="space-y-4">
            {[
              {
                name: "Claude 101",
                description: "Claude Codeの基本概念と初期設定。AIアシスタントとしてのClaude Codeの位置づけ、インストール、CLAUDE.md、基本操作。",
                difficulty: "初級",
              },
              {
                name: "Introduction to Claude Cowork",
                description: "Claudeとの協働作業の基礎。対話型のワークフロー設計と効果的なコミュニケーション。",
                difficulty: "初級",
              },
              {
                name: "Claude Code in Action",
                description: "Claude Codeの実務活用。ファイル操作、プロンプト設計、Git連携、デバッグ、Hooks、Permission Modes。",
                difficulty: "中級",
              },
              {
                name: "Building with the Claude API",
                description: "Claude APIを使ったアプリケーション開発。認証、リクエスト設計、ストリーミング、エラーハンドリング。",
                difficulty: "中級",
              },
              {
                name: "Introduction to Model Context Protocol",
                description: "MCPの概念と設定方法。外部サービス（Gmail, Slack, freee等）との連携。",
                difficulty: "中級",
              },
              {
                name: "Introduction to Agent Skills",
                description: "SKILL.md形式でのカスタムスキル作成。公式スキルのインストールと活用。",
                difficulty: "中級",
              },
              {
                name: "Introduction to Subagents",
                description: "マルチエージェント構成。並列処理、エージェントチームの設計と運用。",
                difficulty: "上級",
              },
              {
                name: "Model Context Protocol: Advanced Topics",
                description: "MCPの高度な設定。セキュリティ、カスタムサーバー構築、トラブルシューティング。",
                difficulty: "上級",
              },
              {
                name: "AI Fluency: Framework & Foundations",
                description: "AIの基礎フレームワーク。AI技術の概要、活用パターン、組織への導入方法。",
                difficulty: "初級",
              },
              {
                name: "AI Capabilities and Limitations",
                description: "AIの能力と限界。ハルシネーション、バイアス、適切なユースケースの判断。",
                difficulty: "初級",
              },
              {
                name: "Claude with Amazon Bedrock",
                description: "Amazon Bedrock経由でのClaude利用。AWS環境でのセットアップと運用。",
                difficulty: "中級",
              },
              {
                name: "Claude with Google Cloud's Vertex AI",
                description: "Google Cloud Vertex AI経由でのClaude利用。GCP環境でのセットアップと運用。",
                difficulty: "中級",
              },
            ].map((cert) => (
              <div key={cert.name} className="border border-[#E5E5E5] rounded-xl p-5 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-[#0A0A0A]">{cert.name}</h3>
                  <span className="text-xs text-[#94A3B8]">{cert.difficulty}</span>
                </div>
                <p className="text-sm text-[#525252]">{cert.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#94A3B8] mt-4">
            ※ 教育者・学生・非営利向けの専用コース（AI Fluency for educators / students / nonprofits、Teaching AI Fluency）も別途提供されています。
          </p>
        </section>

        {/* How to take the exam */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">受験方法</h2>
          <div className="space-y-3 text-sm text-[#525252] leading-relaxed">
            <div className="border border-[#E5E5E5] rounded-xl p-5 bg-white">
              <p className="font-bold text-[#0A0A0A] mb-1">1. アカウント作成</p>
              <p>Anthropic Academyにアクセスし、アカウントを作成します。メールアドレスで登録可能です。</p>
            </div>
            <div className="border border-[#E5E5E5] rounded-xl p-5 bg-white">
              <p className="font-bold text-[#0A0A0A] mb-1">2. コース受講</p>
              <p>各コースはオンデマンドで受講可能。動画/テキストのモジュールを順番に進めます。</p>
            </div>
            <div className="border border-[#E5E5E5] rounded-xl p-5 bg-white">
              <p className="font-bold text-[#0A0A0A] mb-1">3. テスト受験</p>
              <p>各モジュール末尾にクイズがあり、合格ラインを超えると修了証が発行されます。</p>
            </div>
            <div className="border border-[#E5E5E5] rounded-xl p-5 bg-white">
              <p className="font-bold text-[#0A0A0A] mb-1">4. 証明書取得</p>
              <p>修了するとデジタル証明書が発行されます。LinkedInプロフィール等に掲載可能です。</p>
            </div>
          </div>
        </section>

        {/* Cost */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">費用</h2>
          <p className="text-sm text-[#525252] leading-relaxed">
            Anthropic Academyのコースは現時点で無料で提供されています。受験にかかる費用はありません。
          </p>
        </section>

        {/* Exam format */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">出題形式</h2>
          <p className="text-sm text-[#525252] leading-relaxed mb-4">
            択一式のクイズ形式。各モジュールの末尾に出題されます。概念の理解度を確認する問題が中心です。
          </p>
          <p className="text-sm text-[#525252] leading-relaxed">
            AI道場の認定対策クイズは、公式試験と同じ択一形式で100問以上を用意しています。模擬試験モードでは全範囲からランダム30問が出題されます。
          </p>
        </section>

        {/* Link to official + AI道場 prep */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">対策の流れ</h2>
          <div className="space-y-3 text-sm text-[#525252]">
            <p>1. AI道場の実務レッスンで基礎を固める（Level 0-3）</p>
            <p>2. AI道場の認定対策クイズで知識を確認（100問）</p>
            <p>3. 模擬試験で80%以上取れるまで繰り返す</p>
            <p>4. Anthropic Academyで公式コースを受講・受験する</p>
          </div>
        </section>

        {/* External link */}
        <section className="border-t border-[#E5E5E5] pt-8">
          <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">公式サイト</h2>
          <a
            href="https://anthropic.skilljar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-sm font-bold text-white rounded-xl"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            Anthropic Academy
          </a>
          <p className="text-xs text-[#94A3B8] mt-3">
            外部サイトに遷移します
          </p>
        </section>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-[#E5E5E5] text-center">
          <Link
            href="/dojo/cert"
            className="inline-block px-6 py-3 text-sm font-bold text-[#0A0A0A] rounded-xl border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
          >
            認定対策クイズを始める
          </Link>
        </div>
      </div>
    </div>
  );
}
