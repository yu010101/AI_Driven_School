import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'
const siteName = 'AI Driven School'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '非エンジニアでも「作れて・動いて・売れる」をAIで実現 | AI Driven School',
    template: '%s | AI Driven School',
  },
  description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
  keywords: ['バイブコーディング', 'AI', '個人開発', 'ノーコード', '0円マーケティング', '非エンジニア', 'アプリ開発'],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: baseUrl,
    siteName: siteName,
    title: '非エンジニアでも「作れて・動いて・売れる」をAIで実現',
    description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI駆動塾 - VIBE_CODING x BUILD x MARKETING',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '非エンジニアでも「作れて・動いて・売れる」をAIで実現',
    description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#050510',
  width: 'device-width',
  initialScale: 1,
}

// 構造化データ（JSON-LD）
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: siteName,
      description: 'バイブコーディング × 個人開発 × 0円マーケ ── 実践知を体系化した知識データベース',
      inLanguage: 'ja',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/knowledge?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: siteName,
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon-512.png`,
      },
      description: '非エンジニアでもAIでアプリを作れるようになる知識データベース',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-background">
          メインコンテンツへスキップ
        </a>
        <Navigation />
        <main id="main-content" className="flex-1" role="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
