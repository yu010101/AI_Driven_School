import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '非エンジニアでも「作れて・動いて・売れる」をAIで実現',
  description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
}

export default function Home() {
  return (
    <div>
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#ECFEFF] to-[#FFF7ED] opacity-70" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#E2E8F0] mb-6 shadow-sm">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
              <span className="text-sm text-[#64748B]">非エンジニア向け AI開発プラットフォーム</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-[#0F172A]">コードが書けなくても、</span>
              <br />
              <span className="bg-gradient-to-r from-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
                AIでアプリが作れる
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#64748B] mb-8 max-w-2xl mx-auto leading-relaxed">
              バイブコーディング = AIに指示を出すだけの開発手法。
              <br className="hidden md:block" />
              作り方から売り方まで、すべて<span className="text-[#6366F1] font-semibold">無料</span>で学べます。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/free/vibe-coding-book"
                className="btn-cta inline-flex items-center justify-center gap-2"
              >
                <span>5分で分かる：AIでアプリを作る方法</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/knowledge"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                記事を読む
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#64748B]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6366F1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>20+記事公開中</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6366F1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>完全無料</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6366F1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>初心者歓迎</span>
              </div>
            </div>
          </div>

          {/* Target Audience Card */}
          <div className="card max-w-lg mx-auto">
            <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              こんな人向け
            </h3>
            <ul className="space-y-3 text-[#0F172A]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-[#EEF2FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>アプリを作りたいけど、コードは書けない</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-[#EEF2FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>作ったものを、どう売ればいいか分からない</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3つの学び */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3">学べること</h2>
            <p className="text-[#64748B]">3つのステップで「作れて売れる」状態へ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* 1. 作る */}
            <Link href="/knowledge/vibe-coding" className="card group cursor-pointer">
              <div className="step-badge">STEP 1</div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-[#0F172A] group-hover:text-[#6366F1] transition-colors">
                バイブコーディング
              </h3>
              <p className="text-[#64748B] text-sm mb-4">
                AIに指示を出すだけでアプリが作れる開発手法
              </p>
              <span className="text-[#6366F1] text-sm font-medium inline-flex items-center gap-1">
                詳しく見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* 2. 動かす */}
            <Link href="/knowledge/build" className="card group cursor-pointer">
              <div className="step-badge">STEP 2</div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-[#0F172A] group-hover:text-[#06B6D4] transition-colors">
                実装パターン
              </h3>
              <p className="text-[#64748B] text-sm mb-4">
                ログイン・決済など、よくある機能の作り方
              </p>
              <span className="text-[#06B6D4] text-sm font-medium inline-flex items-center gap-1">
                詳しく見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* 3. 売る */}
            <Link href="/knowledge/marketing" className="card group cursor-pointer">
              <div className="step-badge">STEP 3</div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                0円マーケティング
              </h3>
              <p className="text-[#64748B] text-sm mb-4">
                広告費ゼロで集客する方法
              </p>
              <span className="text-[#F97316] text-sm font-medium inline-flex items-center gap-1">
                詳しく見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl max-w-3xl mx-auto">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1] to-[#4F46E5]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#06B6D4]/20 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">まずは無料で読む</h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                noteとXで、バイブコーディングの基礎から実践まで公開しています。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://note.com/l_mrk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-[#6366F1] font-semibold rounded-xl hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 21H9V10h6v11zm-4-2h2v-7h-2v7zm10-9H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h5v-7h8v7h5c.55 0 1-.45 1-1V11c0-.55-.45-1-1-1z"/>
                  </svg>
                  noteで読む
                </a>
                <a
                  href="https://x.com/L_go_mrk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Xをフォロー
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
