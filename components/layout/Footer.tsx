import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto bg-gray-50" role="contentinfo">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* ロゴ */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-xs">AI</span>
            </div>
            <span className="font-bold text-gray-900">駆動塾</span>
          </div>

          {/* リンク */}
          <nav className="flex items-center gap-6 text-sm" aria-label="フッターナビゲーション">
            <Link href="/" className="text-gray-500 hover:text-black transition-colors">
              ホーム
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-black transition-colors">
              About
            </Link>
            <Link href="/free" className="text-gray-500 hover:text-black transition-colors">
              無料で学ぶ
            </Link>
            <Link href="/knowledge" className="text-gray-500 hover:text-black transition-colors">
              記事一覧
            </Link>
          </nav>

          {/* コピーライト */}
          <div className="text-sm text-gray-400">
            © 2024 AI駆動塾
          </div>
        </div>
      </div>
    </footer>
  )
}
