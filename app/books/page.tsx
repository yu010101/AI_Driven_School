import Link from 'next/link'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-driven-school.vercel.app'

export const metadata: Metadata = {
  title: '電子書籍',
  description: 'AI道場の電子書籍。バイブコーディング、個人開発、マーケティングを体系的に学べる電子書籍を販売しています。',
  openGraph: {
    type: 'website',
    title: '電子書籍',
    description: 'バイブコーディング、個人開発、マーケティングを体系的に学べる電子書籍',
    url: `${baseUrl}/books`,
  },
  alternates: {
    canonical: `${baseUrl}/books`,
  },
}

const featuredBook = {
  slug: 'vibe-coding',
  title: 'Vibe Coding入門',
  subtitle: 'AIと一緒にアプリを作る新時代の開発手法',
  description: '非エンジニアでもAIでアプリが作れる。51本の記事を1冊に凝縮した完全ガイド。',
  price: 1980,
  pages: 200,
  articles: 51,
  badge: '人気',
  features: ['12種のAIツール解説', '21種のチュートリアル', 'プロンプト50選'],
  color: '#0A0A0A',
}

export default function BooksPage() {

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-20">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm mb-6 animate-slideInUp"
            >
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-600">120+ articles compiled</span>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-4"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.04em' }}
            >
              Book<span className="text-indigo-600">shelf</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-md mx-auto">
              個人開発に必要な知識を、体系的にまとめた電子書籍シリーズ
            </p>
          </div>

          {/* Featured Book - Hero Card */}
          <div
            className="max-w-5xl mx-auto animate-slideInUp delay-200"
          >
            <div className="relative bg-white rounded-[32px] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
              {/* Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-500/30">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {featuredBook.badge}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Book Cover Side */}
                <div className="relative p-12 md:p-16 flex items-center justify-center bg-gray-50">
                  {/* Decorative circles */}
                  <div className="absolute top-8 right-8 w-32 h-32 border border-gray-200/50 rounded-full" />
                  <div className="absolute bottom-12 left-8 w-20 h-20 border border-indigo-200/50 rounded-full" />

                  {/* 3D Book */}
                  <div className="relative group" style={{ perspective: '1000px' }}>
                    <div
                      className="relative w-52 h-72 transition-transform duration-500 group-hover:rotate-y-6"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Book Shadow */}
                      <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gray-300/40 rounded-full" />

                      {/* Book Spine */}
                      <div
                        className="absolute left-0 top-0 w-4 h-full rounded-l-lg"
                        style={{ backgroundColor: featuredBook.color, transform: 'translateX(-2px) rotateY(-90deg)', transformOrigin: 'right' }}
                      />

                      {/* Book Cover */}
                      <div
                        className="relative w-full h-full rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 overflow-hidden"
                        style={{ backgroundColor: featuredBook.color }}
                      >
                        {/* Cover Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-6 left-6 w-24 h-24 border-2 border-white rounded-full" />
                          <div className="absolute bottom-10 right-4 w-36 h-36 border border-white/50 rounded-full" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/30 rounded-full" />
                        </div>

                        {/* Cover Content */}
                        <div className="relative z-10 text-white text-center">
                          <div className="text-[10px] font-medium tracking-[0.3em] opacity-70 mb-4">AI DOJO</div>
                          <div className="w-8 h-0.5 bg-white/30 mx-auto mb-4" />
                          <h3 className="text-xl font-bold leading-tight mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Vibe Coding
                          </h3>
                          <h3 className="text-xl font-bold leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            入門
                          </h3>
                          <div className="w-8 h-0.5 bg-white/30 mx-auto my-4" />
                          <p className="text-[10px] opacity-70 leading-relaxed">
                            AIと一緒にアプリを作る<br />新時代の開発手法
                          </p>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
                      {featuredBook.title}
                    </h2>
                    <p className="text-gray-500">{featuredBook.subtitle}</p>
                  </div>

                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {featuredBook.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-8 mb-8">
                    <div>
                      <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{featuredBook.articles}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Articles</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{featuredBook.pages}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Pages</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>12</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">AI Tools</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredBook.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        ¥{featuredBook.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 ml-1">税込</span>
                    </div>
                    <Link
                      href={`/books/${featuredBook.slug}`}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5"
                    >
                      詳細を見る
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 記事一覧への導線 */}
      <section className="relative py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            まずは無料で学ぶ
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            書籍の内容は記事でも公開中。まずは気になるトピックから読んでみてください。
          </p>
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-2xl hover:bg-gray-200 transition-all"
          >
            記事一覧を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  )
}
