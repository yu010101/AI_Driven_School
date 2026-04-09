import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllArticles, type Category } from '@/lib/mdx'
import type { Metadata } from 'next'

const categories: Category[] = ['vibe-coding', 'claude-code', 'build', 'marketing', 'sales']
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

const categoryData: Record<Category, { name: string; description: string; step: string; longDescription: string }> = {
  'vibe-coding': {
    name: 'バイブコーディング',
    description: 'AIに指示を出すだけでアプリが作れる開発手法',
    longDescription: 'バイブコーディングとは、AIに指示を出すだけでアプリが作れる開発手法です。コードが書けなくても、ChatGPTやCursorを使って本格的なアプリを作る方法を解説します。',
    step: '1. 作る',
  },
  'claude-code': {
    name: 'Claude Code完全攻略',
    description: 'Anthropic公式AIエディタを使いこなす',
    longDescription: 'Claude Code（クロードコード）は、Anthropicが提供する公式AIコーディングツール。日本語で最も詳しい実践ガイドとして、入門から応用まで徹底解説します。',
    step: 'SPECIAL',
  },
  'build': {
    name: '実装パターン',
    description: 'ログイン・決済など、よくある機能の作り方',
    longDescription: 'ログイン機能、決済機能、データベース連携など、アプリ開発でよく使う機能の実装パターンを解説。AIを使って効率的に実装する方法を紹介します。',
    step: '2. 動かす',
  },
  'marketing': {
    name: '0円マーケティング',
    description: '広告費ゼロで集客する方法',
    longDescription: '作ったアプリを広告費ゼロで集客する方法を解説。X（Twitter）、note、SEOを活用した0円マーケティングの実践ノウハウを公開します。',
    step: '3. 集める',
  },
  'sales': {
    name: '営業・収益化',
    description: '売上を立てて継続的に稼ぐ方法',
    longDescription: '個人開発でも売上を立てる営業・収益化のノウハウ。価格設定、セールスファネル、顧客対応、継続課金など、稼ぎ続けるための実践テクニックを解説します。',
    step: '4. 売る',
  },
}

export async function generateStaticParams() {
  return categories.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const category = params.category as Category
  if (!categories.includes(category)) {
    return { title: 'Not Found' }
  }
  const data = categoryData[category]
  const categoryUrl = `${baseUrl}/knowledge/${category}`

  return {
    title: data.name,
    description: data.longDescription,
    openGraph: {
      type: 'website',
      title: `${data.name}`,
      description: data.longDescription,
      url: categoryUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name}`,
      description: data.longDescription,
    },
    alternates: {
      canonical: categoryUrl,
    },
  }
}

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = params.category as Category

  if (!categories.includes(category)) {
    notFound()
  }

  const articles = getAllArticles(category)
  const { name, description, step, longDescription } = categoryData[category]
  const categoryUrl = `${baseUrl}/knowledge/${category}`

  // OG画像URL
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(name)}&category=${category}`

  // CollectionPage Schema (JSON-LD) - 強化版
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${categoryUrl}#webpage`,
    name: name,
    description: longDescription,
    url: categoryUrl,
    inLanguage: 'ja',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'AI道場',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: name,
      description: description,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: ogImageUrl,
      width: 1200,
      height: 630,
    },
    dateModified: articles[0]?.updatedAt || articles[0]?.createdAt || new Date().toISOString(),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title,
        url: `${baseUrl}/knowledge/${category}/${article.slug}`,
        description: article.description || article.excerpt,
        image: `${baseUrl}/api/og?title=${encodeURIComponent(article.title)}&category=${category}`,
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
        name: '記事一覧',
        item: `${baseUrl}/knowledge`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: name,
        item: categoryUrl,
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
        <div className="step-badge mb-4">{step}</div>
        <h1 className="page-title">{name}</h1>
        <p className="text-lg text-foreground/60">{description}</p>
      </div>

      {articles.length === 0 ? (
        <div className="card p-12 text-center max-w-md mx-auto">
          <p className="text-foreground/60">まだ記事がありません</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/knowledge/${category}/${article.slug}`}
              className="card p-6 group cursor-pointer"
            >
              <h2 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors text-foreground">
                {article.title}
              </h2>
              <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                {article.description || article.excerpt}
              </p>
              <span className="text-primary text-sm font-medium">→ 読む</span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-14 text-center">
        <Link href="/knowledge" className="btn-secondary inline-block">
          ← 記事一覧に戻る
        </Link>
      </div>
    </div>
    </>
  )
}
