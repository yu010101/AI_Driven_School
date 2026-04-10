import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "法人プラン",
  description: "チームでAI道場を導入。進捗管理、カスタム課題、認定取得支援。",
};

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
          チームでAIスキルを底上げする
        </h1>
        <p className="text-base text-[#3a3a3a] mb-4 leading-relaxed">
          AI道場の法人プランで、チーム全員がClaude Codeを使いこなせるようになります。Anthropic公式認定の取得を全面サポート。
        </p>
        <p className="text-sm text-[#94A3B8] mb-12">
          合同会社Radineer が運営
        </p>

        {/* What you get */}
        <div className="space-y-6 mb-16">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <h3 className="font-bold text-[#0A0A0A] mb-2">全51レッスン解放</h3>
            <p className="text-sm text-[#3a3a3a]">
              実務レシピ10選から認定試験対策まで。白帯から伝説まで、チーム全員で段位を上げていく。
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <h3 className="font-bold text-[#0A0A0A] mb-2">チーム進捗ダッシュボード</h3>
            <p className="text-sm text-[#3a3a3a]">
              誰がどのレッスンまで完了したか、一覧で確認。研修の成果を数値で把握できます。
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <h3 className="font-bold text-[#0A0A0A] mb-2">認定取得サポート</h3>
            <p className="text-sm text-[#3a3a3a]">
              Anthropic公式認定（Claude 101 / Code in Action / MCP）の取得を2週間スプリントで支援。合格まで伴走します。
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <h3 className="font-bold text-[#0A0A0A] mb-2">AI経営OS導入コンサルティング</h3>
            <p className="text-sm text-[#3a3a3a]">
              OpenClaw（AI経営OS）の設計と導入。CFO・COO・CMO・CEOの4エージェントが24時間あなたの会社を動かす仕組みを構築。
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 mb-16">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">料金</h2>
          <div className="space-y-4">
            <div className="py-4 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-[#0A0A0A]">チームプラン</p>
                  <p className="text-sm text-[#525252]">3名以上</p>
                </div>
                <p className="text-xl font-bold text-[#0A0A0A]">¥10,000<span className="text-sm font-normal text-[#525252]">/人/月</span></p>
              </div>
              <Link
                href="/auth?plan=team"
                className="inline-block px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: "#0A0A0A" }}
              >
                チームプランを始める
              </Link>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
              <div>
                <p className="font-bold text-[#0A0A0A]">認定取得スプリント</p>
                <p className="text-sm text-[#525252]">2週間集中プログラム</p>
              </div>
              <p className="text-xl font-bold text-[#0A0A0A]">¥300,000<span className="text-sm font-normal text-[#525252]">/回</span></p>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-[#0A0A0A]">AI経営OS導入</p>
                <p className="text-sm text-[#525252]">OpenClaw構築+運用支援</p>
              </div>
              <p className="text-xl font-bold text-[#0A0A0A]">¥500,000〜</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">お問い合わせ</h2>
          <p className="text-sm text-[#525252] mb-8 max-w-md mx-auto">
            導入のご相談、料金のお見積もり、デモのご要望など、お気軽にご連絡ください。
          </p>
          <a
            href="mailto:yuichiyoshida@radineer.com?subject=AI道場 法人プランのお問い合わせ"
            className="inline-block px-8 py-4 text-base font-bold text-white rounded-xl"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            メールで問い合わせる
          </a>
          <p className="text-sm text-[#94A3B8] mt-4">
            yuichiyoshida@radineer.com
          </p>
        </div>
      </div>
    </div>
  );
}
