import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllArticles, type Category } from '@/lib/mdx'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

const categoryNames: Record<Category, string> = {
  'vibe-coding': 'バイブコーディング',
  'build': '実装パターン',
  'marketing': '0円マーケティング',
  'sales': '営業・収益化',
}

// 全タグを取得してstaticParamsを生成
export async function generateStaticParams() {
  const articles = getAllArticles()
  const allTags = new Set<string>()

  articles.forEach((article) => {
    article.tags?.forEach((tag) => allTags.add(tag))
  })

  return Array.from(allTags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string }
}): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  const articles = getAllArticles()
  const taggedArticles = articles.filter((article) =>
    article.tags?.includes(tag)
  )

  if (taggedArticles.length === 0) {
    return { title: 'Not Found' }
  }

  const tagUrl = `${baseUrl}/tags/${encodeURIComponent(tag)}`
  const description = `「${tag}」タグが付いた記事一覧（${taggedArticles.length}件）。AI駆動塾でバイブコーディング、個人開発、0円マーケティングを学ぶ。`

  return {
    title: `#${tag}`,
    description,
    openGraph: {
      type: 'website',
      title: `#${tag} | AI駆動塾`,
      description,
      url: tagUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `#${tag} | AI駆動塾`,
      description,
    },
    alternates: {
      canonical: tagUrl,
    },
  }
}

export default function TagPage({
  params,
}: {
  params: { tag: string }
}) {
  const tag = decodeURIComponent(params.tag)
  const articles = getAllArticles()
  const taggedArticles = articles.filter((article) =>
    article.tags?.includes(tag)
  )

  if (taggedArticles.length === 0) {
    notFound()
  }

  const tagUrl = `${baseUrl}/tags/${encodeURIComponent(tag)}`

  // CollectionPage Schema (JSON-LD)
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${tagUrl}#webpage`,
    name: `#${tag}`,
    description: `「${tag}」タグが付いた記事一覧`,
    url: tagUrl,
    inLanguage: 'ja',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'AI Driven School',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: tag,
    },
    numberOfItems: taggedArticles.length,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: taggedArticles.length,
      itemListElement: taggedArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title,
        url: `${baseUrl}/knowledge/${article.category}/${article.slug}`,
        description: article.description || article.excerpt,
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
      {
        '@type': 'ListItem',
        position: 3,
        name: `#${tag}`,
        item: tagUrl,
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
          <h1 className="page-title">#{tag}</h1>
          <p className="text-lg text-foreground/60">
            {taggedArticles.length}件の記事
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {taggedArticles.map((article) => (
            <Link
              key={`${article.category}-${article.slug}`}
              href={`/knowledge/${article.category}/${article.slug}`}
              className="card p-6 group cursor-pointer"
            >
              <div className="text-xs text-primary font-medium mb-2">
                {categoryNames[article.category as Category]}
              </div>
              <h2 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors text-foreground">
                {article.title}
              </h2>
              <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                {article.description || article.excerpt}
              </p>
              <div className="flex flex-wrap gap-1">
                {article.tags?.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className={`text-xs px-2 py-0.5 rounded ${
                      t === tag
                        ? 'bg-primary/10 text-primary'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center flex justify-center gap-4">
          <Link href="/tags" className="btn-secondary inline-block">
            ← タグ一覧
          </Link>
          <Link href="/knowledge" className="btn-secondary inline-block">
            記事一覧
          </Link>
        </div>
      </div>
    </>
  )
}
