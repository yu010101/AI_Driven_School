import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '非エンジニアでも「作れて・動いて・売れる」をAIで実現',
  description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900">
          コードが書けなくても、
          <br />
          <span className="text-black">AIでアプリが作れる</span>
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          バイブコーディング = AIに指示を出すだけの開発手法。
          <br />
          作り方から売り方まで、すべて無料で学べます。
        </p>

        {/* こんな人向け */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md mx-auto mb-8 text-left shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">こんな人向け</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-black mt-0.5">✓</span>
              <span>アプリを作りたいけど、コードは書けない</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black mt-0.5">✓</span>
              <span>作ったものを、どう売ればいいか分からない</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/free/vibe-coding-book"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            5分で分かる：AIでアプリを作る方法
          </Link>
          <Link
            href="/knowledge"
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:border-black hover:text-black transition-colors"
          >
            記事を読む
          </Link>
        </div>
      </section>

      {/* 3つの学び */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">学べること</h2>
          <p className="text-gray-500">3つのステップで「作れて売れる」状態へ</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* 1. 作る */}
          <Link href="/knowledge/vibe-coding" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all group">
            <span className="inline-block px-3 py-1 text-xs font-bold bg-gray-100 text-black rounded-full mb-3">
              STEP 1
            </span>
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-black">
              バイブコーディング
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              AIに指示を出すだけでアプリが作れる開発手法
            </p>
            <span className="text-black text-sm font-medium">
              詳しく見る →
            </span>
          </Link>

          {/* 2. 動かす */}
          <Link href="/knowledge/build" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all group">
            <span className="inline-block px-3 py-1 text-xs font-bold bg-gray-100 text-black rounded-full mb-3">
              STEP 2
            </span>
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-black">
              実装パターン
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              ログイン・決済など、よくある機能の作り方
            </p>
            <span className="text-black text-sm font-medium">
              詳しく見る →
            </span>
          </Link>

          {/* 3. 売る */}
          <Link href="/knowledge/marketing" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all group">
            <span className="inline-block px-3 py-1 text-xs font-bold bg-gray-100 text-black rounded-full mb-3">
              STEP 3
            </span>
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-black">
              0円マーケティング
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              広告費ゼロで集客する方法
            </p>
            <span className="text-black text-sm font-medium">
              詳しく見る →
            </span>
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center">
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-8 max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-2">まずは無料で読む</h2>
          <p className="text-gray-600 mb-6">
            noteとXで、バイブコーディングの基礎から実践まで公開しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://note.com/l_mrk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              noteで読む
            </a>
            <a
              href="https://x.com/L_go_mrk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:border-black hover:text-black transition-colors"
            >
              Xをフォロー
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
