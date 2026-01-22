import Link from 'next/link'
import type { Metadata } from 'next'
import { getRecentArticles, getCategoryStats, type Article, type CategoryStats } from '@/lib/mdx'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: '非エンジニアでも「作れて・動いて・売れる」をAIで実現',
  description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
}

// EducationalOrganization Schema (JSON-LD) - ホームページ向け
const educationalOrgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${baseUrl}/#educational-organization`,
  name: 'AI駆動塾',
  alternateName: 'AI Driven School',
  url: baseUrl,
  description: '非エンジニアでもAIを使ってアプリを作り、売る方法を学べる無料オンラインスクール',
  logo: `${baseUrl}/icon-512.png`,
  sameAs: [
    'https://x.com/L_go_mrk',
    'https://note.com/l_mrk',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Japan',
  },
  availableLanguage: 'Japanese',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '無料学習コンテンツ',
    itemListElement: [
      {
        '@type': 'Course',
        name: 'バイブコーディング入門',
        description: 'AIに指示を出すだけでアプリが作れる開発手法',
        provider: {
          '@type': 'Organization',
          name: 'AI駆動塾',
        },
        isAccessibleForFree: true,
      },
      {
        '@type': 'Course',
        name: '実装パターン',
        description: 'ログイン・決済など、よくある機能の作り方',
        provider: {
          '@type': 'Organization',
          name: 'AI駆動塾',
        },
        isAccessibleForFree: true,
      },
      {
        '@type': 'Course',
        name: '0円マーケティング',
        description: '広告費ゼロで集客する方法',
        provider: {
          '@type': 'Organization',
          name: 'AI駆動塾',
        },
        isAccessibleForFree: true,
      },
    ],
  },
}

// SoftwareApplication Schema (JSON-LD) - プラットフォームとして
const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Driven School',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web Browser',
  url: baseUrl,
  description: '非エンジニア向けAI開発学習プラットフォーム',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
  featureList: [
    'バイブコーディング学習',
    '実装パターン解説',
    '0円マーケティングノウハウ',
    'サイト内検索',
  ],
  inLanguage: 'ja',
}

