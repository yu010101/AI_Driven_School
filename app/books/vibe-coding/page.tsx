import Link from 'next/link'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-driven-school.vercel.app'

export const metadata: Metadata = {
  title: 'Vibe Coding入門 - AIと一緒にアプリを作る新時代の開発手法',
  description: '非エンジニアでもAIでアプリが作れる。12種のAIツール解説、21種のチュートリアル、プロンプト50選を収録した200ページの完全ガイド。',
  openGraph: {
    type: 'website',
    title: 'Vibe Coding入門',
    description: '非エンジニアでもAIでアプリが作れる完全ガイド',
    url: `${baseUrl}/books/vibe-coding`,
  },
  alternates: {
    canonical: `${baseUrl}/books/vibe-coding`,
  },
}

const tableOfContents = [
  {
    chapter: '第1章',
    title: 'Vibe Codingとは（導入編）',
    pages: '20ページ',
    sections: [
      'バイブコーディングとは何か',
      'AIと一緒に開発するワークフロー',
      'よくある失敗と対処法',
    ],
  },
  {
    chapter: '第2章',
    title: 'AIコーディングツール大全',
    pages: '40ページ',
    sections: [
      'Cursor完全ガイド',
      'Claude Code入門',
      'GitHub Copilot活用法',
      'Bolt.new / v0 / Lovable',
      'ツール比較と選び方',
    ],
  },
  {
    chapter: '第3章',
    title: 'プロンプトエンジニアリング',
    pages: '30ページ',
    sections: [
      'プロンプトの基本',
      'AIに伝わる指示の書き方',
      'コピペで使えるテンプレート集',
      'AIペアプログラミング',
    ],
  },
  {
    chapter: '第4章',
    title: '実践チュートリアル（基礎編）',
    pages: '35ページ',
    sections: [
      '30分で最初のアプリを作る',
      'ToDoアプリを作る',
      'ポートフォリオサイト',
      'ランディングページ',
    ],
  },
  {
    chapter: '第5章',
    title: '実践チュートリアル（応用編）',
    pages: '40ページ',
    sections: [
      'ブログサイト / ECサイト / ダッシュボード',
      'Discord Bot / LINE Bot / Slack App',
      'Chrome拡張機能 / React Nativeアプリ',
      'SaaS MVP / Webhook連携',
    ],
  },
  {
    chapter: '第6章',
    title: '開発効率化テクニック',
    pages: '25ページ',
    sections: [
      'AIでデバッグ・エラー解決',
      'AIでコードレビュー',
      'AIでテスト自動生成',
      'AIでドキュメント作成',
    ],
  },
  {
    chapter: '付録',
    title: 'プロンプトテンプレート50選',
    pages: '10ページ',
    sections: [
      'すぐに使えるプロンプト集',
      'トラブルシューティング',
      'おすすめリソース',
    ],
  },
]

const features = [
  {
    icon: '',
    title: '12種のAIツール完全網羅',
    description: 'Cursor、Claude Code、Copilot、Bolt.newなど主要ツールをすべて解説',
  },
  {
    icon: '',
    title: '21種のチュートリアル',
    description: 'ToDoアプリからSaaS MVPまで、実際に手を動かしながら学べる',
  },
  {
    icon: '',
    title: 'プロンプト50選',
    description: 'コピペですぐに使える実践的なプロンプトテンプレート集',
  },
  {
    icon: '',
    title: '初心者でも30分で',
    description: '最初のアプリを30分で作れるステップバイステップガイド',
  },
]

const faqs = [
  {
    q: 'プログラミング未経験でも読めますか？',
    a: 'はい、プログラミング未経験者を対象に書いています。専門用語は都度解説し、最初のアプリを30分で作れるチュートリアルから始められます。',
  },
  {
    q: 'どの形式で届きますか？',
    a: 'PDF形式でお届けします。購入後すぐにダウンロードでき、PC・タブレット・スマートフォンで読めます。',
  },
  {
    q: '返金はできますか？',
    a: 'デジタルコンテンツの性質上、原則として返金は承っておりません。購入前に無料サンプル（第1章）をご確認ください。',
  },
  {
    q: 'サイトの記事と何が違いますか？',
    a: '51本の記事を体系的に再編集し、書き下ろしコンテンツ（20ページ分）を追加しています。順番に読むだけで効率的に学べる構成になっています。',
  },
  {
    q: 'アップデートはありますか？',
    a: 'AIツールの進化に合わせて、購入者には無料でアップデート版をお届けします（年1-2回予定）。',
  },
]

