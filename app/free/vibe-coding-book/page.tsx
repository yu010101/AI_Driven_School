import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'バイブコーディングの教科書',
  description: '非エンジニアでもAIでアプリを作る方法を体系的に学べる無料教科書',
}

export default function VibeCodingBook() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-14">
        <div className="step-badge mb-4">STEP 1 / 作る</div>
        <h1 className="page-title">バイブコーディングの教科書</h1>
        <p className="text-lg text-foreground/60 mt-4">
          AIに指示を出すだけでアプリが作れる。<br />
          その方法を体系的にまとめました。
        </p>
      </div>

      <div className="space-y-8">
        {/* 対象者 */}
        <section className="card p-8">
          <h2 className="sub-heading">こんな人向け</h2>
          <ul className="space-y-4 mt-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-foreground/80">コードは書けないけど、アプリを作ってみたい</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-foreground/80">ChatGPTは使えるけど、開発に活かせていない</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-foreground/80">「作る」の最初の一歩が分からない</span>
            </li>
          </ul>
        </section>

        {/* 学べること */}
        <section className="card p-8">
          <h2 className="sub-heading">学べること</h2>
          <ul className="space-y-4 mt-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold w-6">1.</span>
              <span className="text-foreground/80">バイブコーディングとは何か</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold w-6">2.</span>
              <span className="text-foreground/80">AIへの指示の出し方（プロンプト）</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold w-6">3.</span>
              <span className="text-foreground/80">よくある失敗と対処法</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold w-6">4.</span>
              <span className="text-foreground/80">最初のアプリを作るまでの流れ</span>
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
              href="/knowledge/vibe-coding/what-is-vibe-coding"
              className="block p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <span className="text-primary font-bold">✓</span> バイブコーディングとは？
            </Link>
            <Link
              href="/knowledge/vibe-coding/vibe-coding-prompts"
              className="block p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <span className="text-primary font-bold">✓</span> プロンプトの書き方
            </Link>
          </div>
        </section>

        {/* ナビゲーション */}
        <nav className="flex justify-center gap-4 pt-6">
          <Link href="/free" className="btn-secondary">
            ← 無料で学ぶ
          </Link>
          <Link href="/knowledge/vibe-coding" className="btn-primary">
            もっと記事を見る →
          </Link>
        </nav>
      </div>
    </div>
  )
}
