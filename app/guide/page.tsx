import Link from 'next/link'
import type { Metadata } from 'next'
import { guides } from '@/content/guides'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: '完全ガイド一覧｜AI駆動塾',
  description: 'バイブコーディング、AIアプリ開発、0円マーケティングの完全ガイド。非エンジニアでも理解できる体系的な解説。',
  openGraph: {
    title: '完全ガイド一覧｜AI駆動塾',
    description: 'バイブコーディング、AIアプリ開発、0円マーケティングの完全ガイド',
    url: `${baseUrl}/guide`,
  },
  alternates: {
    canonical: `${baseUrl}/guide`,
  },
}

const guideCategories = [
  {
    id: 'vibe-coding',
    title: 'バイブコーディング',
    description: 'AIに指示を出すだけでアプリが作れる開発手法',
    color: 'from-[#6366F1] to-[#818CF8]',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'build',
    title: '実装パターン',
    description: 'ログイン・決済など、よくある機能の作り方',
    color: 'from-[#06B6D4] to-[#22D3EE]',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'marketing',
    title: '0円マーケティング',
    description: '広告費ゼロで集客する方法',
    color: 'from-[#F97316] to-[#FB923C]',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

export default function GuidesPage() {
  const guideList = Object.entries(guides).map(([slug, guide]) => ({
    slug,
    ...guide,
  }))

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#0A0A0A] text-white text-xs font-bold rounded-full mb-4">
            COMPLETE GUIDES
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            完全ガイド
          </h1>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            非エンジニアでも理解できる、体系的で網羅的なガイド。
            <br className="hidden md:block" />
            基礎から実践まで、これを読めば全体像が分かります。
          </p>
        </header>

        {/* Category Overview */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {guideCategories.map((category) => (
              <div
                key={category.id}
                className="card p-6 text-center"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                <p className="text-sm text-[#525252]">{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guides List */}
        <section>
          <h2 className="text-2xl font-bold mb-8">全ガイド一覧</h2>
          <div className="grid gap-6">
            {guideList.map((guide, index) => (
              <Link
                key={guide.slug}
                href={`/guide/${guide.slug}`}
                className="card group p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {guide.badges?.map((badge) => (
                      <span
                        key={badge}
                        className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#6366F1]/10 text-[#6366F1]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#6366F1] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-[#525252] mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#64748B]">
                    <span>読了: 約{guide.readTime}分</span>
                    <span>更新: {guide.updatedAt}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 self-center">
                  <span className="inline-flex items-center gap-2 text-[#6366F1] font-semibold group-hover:gap-3 transition-all">
                    読む
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center">
          <div className="card max-w-2xl mx-auto p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">個別の記事も読めます</h2>
            <p className="text-[#525252] mb-6">
              ガイドで全体像を掴んだら、気になるトピックを深掘りしましょう
            </p>
            <Link
              href="/knowledge"
              className="btn-cta inline-flex items-center gap-2"
            >
              記事一覧へ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
