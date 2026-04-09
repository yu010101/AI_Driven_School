import Link from 'next/link'
import type { Metadata } from 'next'
import { getRecentArticles, getCategoryStats } from '@/lib/mdx'
import { getCourses } from '@/lib/courses'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: 'AIで業務を自動化する実践スキルを身につける',
  description: 'コピペ1行から始める。Anthropic公式認定も取れる。議事録・メール・データ分析、実務で使えるAIスキルを無料で学べます。',
}

// EducationalOrganization Schema (JSON-LD) - ホームページ向け
const educationalOrgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${baseUrl}/#educational-organization`,
  name: 'AI道場',
  alternateName: 'AI道場',
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
          name: 'AI道場',
        },
        isAccessibleForFree: true,
      },
      {
        '@type': 'Course',
        name: '実装パターン',
        description: 'ログイン・決済など、よくある機能の作り方',
        provider: {
          '@type': 'Organization',
          name: 'AI道場',
        },
        isAccessibleForFree: true,
      },
      {
        '@type': 'Course',
        name: '0円マーケティング',
        description: '広告費ゼロで集客する方法',
        provider: {
          '@type': 'Organization',
          name: 'AI道場',
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
  name: 'AI道場',
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

const firstLessonMap: Record<string, string> = {
  "level0-setup": "01-install",
  "level1-tips10": "01-meeting-to-slack",
  "level2-automation": "01-meeting-pipeline",
  "level3-dx-design": "01-what-is-mcp",
  "level4-skills": "01-what-are-skills",
  "level5-openclaw": "01-overview",
  "level6-antigravity": "01-what-is-antigravity",
  "level7-exam": "01-claude101",
  "level8-essential": "01-hooks",
  "level9-enterprise": "01-github-actions",
}

export default function Home() {
  const recentArticles = getRecentArticles(8)
  const categoryStats = getCategoryStats()
  const totalArticles = categoryStats.reduce((sum, cat) => sum + cat.count, 0)
  const courses = getCourses()

  // ItemList Schema (JSON-LD) - 新着記事用
  const recentArticlesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}/#recent-articles`,
    name: '新着記事',
    description: 'AI道場の最新記事一覧',
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
    name: '非エンジニアでも「作れて・動いて・売れる」をAIで実現',
    description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
    url: baseUrl,
    inLanguage: 'ja',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@type': 'Thing',
      name: 'AI活用',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: '学習コンテンツ',
      numberOfItems: totalArticles,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1'],
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
      {/* Hero */}
      <section className="pt-12 pb-8 md:pt-28 md:pb-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-[#0A0A0A]">
            AIで業務を自動化する<br className="hidden md:block" />実践スキルを身につける
          </h1>
          <p className="text-lg text-[#525252] mb-4 max-w-xl mx-auto leading-relaxed">
            コピペ1行から始める。認定資格も取れる。
          </p>
          <p className="text-sm text-[#94A3B8] mb-8 md:mb-16">
            51レッスン / 100問クイズ / Anthropic公式認定対応
          </p>
        </div>
      </section>

      {/* 2つの入口 */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Link href="/dojo/level0-setup/01-install" className="block group">
              <div className="h-full rounded-2xl border border-[#E5E5E5] p-8 bg-white hover:border-[#0A0A0A] transition-colors">
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">実務ですぐ使う</h2>
                <p className="text-sm text-[#525252] leading-relaxed">
                  議事録・メール・データ分析の自動化。51レッスン。
                </p>
              </div>
            </Link>

            <Link href="/dojo/cert" className="block group">
              <div className="h-full rounded-2xl border border-[#E5E5E5] p-8 bg-white hover:border-[#0A0A0A] transition-colors">
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">資格を取る</h2>
                <p className="text-sm text-[#525252] leading-relaxed">
                  Anthropic公式認定の対策。100問+模擬試験。
                </p>
              </div>
            </Link>

          </div>

          <div className="text-center mt-16 pt-8 border-t border-[#E5E5E5]">
            <Link
              href="/enterprise"
              className="inline-block px-6 py-3 text-sm font-bold text-[#0A0A0A] rounded-xl border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
            >
              法人プラン
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
