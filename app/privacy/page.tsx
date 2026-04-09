import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "AI道場のプライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-8">プライバシーポリシー</h1>
        <p className="text-xs text-[#a3a3a3] mb-8">最終更新日: 2026年4月10日</p>

        <div className="prose prose-sm max-w-none text-[#3a3a3a] space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">1. 収集する情報</h2>
            <p className="text-sm leading-relaxed mb-2">当社は以下の情報を収集します:</p>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li><strong>アカウント情報:</strong> メールアドレス、名前、会社名（任意）</li>
              <li><strong>学習データ:</strong> コース進捗、レッスン完了状況、認定試験結果</li>
              <li><strong>決済情報:</strong> Stripeを通じて処理されます。当社はクレジットカード番号を直接保存しません。</li>
              <li><strong>利用データ:</strong> アクセスログ、IPアドレス、ブラウザ情報（Google Analyticsによる匿名収集）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">2. 情報の利用目的</h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li>サービスの提供・改善</li>
              <li>学習進捗の保存・同期</li>
              <li>サブスクリプションの管理・課金処理</li>
              <li>サービスに関する通知</li>
              <li>不正利用の防止</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">3. 情報の共有</h2>
            <p className="text-sm leading-relaxed">
              当社はユーザーの個人情報を第三者に販売しません。以下の場合に限り共有することがあります:
            </p>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2 mt-2">
              <li><strong>Stripe:</strong> 決済処理のため</li>
              <li><strong>Google Analytics:</strong> 匿名の利用分析のため（Cookie同意後のみ）</li>
              <li><strong>法的要請:</strong> 法令に基づく開示要請があった場合</li>
              <li><strong>チーム機能:</strong> チーム管理者はメンバーの学習進捗を閲覧できます</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">4. Cookieの使用</h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li><strong>必須Cookie:</strong> 認証トークン（ai-dojo-token）— サービス利用に必須</li>
              <li><strong>分析Cookie:</strong> Google Analytics — ユーザーの同意後に使用</li>
            </ul>
            <p className="text-sm leading-relaxed mt-2">
              Cookieの設定はブラウザから変更できます。必須Cookie を無効にするとログインできなくなります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">5. データの保護</h2>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li>パスワードはbcryptでハッシュ化して保存</li>
              <li>通信はHTTPS（TLS 1.3）で暗号化</li>
              <li>認証トークンはHttpOnly Cookieで管理</li>
              <li>データベースはNeon PostgreSQL（暗号化保存）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">6. ユーザーの権利</h2>
            <p className="text-sm leading-relaxed">ユーザーは以下の権利を有します:</p>
            <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2 mt-2">
              <li><strong>アクセス権:</strong> アカウント設定ページからご自身のデータを確認できます</li>
              <li><strong>訂正権:</strong> プロフィール情報はいつでも変更可能です</li>
              <li><strong>削除権:</strong> アカウント設定からアカウントと全データを削除できます</li>
              <li><strong>データポータビリティ:</strong> ご要望に応じてデータのエクスポートに対応します</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">7. 未成年者の保護</h2>
            <p className="text-sm leading-relaxed">
              本サービスは16歳以上を対象としています。16歳未満の方は保護者の同意を得てご利用ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-3">8. ポリシーの変更</h2>
            <p className="text-sm leading-relaxed">
              本ポリシーは変更されることがあります。重要な変更がある場合はサービス上で通知します。
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
