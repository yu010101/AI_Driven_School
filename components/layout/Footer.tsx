import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[#E2E8F0]/50 mt-auto bg-gradient-to-b from-white to-[#FAFAFA]" role="contentinfo">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:shadow-black/20 transition-all duration-300 group-hover:scale-105">
                  <span className="font-bold text-white text-sm">AI</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#06B6D4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#0A0A0A] text-lg leading-tight group-hover:text-[#6366F1] transition-colors">駆動塾</span>
                <span className="text-[10px] text-[#94A3B8] font-medium tracking-wider">AI DRIVEN SCHOOL</span>
              </div>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-xs">
              非エンジニアでもAIを使ってアプリを作り、売る方法を学べる無料プラットフォーム。
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-[#0A0A0A] mb-4 text-sm">ナビゲーション</h4>
            <nav className="flex flex-col gap-3" aria-label="フッターナビゲーション">
              <Link href="/" className="text-sm text-[#64748B] hover:text-[#6366F1] transition-colors inline-flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-[#E5E5E5] group-hover:bg-[#6366F1] transition-colors" />
                ホーム
              </Link>
              <Link href="/about" className="text-sm text-[#64748B] hover:text-[#6366F1] transition-colors inline-flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-[#E5E5E5] group-hover:bg-[#6366F1] transition-colors" />
                About
              </Link>
              <Link href="/free" className="text-sm text-[#64748B] hover:text-[#6366F1] transition-colors inline-flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-[#E5E5E5] group-hover:bg-[#6366F1] transition-colors" />
                無料で学ぶ
              </Link>
              <Link href="/knowledge" className="text-sm text-[#64748B] hover:text-[#6366F1] transition-colors inline-flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-[#E5E5E5] group-hover:bg-[#6366F1] transition-colors" />
                記事一覧
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-[#0A0A0A] mb-4 text-sm">カテゴリ</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/knowledge/vibe-coding" className="text-sm text-[#64748B] hover:text-[#6366F1] transition-colors inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]/30 group-hover:bg-[#6366F1] transition-colors" />
                バイブコーディング
              </Link>
              <Link href="/knowledge/build" className="text-sm text-[#64748B] hover:text-[#06B6D4] transition-colors inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]/30 group-hover:bg-[#06B6D4] transition-colors" />
                実装パターン
              </Link>
              <Link href="/knowledge/marketing" className="text-sm text-[#64748B] hover:text-[#F97316] transition-colors inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]/30 group-hover:bg-[#F97316] transition-colors" />
                0円マーケティング
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-[#0A0A0A] mb-4 text-sm">フォロー</h4>
            <div className="flex gap-3">
              <a
                href="https://x.com/L_go_mrk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#F5F5F5] flex items-center justify-center text-[#64748B] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Xをフォロー"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://note.com/l_mrk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#F5F5F5] flex items-center justify-center text-[#64748B] hover:bg-[#41C9B4] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="noteで読む"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 21H9V10h6v11zm-4-2h2v-7h-2v7zm10-9H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h5v-7h8v7h5c.55 0 1-.45 1-1V11c0-.55-.45-1-1-1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E2E8F0]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#94A3B8]">
              © {currentYear} AI駆動塾. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F5F5] rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
                完全無料で公開中
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