export default function VibeCodingBookPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-80 bg-primary rounded-lg shadow-2xl flex items-center justify-center p-8 relative overflow-hidden transform hover:scale-105 transition-transform">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-6 left-6 w-24 h-24 border-2 border-white/30 rounded-full" />
                    <div className="absolute bottom-10 right-6 w-36 h-36 border-2 border-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full" />
                  </div>
                  <div className="text-center text-white relative z-10">
                    <p className="text-xs opacity-70 mb-3 tracking-wider">AI道場</p>
                    <h2 className="font-bold text-2xl leading-tight mb-2">Vibe Coding</h2>
                    <h2 className="font-bold text-2xl leading-tight">入門</h2>
                    <div className="w-12 h-0.5 bg-white/30 mx-auto my-4" />
                    <p className="text-xs opacity-70">AIと一緒にアプリを作る</p>
                    <p className="text-xs opacity-70">新時代の開発手法</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-accent text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  200ページ
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div>
              <span className="inline-block bg-accent/10 text-accent text-sm font-bold px-4 py-1 rounded-full mb-4">
                電子書籍
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Vibe Coding入門
              </h1>
              <p className="text-lg text-foreground/70 mb-6">
                AIと一緒にアプリを作る新時代の開発手法
              </p>
              <p className="text-foreground/60 mb-8">
                非エンジニアでもAIでアプリが作れる。<br />
                51本の記事を1冊に凝縮した完全ガイド。
              </p>

              {/* Key Stats */}
              <div className="flex gap-6 mb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">51</p>
                  <p className="text-xs text-foreground/50">記事収録</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">200</p>
                  <p className="text-xs text-foreground/50">ページ</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-foreground/50">AIツール解説</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">50</p>
                  <p className="text-xs text-foreground/50">プロンプト</p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-surface border border-border rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-3xl font-bold text-primary">¥1,980</p>
                  <span className="text-foreground/50">（税込）</span>
                </div>
                <a
                  href="#purchase"
                  className="btn-primary w-full text-center block mb-3"
                >
                  購入する
                </a>
                <Link
                  href="/books/vibe-coding/sample"
                  className="btn-secondary w-full text-center block"
                >
                  無料サンプルを読む（第1章）
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">この本で得られること</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="card p-6">
                  <span className="text-3xl mb-3 block">{feature.icon}</span>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-foreground/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">こんな人におすすめ</h2>
            <div className="space-y-4">
              {[
                'プログラミングは未経験だけど、アプリを作ってみたい',
                'ChatGPTは使っているけど、開発に活かせていない',
                'CursorやClaude Codeを使い始めたけど、使いこなせていない',
                'AIツールが多すぎて、どれを使えばいいかわからない',
                '個人開発でアプリをリリースしたい',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-surface p-4 rounded-lg border border-border">
                  <span className="text-accent font-bold text-lg">✓</span>
                  <p className="text-foreground/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">目次</h2>
            <p className="text-center text-foreground/60 mb-12">全7章 / 200ページ</p>
            <div className="space-y-4">
              {tableOfContents.map((chapter, i) => (
                <details key={i} className="card group">
                  <summary className="p-6 cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-accent font-bold text-sm">{chapter.chapter}</span>
                      <h3 className="font-bold">{chapter.title}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-foreground/50">{chapter.pages}</span>
                      <span className="text-foreground/30 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <ul className="space-y-2">
                      {chapter.sections.map((section, j) => (
                        <li key={j} className="text-foreground/60 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accent/50 rounded-full" />
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Chapter CTA */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">まずは無料で試してみる</h2>
            <p className="text-foreground/60 mb-8">
              第1章「Vibe Codingとは」を無料で公開しています。<br />
              購入前に内容をご確認ください。
            </p>
            <Link
              href="/books/vibe-coding/sample"
              className="btn-primary inline-block"
            >
              無料サンプルを読む（第1章 / 20ページ）
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">よくある質問</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="card">
                  <summary className="p-6 cursor-pointer font-bold flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="text-foreground/30 ml-4">+</span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-foreground/70">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section id="purchase" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">今すぐ始める</h2>
            <p className="text-white/70 mb-8">
              購入後すぐにPDFをダウンロードできます
            </p>

            <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
              <p className="text-4xl font-bold mb-2">¥1,980</p>
              <p className="text-white/60 text-sm mb-6">（税込）</p>

              <ul className="text-left space-y-3 mb-8">
                {[
                  'PDF形式（200ページ）',
                  '51記事の完全収録',
                  'プロンプトテンプレート50選',
                  '無料アップデート',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <span className="text-accent-secondary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Gumroad埋め込みボタン（将来的にStripeに移行可能） */}
              <a
                href="https://because01.gumroad.com/l/vibe-coding"
                target="_blank"
                rel="noopener noreferrer"
                className="gumroad-button block w-full bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-white/90 transition-colors mb-4"
              >
                購入する（Gumroad）
              </a>

              <div className="flex items-center gap-3 justify-center text-white/50 text-xs">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  安全な決済
                </span>
                <span>|</span>
                <span>クレジットカード対応</span>
              </div>
            </div>

            <p className="text-white/50 text-sm">
              ご不明な点は <a href="https://x.com/L_go_mrk" className="underline">X（Twitter）</a> からお気軽にどうぞ
            </p>
          </div>
        </div>
      </section>

      {/* Back to Books */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Link href="/books" className="text-foreground/60 hover:text-primary transition-colors">
            ← 電子書籍一覧に戻る
          </Link>
        </div>
      </section>
    </div>
  )
}
