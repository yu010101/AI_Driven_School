import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '0円マーケティングの教科書',
  description: '作ったプロダクトを0円で集客する方法をまとめた無料教科書',
}

export default function ZeroMarketingBook() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-14">
        <div className="step-badge mb-4">STEP 3 / 売る</div>
        <h1 className="page-title">0円マーケティングの教科書</h1>
        <p className="text-lg text-foreground/60 mt-4">
          作ったものを、広告費ゼロで届ける。<br />
          その方法をまとめました。
        </p>
      </div>

      <div className="space-y-8">
        {/* 対象者 */}
        <section className="card p-8">
          <h2 className="sub-heading">こんな人向け</h2>
          <ul className="space-y-4 mt-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-foreground/80">アプリやサービスを作ったけど、誰にも使われていない</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-foreground/80">広告費をかけずに集客したい</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-foreground/80">SNSやSEOの活用方法が分からない</span>
            </li>
          </ul>
        </section>

        {/* 学べること */}
        <section className="card p-8">
          <h2 className="sub-heading">学べること</h2>
          <ul className="space-y-4 mt-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold w-6">1.</span>
              <span className="text-foreground/80">0円マーケティングの考え方</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold w-6">2.</span>
              <span className="text-foreground/80">Xでの集客方法</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold w-6">3.</span>
              <span className="text-foreground/80">noteを使ったコンテンツマーケ</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold w-6">4.</span>
              <span className="text-foreground/80">プログラマティックSEO</span>
            </li>
          </ul>
        </section>

        {/* 今すぐ読める */}
        <section className="card-strong p-10">
          <h2 className="section-heading-center">今すぐ無料で読む</h2>
          <p className="text-foreground/60 mt-6 mb-8 text-center">
            以下のリンクから、すべて無料で読めます。
          </p>
          <div className="space-y-4">
            <a
              href="https://note.com/l_mrk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center block cursor-pointer"
            >
              noteで読む（まとめ記事）
            </a>
            <a
              href="https://x.com/L_go_mrk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center block cursor-pointer"
            >
              Xで最新情報を見る
            </a>
          </div>
        </section>

        {/* 関連記事 */}
        <section className="card p-8">
          <h2 className="sub-heading">関連記事を読む</h2>
          <div className="space-y-4 mt-4">
            <Link
              href="/knowledge/marketing/x-thread"
              className="block p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <span className="text-primary font-bold">✓</span> Xスレッドで集客する方法
            </Link>
            <Link
              href="/knowledge/marketing/programmatic-seo"
              className="block p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <span className="text-primary font-bold">✓</span> プログラマティックSEO入門
            </Link>
          </div>
        </section>

        {/* ナビゲーション */}
        <nav className="flex justify-center gap-4 pt-6">
          <Link href="/free" className="btn-secondary">
            ← 無料で学ぶ
          </Link>
          <Link href="/knowledge/marketing" className="btn-primary">
            もっと記事を見る →
          </Link>
        </nav>
      </div>
    </div>
  )
}
