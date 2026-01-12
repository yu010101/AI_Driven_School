import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllArticles, type Category } from '@/lib/mdx'
import type { Metadata } from 'next'

const categories: Category[] = ['vibe-coding', 'build', 'marketing']
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

const categoryData: Record<Category, { name: string; description: string; step: string; longDescription: string }> = {
  'vibe-coding': {
    name: 'バイブコーディング',
    description: 'AIに指示を出すだけでアプリが作れる開発手法',
    longDescription: 'バイブコーディングとは、AIに指示を出すだけでアプリが作れる開発手法です。コードが書けなくても、ChatGPTやCursorを使って本格的なアプリを作る方法を解説します。',
    step: '1. 作る',
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
    step: '3. 売る',
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
      title: `${data.name} | AI駆動塾`,
      description: data.longDescription,
      url: categoryUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} | AI駆動塾`,
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
  const { name, description, step } = categoryData[category]

  return (
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
  )
}
