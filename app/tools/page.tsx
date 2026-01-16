import Link from 'next/link'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: '無料ツール｜AI駆動塾',
  description: 'AIアプリ開発を加速する無料ツール。プロンプト生成器、技術スタック診断など。',
  openGraph: {
    title: '無料ツール｜AI駆動塾',
    description: 'AIアプリ開発を加速する無料ツール',
    url: `${baseUrl}/tools`,
  },
  alternates: {
    canonical: `${baseUrl}/tools`,
  },
}

const tools = [
  {
    slug: 'prompt-generator',
    title: 'プロンプト生成器',
    description: 'アプリの要件を入力するだけで、AIへの最適なプロンプトを自動生成',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    color: 'from-[#6366F1] to-[#818CF8]',
    status: 'available',
  },
  {
    slug: 'tech-stack-advisor',
    title: '技術スタック診断',
    description: 'いくつかの質問に答えるだけで、最適な技術構成を提案',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: 'from-[#06B6D4] to-[#22D3EE]',
    status: 'available',
  },
  {
    slug: 'marketing-planner',
    title: 'マーケティング計画生成',
    description: 'プロダクト情報を入力すると、0円で始められる施策を自動提案',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'from-[#F97316] to-[#FB923C]',
    status: 'available',
  },
]

export default function ToolsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#0A0A0A] text-white text-xs font-bold rounded-full mb-4">
            FREE TOOLS
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            無料ツール
          </h1>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            AIアプリ開発を加速するツールを無料で提供。
            <br className="hidden md:block" />
            面倒な作業を自動化して、アイデアの実現に集中しましょう。
          </p>
        </header>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <div key={tool.slug} className="relative">
              {tool.status === 'available' ? (
                <Link
                  href={`/tools/${tool.slug}`}
                  className="card group block p-6 h-full"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-[#6366F1] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[#525252] text-sm mb-4">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#6366F1] font-semibold text-sm">
                    使ってみる
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              ) : (
                <div className="card p-6 h-full opacity-70">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-4 opacity-50`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-[#525252] text-sm mb-4">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#94A3B8] font-medium text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Request Section */}
        <section className="mt-20 text-center">
          <div className="card max-w-2xl mx-auto p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">欲しいツールがありますか？</h2>
            <p className="text-[#525252] mb-6">
              Xで @L_go_mrk にリクエストしてください。
              <br />
              需要が高いものから順に開発します。
            </p>
            <a
              href="https://x.com/L_go_mrk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              リクエストする
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
