import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticle, getAllArticles, type Category } from '@/lib/mdx'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'

const categories: Category[] = ['vibe-coding', 'build', 'marketing']
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

const categoryNames: Record<Category, string> = {
  'vibe-coding': 'バイブコーディング',
  'build': '実装パターン',
  'marketing': '0円マーケティング',
}

// 読了時間を計算（日本語は400文字/分として計算）
function calculateReadingTime(content: string): number {
  const charCount = content.length
  const minutes = Math.ceil(charCount / 400)
  return Math.max(1, minutes)
}

// 日付をフォーマット
function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// FAQを抽出する関数
interface FAQItem {
  question: string
  answer: string
}

function extractFAQs(content: string): FAQItem[] {
  const faqs: FAQItem[] = []

  // パターン1: ### Q. で始まる質問
  const qPattern = /###\s*Q[.．]?\s*(.+?)[\n\r]+([^#]+?)(?=###|##|$)/g
  let match

  while ((match = qPattern.exec(content)) !== null) {
    const question = match[1].trim()
    let answer = match[2].trim()
    // **A:** や A: で始まる場合は除去
    answer = answer.replace(/^\*?\*?A[.．:：]?\*?\*?\s*/i, '').trim()
    // 最初の段落だけを取得
    answer = answer.split(/\n\n/)[0].trim()
    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  // パターン2: ## よくある質問 セクション内のQ&A
  const faqSectionMatch = content.match(/##\s*よくある質問[\s\S]*?(?=\n##\s|$)/i)
  if (faqSectionMatch && faqs.length === 0) {
    const faqSection = faqSectionMatch[0]
    const qaPattern = /###\s*(.+?)\n+([^#]+?)(?=###|$)/g
    while ((match = qaPattern.exec(faqSection)) !== null) {
      const question = match[1].trim().replace(/^Q[.．:：]?\s*/i, '')
      const answer = match[2].trim().split(/\n\n/)[0].trim()
      if (question && answer && !question.startsWith('#')) {
        faqs.push({ question, answer })
      }
    }
  }

  return faqs.slice(0, 10) // 最大10個
}

export async function generateStaticParams() {
  const params: Array<{ category: string; slug: string }> = []

  for (const category of categories) {
    const articles = getAllArticles(category)
    for (const article of articles) {
      params.push({
        category,
        slug: article.slug,
      })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  const category = params.category as Category
  if (!categories.includes(category)) {
    return { title: 'Not Found' }
  }

  const article = getArticle(category, params.slug)
  if (!article) {
    return { title: 'Not Found' }
  }

  const articleUrl = `${baseUrl}/knowledge/${category}/${params.slug}`

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: articleUrl,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt || article.createdAt,
      authors: ['AI駆動塾'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: articleUrl,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const category = params.category as Category

  if (!categories.includes(category)) {
    notFound()
  }

  const article = getArticle(category, params.slug)
  if (!article) {
    notFound()
  }

  const articleUrl = `${baseUrl}/knowledge/${category}/${params.slug}`
  const readingTime = calculateReadingTime(article.content)

  // CTAの決定
  const ctaHref =
    category === 'marketing'
      ? '/free/zero-marketing-book'
      : '/free/vibe-coding-book'
  const ctaText =
    category === 'marketing'
      ? '0円マーケティングの教科書を読む'
      : 'バイブコーディングの教科書を読む'

  // 同カテゴリ内の記事を3本取得
  const sameCategoryArticles = getAllArticles(category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(article.content)
  const contentHtml = processedContent.toString()

  // Article Schema (JSON-LD)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'AI駆動塾',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI駆動塾',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon-512.png`,
      },
    },
    datePublished: article.createdAt || new Date().toISOString(),
    dateModified: article.updatedAt || article.createdAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: article.tags?.join(', '),
    articleSection: categoryNames[category],
    inLanguage: 'ja',
    wordCount: article.content.length,
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
        name: categoryNames[category],
        item: `${baseUrl}/knowledge/${category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: articleUrl,
      },
    ],
  }

  // FAQ Schema (JSON-LD)
  const faqs = extractFAQs(article.content)
  const faqJsonLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-3xl mx-auto">
            {/* パンくずナビ */}
            <nav className="text-sm text-gray-500 mb-6" aria-label="パンくずリスト">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-black transition-colors">
                    ホーム
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link href="/knowledge" className="hover:text-black transition-colors">
                    記事一覧
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link
                    href={`/knowledge/${category}`}
                    className="hover:text-black transition-colors"
                  >
                    {categoryNames[category]}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium truncate max-w-[200px]">
                  {article.title}
                </li>
              </ol>
            </nav>

            {/* ヘッダー */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 text-xs font-bold bg-gray-100 text-gray-700 rounded-full">
                  {categoryNames[category]}
                </span>
                {article.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>

              {article.description && (
                <p className="text-gray-600 text-lg mb-4">{article.description}</p>
              )}

              {/* 著者・日付・読了時間 */}
              <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-b border-gray-200 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div>
                    <a
                      href="https://x.com/L_go_mrk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      AI駆動塾
                    </a>
                  </div>
                </div>
                <span className="text-gray-300">|</span>
                {article.createdAt && (
                  <time dateTime={article.createdAt}>
                    {formatDate(article.createdAt)}
                  </time>
                )}
                {article.updatedAt && article.updatedAt !== article.createdAt && (
                  <span className="text-gray-400">
                    （更新: {formatDate(article.updatedAt)}）
                  </span>
                )}
                <span className="text-gray-300">|</span>
                <span>{readingTime}分で読める</span>
              </div>
            </header>

            {/* 本文 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-10 shadow-sm">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>

            {/* 関連記事 */}
            {sameCategoryArticles.length > 0 && (
              <section className="mt-10">
                <h2 className="font-bold text-lg text-gray-900 mb-4">次に読む</h2>
                <div className="grid gap-3">
                  {sameCategoryArticles.map((art) => (
                    <Link
                      key={art.slug}
                      href={`/knowledge/${art.category}/${art.slug}`}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black transition-colors flex items-center gap-3"
                    >
                      <span className="text-black">→</span>
                      <span className="text-gray-900">{art.title}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <div className="mt-10 text-center">
              <Link
                href={ctaHref}
                className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                {ctaText}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
