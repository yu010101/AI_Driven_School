import Link from 'next/link'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-driven-school.vercel.app'

export const metadata: Metadata = {
  title: '電子書籍 | AI駆動塾',
  description: 'AI駆動塾の電子書籍。バイブコーディング、個人開発、マーケティングを体系的に学べる電子書籍を販売しています。',
  openGraph: {
    type: 'website',
    title: '電子書籍 | AI駆動塾',
    description: 'バイブコーディング、個人開発、マーケティングを体系的に学べる電子書籍',
    url: `${baseUrl}/books`,
  },
  alternates: {
    canonical: `${baseUrl}/books`,
  },
}

const books = [
  {
    slug: 'vibe-coding',
    title: 'Vibe Coding入門',
    subtitle: 'AIと一緒にアプリを作る新時代の開発手法',
    description: '非エンジニアでもAIでアプリが作れる。51本の記事を1冊に凝縮した完全ガイド。',
    price: 1980,
    pages: 200,
    articles: 51,
    badge: 'BEST SELLER',
    features: ['12種のAIツール解説', '21種のチュートリアル', 'プロンプト50選'],
    color: 'from-indigo-600 via-violet-600 to-purple-700',
    accentColor: '#6366F1',
  },
  {
    slug: 'build-deploy',
    title: 'ビルド&デプロイ大全',
    subtitle: '作ったアプリを世界に公開する方法',
    description: 'Vercel、Supabase、Stripeを使った本格的なアプリ構築・公開の方法。',
    price: 1480,
    pages: 120,
    articles: 29,
    badge: null,
    features: ['デプロイ完全ガイド', 'DB・認証・決済', 'CI/CD構築'],
    comingSoon: true,
    color: 'from-cyan-500 via-teal-500 to-emerald-600',
    accentColor: '#06B6D4',
  },
  {
    slug: 'zero-marketing',
    title: '0円マーケティング',
    subtitle: '広告費ゼロで集客する方法',
    description: 'SEO、SNS、コンテンツマーケティングで費用をかけずにユーザーを獲得。',
    price: 1480,
    pages: 100,
    articles: 20,
    badge: null,
    features: ['SEO完全攻略', 'X/note運用術', 'バズる法則'],
    comingSoon: true,
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    accentColor: '#F97316',
  },
]

export default function BooksPage() {
  const featuredBook = books[0]
  const otherBooks = books.slice(1)

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-100/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-100/30 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

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
                <div className="relative p-12 md:p-16 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50">
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
                      <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-t from-gray-300/40 to-transparent blur-xl rounded-full" />

                      {/* Book Spine */}
                      <div
                        className={`absolute left-0 top-0 w-4 h-full bg-gradient-to-r ${featuredBook.color} rounded-l-lg`}
                        style={{ transform: 'translateX(-2px) rotateY(-90deg)', transformOrigin: 'right' }}
                      />

                      {/* Book Cover */}
                      <div
                        className={`relative w-full h-full bg-gradient-to-br ${featuredBook.color} rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 overflow-hidden`}
                      >
                        {/* Cover Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-6 left-6 w-24 h-24 border-2 border-white rounded-full" />
                          <div className="absolute bottom-10 right-4 w-36 h-36 border border-white/50 rounded-full" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/30 rounded-full" />
                        </div>

                        {/* Cover Content */}
                        <div className="relative z-10 text-white text-center">
                          <div className="text-[10px] font-medium tracking-[0.3em] opacity-70 mb-4">AI DRIVEN SCHOOL</div>
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
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

      {/* Other Books Section */}
      <section className="relative py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Coming Soon
              </h2>
              <p className="text-gray-500 text-sm mt-1">準備中の書籍</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <span className="w-8 h-px bg-gray-200" />
              <span>2 books</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {otherBooks.map((book, index) => (
              <div
                key={book.slug}
                className={`group relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg animate-slideInUp ${index === 0 ? 'delay-300' : 'delay-400'}`}
              >
                {/* Coming Soon Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 bg-gray-200 text-gray-500 text-xs font-medium rounded-full">
                    準備中
                  </span>
                </div>

                <div className="flex gap-6">
                  {/* Mini Book Cover */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-24 h-32 bg-gradient-to-br ${book.color} rounded-lg shadow-lg flex items-center justify-center p-3 opacity-75`}
                    >
                      <div className="text-white text-center">
                        <div className="text-[8px] tracking-wider opacity-70 mb-1">AI駆動塾</div>
                        <div className="text-xs font-bold leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {book.title.split('&')[0]}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{book.subtitle}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <span>{book.articles}記事</span>
                      <span>{book.pages}ページ</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-400" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        ¥{book.price.toLocaleString()}
                      </span>
                      <button
                        disabled
                        className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 rounded-xl cursor-not-allowed"
                      >
                        近日公開
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div
            className="max-w-3xl mx-auto relative animate-slideInUp delay-500"
          >
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-[40px] blur-3xl" />

            <div className="relative bg-gray-900 rounded-[32px] p-10 md:p-14 text-center overflow-hidden">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                  <span className="text-amber-400 text-sm">✦</span>
                  <span className="text-white/80 text-sm font-medium">BUNDLE DEAL</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
                  コンプリートパック
                </h2>
                <p className="text-gray-400 mb-8">
                  全3冊セットで2,000円以上お得に
                </p>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className="text-2xl text-gray-500 line-through">¥4,940</span>
                  <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>¥2,980</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 text-sm font-bold rounded-full">
                    40% OFF
                  </span>
                </div>

                {/* Mini book covers */}
                <div className="flex justify-center gap-4 mb-8">
                  {books.map((book, i) => (
                    <div
                      key={book.slug}
                      className={`w-12 h-16 bg-gradient-to-br ${book.color} rounded-md shadow-lg opacity-80`}
                      style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
                    />
                  ))}
                </div>

                <button
                  disabled
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white/50 font-semibold rounded-2xl cursor-not-allowed border border-white/10"
                >
                  準備中
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
