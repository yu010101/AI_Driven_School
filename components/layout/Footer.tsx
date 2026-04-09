import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] py-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/ai-dojo-icon.jpg" alt="AI道場" className="w-6 h-6 rounded" />
            <span className="text-sm font-bold text-[#0A0A0A]">AI道場</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#525252]">
            <Link href="/enterprise">法人</Link>
            <Link href="/terms">利用規約</Link>
            <Link href="/privacy">プライバシー</Link>
            <a href="mailto:yuichiyoshida@radineer.com">お問い合わせ</a>
            <a href="https://x.com/L_go_mrk" target="_blank" rel="noopener noreferrer">X</a>
          </div>
          <p className="text-xs text-[#94A3B8]">
            &copy; {new Date().getFullYear()} AI道場
          </p>
        </div>
      </div>
    </footer>
  )
}
