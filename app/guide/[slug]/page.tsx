import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { guides } from '@/content/guides'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = guides[params.slug]
  if (!guide) return {}

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${baseUrl}/guide/${params.slug}`,
      type: 'article',
      images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent(guide.title)}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    alternates: {
      canonical: `${baseUrl}/guide/${params.slug}`,
    },
  }
}

export default function GuidePage({ params }: Props) {
  const guide = guides[params.slug]
  if (!guide) notFound()

  // JSON-LD: Article + HowTo + FAQ
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: {
      '@type': 'Organization',
      name: 'AI道場',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI道場',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/icon-512.png` },
    },
    datePublished: guide.createdAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: `${baseUrl}/guide/${params.slug}`,
    image: `${baseUrl}/api/og?title=${encodeURIComponent(guide.title)}`,
  }

  const howToSchema = guide.steps ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    step: guide.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  } : null

  const faqSchema = guide.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="パンくずリスト">
            <ol className="flex items-center gap-2 text-[#64748B]">
              <li><Link href="/" className="hover:text-[#0A0A0A]">ホーム</Link></li>
              <li>/</li>
              <li><Link href="/guide" className="hover:text-[#0A0A0A]">完全ガイド</Link></li>
              <li>/</li>
              <li className="text-[#0A0A0A] font-medium">{guide.shortTitle || guide.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {guide.badges?.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs font-bold rounded-full bg-[#0A0A0A] text-white"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {guide.title}
            </h1>
            <p className="text-lg md:text-xl text-[#525252] leading-relaxed">
              {guide.description}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-[#64748B]">
              <span>更新: {guide.updatedAt}</span>
              <span>読了: 約{guide.readTime}分</span>
            </div>
          </header>

          {/* Table of Contents */}
          {guide.toc && guide.toc.length > 0 && (
            <nav className="mb-12 p-6 bg-[#F5F5F5] rounded-2xl">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                目次
              </h2>
              <ol className="space-y-2">
                {guide.toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-[#525252] hover:text-[#0A0A0A] transition-colors flex items-center gap-2"
                    >
                      <span className="w-6 h-6 bg-[#0A0A0A] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Content */}
          <div className="prose max-w-none">
            {guide.content}
          </div>

          {/* FAQ Section */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-[#E5E5E5]">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-[#0A0A0A] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                よくある質問
              </h2>
              <div className="space-y-4">
                {guide.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group card p-0 overflow-hidden"
                  >
                    <summary className="p-5 cursor-pointer font-semibold flex items-center justify-between hover:bg-[#F5F5F5] transition-colors">
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-[#0A0A0A] font-bold text-sm group-open:bg-[#0A0A0A] group-open:text-white transition-colors">
                          Q
                        </span>
                        {faq.question}
                      </span>
                      <svg className="w-5 h-5 text-[#64748B] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 pt-2 text-[#525252] border-t border-[#E5E5E5]">
                      <div className="flex gap-3">
                        <span className="w-8 h-8 bg-[#0A0A0A]/10 rounded-lg flex items-center justify-center text-[#0A0A0A] font-bold text-sm flex-shrink-0">
                          A
                        </span>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Articles */}
          {guide.relatedArticles && guide.relatedArticles.length > 0 && (
            <section className="mt-16 pt-12 border-t border-[#E5E5E5]">
              <h2 className="text-2xl font-bold mb-8">関連記事</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {guide.relatedArticles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="card group p-5 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-[#F5F5F5] rounded-xl flex items-center justify-center group-hover:bg-[#0A0A0A] transition-colors">
                      <svg className="w-6 h-6 text-[#64748B] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-[#0A0A0A] transition-colors">{article.title}</h3>
                      <p className="text-sm text-[#64748B]">{article.description}</p>
                    </div>
                    <svg className="w-5 h-5 text-[#64748B] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 書籍CTA */}
          <section className="mt-16 p-8 bg-[#0A0A0A] rounded-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Book mockup */}
              <div className="flex-shrink-0">
                <div className="w-28 h-36 bg-[#0A0A0A] rounded-lg shadow-xl flex items-center justify-center">
                  <div className="text-center text-white p-2">
                    <div className="text-[8px] font-bold mb-1 opacity-80">AI道場</div>
                    <div className="text-sm font-bold leading-tight">Vibe Coding<br/>入門</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-white mb-2">体系的に学ぶなら書籍版</h2>
                <p className="text-white/60 text-sm mb-4">
                  51本の記事を1冊に凝縮。順番に読むだけで効率的に学べる構成になっています。
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/books/vibe-coding"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] font-semibold rounded-xl hover:bg-white/90 transition-colors"
                  >
                    書籍を見る（¥1,980）
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="/knowledge"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    個別記事を読む →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
