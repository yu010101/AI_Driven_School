import Link from 'next/link'
import { getAllArticles } from '@/lib/mdx'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: 'タグ一覧',
  description: 'AI駆動塾の記事をタグから探す。バイブコーディング、AI開発、0円マーケティングなどのタグから興味のある記事を見つけられます。',
  openGraph: {
    type: 'website',
    title: 'タグ一覧 | AI駆動塾',
    description: 'AI駆動塾の記事をタグから探す',
    url: `${baseUrl}/tags`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'タグ一覧 | AI駆動塾',
    description: 'AI駆動塾の記事をタグから探す',
  },
  alternates: {
    canonical: `${baseUrl}/tags`,
  },
}

export default function TagsPage() {
  const articles = getAllArticles()

  // タグとその記事数を集計
  const tagCounts: Record<string, number> = {}
  articles.forEach((article) => {
    article.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  // 記事数でソート
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  // CollectionPage Schema (JSON-LD)
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}/tags#webpage`,
    name: 'タグ一覧',
    description: 'AI駆動塾の記事をタグから探す',
    url: `${baseUrl}/tags`,
    inLanguage: 'ja',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'AI Driven School',
      url: baseUrl,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sortedTags.length,
      itemListElement: sortedTags.slice(0, 20).map(([tag, count], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tag,
        url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
        description: `${tag}に関する記事: ${count}件`,
      })),
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
        name: 'タグ一覧',
        item: `${baseUrl}/tags`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h1 className="page-title">タグ一覧</h1>
          <p className="text-lg text-foreground/60">興味のあるタグから記事を探す</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-black hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <span className="text-gray-900">#{tag}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link href="/knowledge" className="btn-secondary inline-block">
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    </>
  )
}
