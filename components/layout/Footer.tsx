import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] mt-auto bg-white" role="contentinfo">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* ロゴ */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-xl flex items-center justify-center shadow-lg shadow-[#6366F1]/20">
              <span className="font-bold text-white text-xs">AI</span>
            </div>
            <span className="font-bold text-[#0F172A]">駆動塾</span>
          </div>

          {/* リンク */}
          <nav className="flex items-center gap-6 text-sm" aria-label="フッターナビゲーション">
            <Link href="/" className="text-[#64748B] hover:text-[#6366F1] transition-colors">
              ホーム
            </Link>
            <Link href="/about" className="text-[#64748B] hover:text-[#6366F1] transition-colors">
              About
            </Link>
            <Link href="/free" className="text-[#64748B] hover:text-[#6366F1] transition-colors">
              無料で学ぶ
            </Link>
            <Link href="/knowledge" className="text-[#64748B] hover:text-[#6366F1] transition-colors">
              記事一覧
            </Link>
          </nav>

          {/* コピーライト */}
          <div className="text-sm text-[#94A3B8]">
            © 2024 AI駆動塾
          </div>
        </div>
      </div>
    </footer>
  )
}
