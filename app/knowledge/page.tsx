import Link from 'next/link'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: '記事一覧',
  description: 'バイブコーディング、実装パターン、0円マーケティングの記事一覧。非エンジニアでもAIでアプリを作れるようになる実践的なノウハウを公開中。',
  openGraph: {
    type: 'website',
    title: '記事一覧',
    description: 'バイブコーディング、実装パターン、0円マーケティングの記事一覧',
    url: `${baseUrl}/knowledge`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '記事一覧',
    description: 'バイブコーディング、実装パターン、0円マーケティングの記事一覧',
  },
  alternates: {
    canonical: `${baseUrl}/knowledge`,
  },
}

// CollectionPage Schema (JSON-LD) - 強化版
const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${baseUrl}/knowledge#webpage`,
  name: '記事一覧',
  description: 'バイブコーディング、実装パターン、0円マーケティングの記事一覧。非エンジニアでもAIでアプリを作れるようになる実践的なノウハウを公開中。',
  url: `${baseUrl}/knowledge`,
  inLanguage: 'ja',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'AI道場',
    url: baseUrl,
  },
  about: {
    '@type': 'Thing',
    name: 'AI活用',
    description: '非エンジニアでもAIでアプリを作れるようになる実践的なノウハウ',
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'AI道場 学習カテゴリ',
    description: '非エンジニアでもAIでアプリを作り、売るための3つのステップ',
    numberOfItems: 4,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'バイブコーディング',
        description: 'AIに指示を出すだけでアプリが作れる開発手法',
        url: `${baseUrl}/knowledge/vibe-coding`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '実装パターン',
        description: 'ログイン・決済など、よくある機能の作り方',
        url: `${baseUrl}/knowledge/build`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: '0円マーケティング',
        description: '広告費ゼロで集客する方法',
        url: `${baseUrl}/knowledge/marketing`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: '営業・収益化',
        description: '売上を立てて継続的に稼ぐ方法',
        url: `${baseUrl}/knowledge/sales`,
      },
    ],
  },
}

// Breadcrumb Schema (JSON-LD)
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '記事一覧',
      item: `${baseUrl}/knowledge`,
    },
  ],
}

export default function Knowledge() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="page-title">記事一覧</h1>
        <p className="text-lg text-foreground/60">カテゴリを選んでください</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {/* バイブコーディング */}
        <Link href="/knowledge/vibe-coding" className="card p-6 group cursor-pointer">
          <div className="step-badge">STEP 1</div>
          <h2 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
            バイブコーディング
          </h2>
          <p className="text-foreground/60 text-sm mb-4">
            AIに指示を出すだけでアプリが作れる開発手法
          </p>
          <span className="text-primary text-sm font-medium">→ 記事を見る</span>
        </Link>

        {/* 実装 */}
        <Link href="/knowledge/build" className="card p-6 group cursor-pointer">
          <div className="step-badge">STEP 2</div>
          <h2 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
            実装パターン
          </h2>
          <p className="text-foreground/60 text-sm mb-4">
            ログイン・決済など、よくある機能の作り方
          </p>
          <span className="text-primary text-sm font-medium">→ 記事を見る</span>
        </Link>

        {/* マーケティング */}
        <Link href="/knowledge/marketing" className="card p-6 group cursor-pointer">
          <div className="step-badge">STEP 3</div>
          <h2 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
            0円マーケティング
          </h2>
          <p className="text-foreground/60 text-sm mb-4">
            広告費ゼロで集客する方法
          </p>
          <span className="text-primary text-sm font-medium">→ 記事を見る</span>
        </Link>

        {/* 営業・収益化 */}
        <Link href="/knowledge/sales" className="card p-6 group cursor-pointer">
          <div className="step-badge">STEP 4</div>
          <h2 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
            営業・収益化
          </h2>
          <p className="text-foreground/60 text-sm mb-4">
            売上を立てて継続的に稼ぐ方法
          </p>
          <span className="text-primary text-sm font-medium">→ 記事を見る</span>
        </Link>
      </div>
    </div>
    </>
  )
}
