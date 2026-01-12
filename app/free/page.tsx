import Link from 'next/link'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: '無料で学ぶ',
  description: 'バイブコーディングと0円マーケティングを無料で学べます。非エンジニアでもAIでアプリを作り、広告費ゼロで集客する方法を体系的に解説。',
  openGraph: {
    type: 'website',
    title: '無料で学ぶ | AI駆動塾',
    description: 'バイブコーディングと0円マーケティングを無料で学べます。',
    url: `${baseUrl}/free`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '無料で学ぶ | AI駆動塾',
    description: 'バイブコーディングと0円マーケティングを無料で学べます。',
  },
  alternates: {
    canonical: `${baseUrl}/free`,
  },
}

export default function Free() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="page-title">無料で学ぶ</h1>
        <p className="text-lg text-foreground/60">すべて無料で読めます</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* バイブコーディングの教科書 */}
        <Link href="/free/vibe-coding-book" className="card p-8 cursor-pointer group">
          <div className="step-badge">STEP 1</div>
          <h2 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
            バイブコーディングの教科書
          </h2>
          <p className="text-foreground/60 mb-4">
            AIに指示を出すだけでアプリが作れる。その方法を解説。
          </p>
          <span className="text-primary font-medium">→ 読む</span>
        </Link>

        {/* 0円マーケティングの教科書 */}
        <Link href="/free/zero-marketing-book" className="card p-8 cursor-pointer group">
          <div className="step-badge">STEP 3</div>
          <h2 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
            0円マーケティングの教科書
          </h2>
          <p className="text-foreground/60 mb-4">
            広告費ゼロで集客する方法を解説。
          </p>
          <span className="text-primary font-medium">→ 読む</span>
        </Link>
      </div>
    </div>
  )
}
