import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import CookieConsent from '@/components/CookieConsent'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'
const siteName = 'AI道場'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'AI道場 — AIで業務を自動化する実践スキルを身につける',
    template: '%s | AI道場',
  },
  description: 'コピペ1行から始める。Anthropic公式認定も取れる。議事録・メール・データ分析、実務で使えるAIスキルを無料で学べます。',
  keywords: ['AI道場', 'Claude Code', 'AI研修', '資格', 'Anthropic認定', 'AI自動化', '業務効率化'],
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
    title: 'AIで業務を自動化する実践スキルを身につける',
    description: 'コピペ1行から始める。Anthropic公式認定も取れる。議事録・メール・データ分析、実務で使えるAIスキルを無料で学べます。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI道場 - VIBE_CODING x BUILD x MARKETING',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIで業務を自動化する実践スキルを身につける',
    description: 'コピペ1行から始める。Anthropic公式認定も取れる。議事録・メール・データ分析、実務で使えるAIスキルを無料で学べます。',
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
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
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
        '@id': `${baseUrl}/#logo`,
        url: `${baseUrl}/icon-512.png`,
        width: 512,
        height: 512,
        caption: siteName,
      },
      image: {
        '@id': `${baseUrl}/#logo`,
      },
      description: '非エンジニアでもAIでアプリを作れるようになる知識データベース',
      sameAs: [
        'https://x.com/L_go_mrk',
        'https://note.com/l_mrk',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'Japanese',
        url: 'https://x.com/L_go_mrk',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${baseUrl}/#webpage`,
      url: baseUrl,
      name: '非エンジニアでも「作れて・動いて・売れる」をAIで実現',
      isPartOf: {
        '@id': `${baseUrl}/#website`,
      },
      about: {
        '@id': `${baseUrl}/#organization`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
      datePublished: '2024-01-01T00:00:00+09:00',
      dateModified: new Date().toISOString(),
      inLanguage: 'ja',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${baseUrl}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ホーム',
          item: baseUrl,
        },
      ],
    },
    {
      '@type': 'Course',
      '@id': `${baseUrl}/#course`,
      name: 'AI活用マスターコース',
      description: '非エンジニアでもAIを使ってアプリを作り、売る方法を体系的に学べる無料コース',
      provider: {
        '@id': `${baseUrl}/#organization`,
      },
      educationalLevel: '初心者',
      isAccessibleForFree: true,
      inLanguage: 'ja',
      audience: {
        '@type': 'Audience',
        audienceType: '非エンジニア、個人開発者',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT10H',
      },
      syllabusSections: [
        {
          '@type': 'Syllabus',
          name: 'バイブコーディング',
          description: 'AIに指示を出すだけでアプリが作れる開発手法を学ぶ',
        },
        {
          '@type': 'Syllabus',
          name: '実装パターン',
          description: 'ログイン・決済など、よくある機能の作り方を学ぶ',
        },
        {
          '@type': 'Syllabus',
          name: '0円マーケティング',
          description: '広告費ゼロで集客する方法を学ぶ',
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${baseUrl}/#author`,
      name: 'AI道場',
      url: 'https://x.com/L_go_mrk',
      sameAs: [
        'https://x.com/L_go_mrk',
        'https://note.com/l_mrk',
      ],
      description: '非エンジニア向けにAI開発の実践知を発信',
      jobTitle: 'AI開発エバンジェリスト',
      worksFor: {
        '@id': `${baseUrl}/#organization`,
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* Google Search Console verification - .envでNEXT_PUBLIC_GSC_CODEを設定 */}
        {process.env.NEXT_PUBLIC_GSC_CODE && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_CODE} />
        )}

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
        <CookieConsent />
      </body>
    </html>
  )
}
