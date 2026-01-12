import type { Metadata } from 'next'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: 'About',
  description: 'AI駆動塾は、非エンジニアでもAIを使ってアプリを作り、売る方法を発信しています。バイブコーディング、実装パターン、0円マーケティングを無料で学べます。',
  openGraph: {
    type: 'website',
    title: 'About | AI駆動塾',
    description: 'AI駆動塾は、非エンジニアでもAIを使ってアプリを作り、売る方法を発信しています。',
    url: `${baseUrl}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | AI駆動塾',
    description: 'AI駆動塾は、非エンジニアでもAIを使ってアプリを作り、売る方法を発信しています。',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-14">
        <h1 className="page-title">About</h1>
      </div>

      <div className="space-y-8">
        <section className="card p-8">
          <h2 className="sub-heading">AI駆動塾とは</h2>
          <p className="text-foreground/80 leading-relaxed mt-4">
            非エンジニアでもAIを使ってアプリを作り、売る方法を発信しています。
          </p>
        </section>

        <section className="card p-8">
          <h2 className="sub-heading">発信者</h2>
          <ul className="space-y-4 mt-4">
            <li className="flex items-center gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-foreground/70">X: </span>
              <a
                href="https://x.com/L_go_mrk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline cursor-pointer font-medium"
              >
                @L_go_mrk
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-foreground/70">note: </span>
              <a
                href="https://note.com/l_mrk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline cursor-pointer font-medium"
              >
                l_mrk
              </a>
            </li>
          </ul>
        </section>

        <div className="text-center pt-6">
          <Link href="/free/vibe-coding-book" className="btn-primary inline-block">
            無料で学び始める
          </Link>
        </div>
      </div>
    </div>
  )
}
