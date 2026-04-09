import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "AI道場の利用規約",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-8">利用規約</h1>
        <p className="text-xs text-[#a3a3a3] mb-8">最終更新日: 2026年4月10日</p>

        <div className="prose prose-sm max-w-none text-[#3a3a3a] space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">第1条（適用）</h2>
            <p className="text-sm leading-relaxed">
              本利用規約（以下「本規約」）は、合同会社Radineer（以下「当社」）が提供するオンライン学習サービス「AI道場」（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、本サービスを利用するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">第2条（アカウント登録）</h2>
            <p className="text-sm leading-relaxed">
              ユーザーは正確な情報を登録し、パスワードを適切に管理する責任を負います。アカウントの不正利用について当社は責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">第3条（料金と支払い）</h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li>有料プランの料金は料金ページに表示される金額とします。</li>
              <li>支払いはStripeを通じたクレジットカード決済で行われます。</li>
              <li>サブスクリプションは毎月自動更新されます。</li>
              <li>解約はアカウント設定またはStripe管理画面からいつでも可能です。</li>
              <li>解約後も当該請求期間の終了まで利用できます。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">第4条（禁止事項）</h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li>コンテンツの無断転載、複製、再配布</li>
              <li>不正アクセスやシステムへの攻撃</li>
              <li>他のユーザーへの迷惑行為</li>
              <li>アカウントの譲渡・共有</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">第5条（知的財産権）</h2>
            <p className="text-sm leading-relaxed">
              本サービスのコンテンツ（テキスト、画像、コード例等）の著作権は当社に帰属します。ユーザーは学習目的でのみ利用でき、商用利用には別途許諾が必要です。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">第6条（免責事項）</h2>
            <p className="text-sm leading-relaxed">
              本サービスは「現状有姿」で提供されます。当社は、コンテンツの正確性、完全性、最新性を保証するものではありません。本サービスの利用により生じた損害について、当社は法令上許容される範囲で責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">第7条（サービスの変更・終了）</h2>
            <p className="text-sm leading-relaxed">
              当社は、事前の通知なくサービス内容の変更、一時停止、終了を行うことがあります。有料プランの終了時は、残存期間の返金対応を行います。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">第8条（準拠法・管轄裁判所）</h2>
            <p className="text-sm leading-relaxed">
              本規約は日本法に準拠し、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section className="pt-4 border-t border-[#E5E5E5]">
            <p className="text-sm text-[#a3a3a3]">
              運営: 合同会社Radineer<br />
              お問い合わせ: yuichiyoshida@radineer.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