// カテゴリアイコンコンポーネント
function CategoryIcon({ icon, className, color }: { icon: string; className?: string; color?: string }) {
  const style = color ? { color } : undefined
  const icons: Record<string, JSX.Element> = {
    code: (
      <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    build: (
      <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    chart: (
      <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    sales: (
      <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
  return icons[icon] || null
}

// 記事カードコンポーネント
function ArticleCard({ article }: { article: Article }) {
  const categoryColors: Record<string, string> = {
    'vibe-coding': '#6366F1',
    'build': '#06B6D4',
    'marketing': '#F97316',
    'sales': '#10B981',
  }
  const categoryLabels: Record<string, string> = {
    'vibe-coding': 'VC',
    'build': '実装',
    'marketing': 'マーケ',
    'sales': 'セールス',
  }

  return (
    <Link
      href={`/knowledge/${article.category}/${article.slug}`}
      className="flex-shrink-0 w-72 group"
    >
      <div className="h-full bg-white rounded-2xl border border-[#E5E5E5]/60 p-5 hover:shadow-lg hover:shadow-black/5 hover:border-[#E5E5E5] transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2 py-0.5 text-xs font-bold rounded-md text-white"
            style={{ backgroundColor: categoryColors[article.category] }}
          >
            {categoryLabels[article.category]}
          </span>
          {article.updatedAt && (
            <span className="text-xs text-[#94A3B8]">
              {new Date(article.updatedAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
        <h3 className="font-bold text-[#0A0A0A] mb-2 line-clamp-2 group-hover:text-[#6366F1] transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-[#525252] line-clamp-2">
          {article.description}
        </p>
      </div>
    </Link>
  )
}

// カテゴリカードコンポーネント
function CategoryCard({ category }: { category: CategoryStats }) {
  return (
    <Link
      href={`/knowledge/${category.category}`}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E5E5]/60 p-6 bg-white hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1">
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ backgroundColor: category.color }}
        />
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <CategoryIcon icon={category.icon} className="w-6 h-6" color={category.color} />
        </div>
        <h3 className="font-bold text-lg text-[#0A0A0A] mb-1 group-hover:text-[#6366F1] transition-colors">
          {category.label}
        </h3>
        <p className="text-sm text-[#525252] mb-3">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" style={{ color: category.color }}>
            {category.count}
          </span>
          <span className="text-xs text-[#94A3B8]">記事</span>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  const recentArticles = getRecentArticles(8)
  const categoryStats = getCategoryStats()
  const totalArticles = categoryStats.reduce((sum, cat) => sum + cat.count, 0)

  // ItemList Schema (JSON-LD) - 新着記事用
  const recentArticlesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}/#recent-articles`,
    name: '新着記事',
    description: 'AI駆動塾の最新記事一覧',
    numberOfItems: recentArticles.length,
    itemListElement: recentArticles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: article.title,
      url: `${baseUrl}/knowledge/${article.category}/${article.slug}`,
      description: article.description,
    })),
  }

  // WebPage Schema with aggregateRating風の情報
  const homePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/#homepage`,
    name: '非エンジニアでも「作れて・動いて・売れる」をAIで実現 | AI駆動塾',
    description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
    url: baseUrl,
    inLanguage: 'ja',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@type': 'Thing',
      name: 'AI駆動開発',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: '学習コンテンツ',
      numberOfItems: totalArticles,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.badge-glow'],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recentArticlesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
    <div>
      {/* Hero Section with Enhanced Background */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFA] via-[#F8F8FF] to-[#FAFAFA]" />

        {/* Texture Layer */}
        <div className="absolute inset-0 bg-dots opacity-50" />

        {/* Animated Glow Layers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary Glow - Purple */}
          <div
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-3xl animate-blob"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            }}
          />

          {/* Secondary Glow - Cyan */}
          <div
            className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-3xl animate-blob"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
              animationDelay: '2s',
            }}
          />

          {/* Tertiary Glow - Orange */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
              animation: 'blob-move 10s ease-in-out infinite',
              animationDelay: '4s',
            }}
          />
        </div>

        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 gradient-mesh opacity-60" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-12">
            {/* Enhanced Badge */}
            <div className="badge-glow mb-8 animate-slideInUp">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-sm text-[#525252] font-medium">非エンジニア向け AI開発プラットフォーム</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight animate-slideInUp" style={{ animationDelay: '100ms' }}>
              <span className="text-[#0A0A0A]">コードが書けなくても、</span>
              <br />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#06B6D4] to-[#6366F1] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                AIでアプリが作れる
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#525252] mb-10 max-w-2xl mx-auto leading-relaxed animate-slideInUp" style={{ animationDelay: '200ms' }}>
              バイブコーディング = AIに指示を出すだけの開発手法。
              <br className="hidden md:block" />
              作り方から売り方まで、すべて<span className="text-[#0A0A0A] font-semibold">無料</span>で学べます。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slideInUp" style={{ animationDelay: '300ms' }}>
              <Link
                href="/free/vibe-coding-book"
                className="btn-cta inline-flex items-center justify-center gap-2 group"
              >
                <span>5分で分かる：AIでアプリを作る方法</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Social Proof with Animation */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#525252] animate-slideInUp" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#E5E5E5]/50">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="font-medium">20+記事公開中</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#E5E5E5]/50">
                <svg className="w-5 h-5 text-[#6366F1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="font-medium">完全無料</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#E5E5E5]/50">
                <svg className="w-5 h-5 text-[#F97316]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="font-medium">初心者歓迎</span>
              </div>
            </div>
          </div>

          {/* Target Audience Card - Enhanced */}
          <div className="card max-w-lg mx-auto animate-slideInUp" style={{ animationDelay: '500ms' }}>
            <h3 className="font-bold text-[#0A0A0A] mb-4 flex items-center gap-3">
              <span className="icon-container w-10 h-10">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="text-lg">こんな人向け</span>
            </h3>
            <ul className="space-y-4 text-[#0A0A0A]">
              <li className="flex items-start gap-3 group">
                <span className="w-6 h-6 bg-gradient-to-br from-[#6366F1]/10 to-[#06B6D4]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>アプリを作りたいけど、コードは書けない</span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="w-6 h-6 bg-gradient-to-br from-[#6366F1]/10 to-[#06B6D4]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>作ったものを、どう売ればいいか分からない</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3つの学び - Asymmetric Layout */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#0A0A0A] text-white text-xs font-bold rounded-full mb-4">
              LEARNING PATH
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">学べること</h2>
            <p className="text-[#525252] text-lg">3つのステップで「作れて売れる」状態へ</p>
          </div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
            {/* 1. 作る - Large Card */}
            <Link href="/knowledge/vibe-coding" className="col-span-12 md:col-span-7 card group cursor-pointer p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="step-badge">STEP 1</div>
                  <div className="icon-container w-16 h-16 mt-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-3 text-[#0A0A0A] group-hover:text-[#6366F1] transition-colors">
                    バイブコーディング
                  </h3>
                  <p className="text-[#525252] mb-4 leading-relaxed">
                    AIに指示を出すだけでアプリが作れる開発手法。プログラミング知識ゼロでも、アイデアを形にできます。
                  </p>
                  <span className="text-[#6366F1] font-semibold inline-flex items-center gap-2">
                    詳しく見る
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* 2. 動かす - Medium Card */}
            <Link href="/knowledge/build" className="col-span-12 md:col-span-5 card group cursor-pointer p-6 md:mt-12">
              <div className="step-badge">STEP 2</div>
              <div className="icon-container w-14 h-14 mt-4 mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-[#0A0A0A] group-hover:text-[#06B6D4] transition-colors">
                実装パターン
              </h3>
              <p className="text-[#525252] text-sm mb-4">
                ログイン・決済など、よくある機能の作り方
              </p>
              <span className="text-[#06B6D4] text-sm font-semibold inline-flex items-center gap-1">
                詳しく見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* 3. 売る - Medium Card */}
            <Link href="/knowledge/marketing" className="col-span-12 md:col-span-5 md:col-start-2 card group cursor-pointer p-6">
              <div className="step-badge">STEP 3</div>
              <div className="icon-container w-14 h-14 mt-4 mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-[#0A0A0A] group-hover:text-[#F97316] transition-colors">
                0円マーケティング
              </h3>
              <p className="text-[#525252] text-sm mb-4">
                広告費ゼロで集客する方法
              </p>
              <span className="text-[#F97316] text-sm font-semibold inline-flex items-center gap-1">
                詳しく見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Decorative Element */}
            <div className="hidden md:block col-span-5 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-dashed border-[#E5E5E5] rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 border-2 border-dashed border-[#6366F1]/30 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#06B6D4] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新着記事セクション */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#06B6D4] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">新着記事</h2>
                <p className="text-sm text-[#525252]">最新のナレッジをチェック</p>
              </div>
            </div>
            <Link
              href="/knowledge"
              className="hidden sm:flex items-center gap-2 text-[#6366F1] font-semibold hover:gap-3 transition-all"
            >
              すべて見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* 横スクロールエリア */}
          <div className="relative -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {recentArticles.map((article) => (
                <div key={article.slug} className="snap-start">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
            {/* フェードエッジ */}
            <div className="absolute top-0 right-0 bottom-4 w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none" />
          </div>

          <Link
            href="/knowledge"
            className="sm:hidden flex items-center justify-center gap-2 mt-4 text-[#6366F1] font-semibold"
          >
            すべて見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* カテゴリから探す */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0A0A0A] text-white text-xs font-bold rounded-full mb-4">
              CATEGORIES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">カテゴリから探す</h2>
            <p className="text-[#525252] text-lg">
              全{categoryStats.reduce((sum, cat) => sum + cat.count, 0)}記事を4つのカテゴリで整理
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {categoryStats.map((category) => (
              <CategoryCard key={category.category} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA - Enhanced */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl max-w-4xl mx-auto">
            {/* Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" />

            {/* Animated Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#6366F1]/20 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#06B6D4]/15 to-[#F97316]/10 rounded-full blur-3xl" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid opacity-10" />

            <div className="relative z-10 p-10 md:p-16 text-center">
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 text-xs font-bold rounded-full mb-6 border border-white/10">
                GET STARTED
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">まずは無料で読む</h2>
              <p className="text-white/60 mb-10 max-w-md mx-auto text-lg">
                noteとXで、バイブコーディングの基礎から実践まで公開しています。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://note.com/l_mrk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-[#0A0A0A] font-semibold rounded-xl hover:bg-white/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/20 inline-flex items-center justify-center gap-3"
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
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
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
    </>
  )
}
