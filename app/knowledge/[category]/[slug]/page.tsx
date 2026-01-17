import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticle, getAllArticles, type Category } from '@/lib/mdx'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'
import { ShareButtons } from '@/components/ShareButtons'
import { ReadingProgress } from '@/components/ReadingProgress'

const categories: Category[] = ['vibe-coding', 'build', 'marketing', 'sales']
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

const categoryNames: Record<Category, string> = {
  'vibe-coding': 'バイブコーディング',
  'build': '実装パターン',
  'marketing': '0円マーケティング',
  'sales': '営業・収益化',
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

// 目次を抽出する関数
interface TOCItem {
  id: string
  text: string
  level: number
}

function extractTOC(content: string): TOCItem[] {
  const toc: TOCItem[] = []
  const headingPattern = /^(#{2,3})\s+(.+)$/gm
  let match

  while ((match = headingPattern.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      .replace(/\s+/g, '-')
    toc.push({ id, text, level })
  }

  return toc
}

// HowToステップを抽出する関数
interface HowToStep {
  name: string
  text: string
  position: number
}

function extractHowToSteps(content: string): HowToStep[] {
  const steps: HowToStep[] = []

  // パターン1: ### STEP 1: または ### ステップ1: 形式
  const stepPattern = /###\s*(?:STEP|ステップ)\s*(\d+)[：:.]?\s*(.+?)[\n\r]+([^#]+?)(?=###|##|$)/gi
  let match

  while ((match = stepPattern.exec(content)) !== null) {
    const position = parseInt(match[1])
    const name = match[2].trim()
    let text = match[3].trim().split(/\n\n/)[0].trim()
    text = text.replace(/^\*\*[^*]+\*\*\s*/, '').trim()
    if (name && text) {
      steps.push({ name, text, position })
    }
  }

  // パターン2: 1. 2. 3. のリスト形式（最低3つ以上）
  if (steps.length === 0) {
    const listPattern = /^(\d+)[.．]\s*\*?\*?(.+?)\*?\*?\s*$/gm
    const matches: Array<{ num: number; text: string }> = []

    while ((match = listPattern.exec(content)) !== null) {
      matches.push({ num: parseInt(match[1]), text: match[2].trim() })
    }

    // 連番になっているものをステップとして抽出
    if (matches.length >= 3) {
      matches.slice(0, 10).forEach((m, i) => {
        steps.push({ name: m.text, text: m.text, position: i + 1 })
      })
    }
  }

  return steps.sort((a, b) => a.position - b.position).slice(0, 10)
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

  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(article.title)}&category=${category}`

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
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
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
    category === 'marketing' || category === 'sales'
      ? '/free/zero-marketing-book'
      : '/free/vibe-coding-book'
  const ctaText =
    category === 'marketing' || category === 'sales'
      ? '0円マーケティングの教科書を読む'
      : 'バイブコーディングの教科書を読む'

  // 同カテゴリ内の記事を3本取得
  const sameCategoryArticles = getAllArticles(category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  // 他カテゴリからおすすめ記事を取得（内部リンク強化）
  const otherCategories = categories.filter((c) => c !== category)
  const crossCategoryArticles = otherCategories.flatMap((c) =>
    getAllArticles(c).slice(0, 1).map((a) => ({ ...a, category: c }))
  )

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(article.content)
  let contentHtml = processedContent.toString()

  // 見出しにIDを追加（目次リンク用）
  contentHtml = contentHtml.replace(/<h([23])>(.+?)<\/h\1>/g, (match, level, text) => {
    const id = text
      .replace(/<[^>]+>/g, '') // HTMLタグを除去
      .toLowerCase()
      .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      .replace(/\s+/g, '-')
    return `<h${level} id="${id}">${text}</h${level}>`
  })

  // OG画像URL
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(article.title)}&category=${category}`

  // Article Schema (JSON-LD) - 強化版
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: article.title,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: ogImageUrl,
      width: 1200,
      height: 630,
    },
    thumbnailUrl: ogImageUrl,
    author: {
      '@type': 'Person',
      '@id': `${baseUrl}/#author`,
      name: 'AI駆動塾',
      url: 'https://x.com/L_go_mrk',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'AI駆動塾',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: article.createdAt || new Date().toISOString(),
    dateModified: article.updatedAt || article.createdAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'AI Driven School',
      url: baseUrl,
    },
    keywords: article.tags?.join(', '),
    articleSection: categoryNames[category],
    inLanguage: 'ja',
    wordCount: article.content.length,
    timeRequired: `PT${readingTime}M`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article .prose'],
    },
    isAccessibleForFree: true,
    copyrightHolder: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
    },
    copyrightYear: new Date(article.createdAt || new Date()).getFullYear(),
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

  // HowTo Schema (JSON-LD) - チュートリアル記事向け
  const howToSteps = extractHowToSteps(article.content)
  const howToJsonLd = howToSteps.length >= 3 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: article.title,
    description: article.description,
    totalTime: `PT${readingTime}M`,
    step: howToSteps.map((step) => ({
      '@type': 'HowToStep',
      position: step.position,
      name: step.name,
      text: step.text,
    })),
  } : null

  // 目次を抽出
  const toc = extractTOC(article.content)

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
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      <ReadingProgress />

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

            {/* 目次 */}
            {toc.length >= 3 && (
              <nav className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-8" aria-label="目次">
                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  目次
                </h2>
                <ol className="space-y-2 text-sm">
                  {toc.map((item, index) => (
                    <li
                      key={index}
                      className={item.level === 3 ? 'ml-4' : ''}
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-gray-600 hover:text-black transition-colors hover:underline"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* 本文 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-10 shadow-sm">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* シェアボタン */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <ShareButtons url={articleUrl} title={article.title} />
              </div>
            </div>

            {/* 関連記事（同カテゴリ） */}
            {sameCategoryArticles.length > 0 && (
              <section className="mt-10">
                <h2 className="font-bold text-lg text-gray-900 mb-4">
                  {categoryNames[category]}の他の記事
                </h2>
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

            {/* 他カテゴリのおすすめ記事 */}
            {crossCategoryArticles.length > 0 && (
              <section className="mt-8">
                <h2 className="font-bold text-lg text-gray-900 mb-4">他のカテゴリも見る</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {crossCategoryArticles.map((art) => (
                    <Link
                      key={`${art.category}-${art.slug}`}
                      href={`/knowledge/${art.category}/${art.slug}`}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
                    >
                      <span className="text-xs text-gray-500 block mb-1">
                        {categoryNames[art.category as Category]}
                      </span>
                      <span className="text-gray-900 font-medium">{art.title}</span>
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
