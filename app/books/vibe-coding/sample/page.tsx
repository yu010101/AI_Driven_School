import Link from 'next/link'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-driven-school.vercel.app'

export const metadata: Metadata = {
  title: '【無料サンプル】Vibe Coding入門 第1章 | AI駆動塾',
  description: 'Vibe Coding入門の第1章を無料で公開。バイブコーディングとは何か、AIと一緒に開発するワークフロー、よくある失敗と対処法を解説。',
  openGraph: {
    type: 'article',
    title: '【無料サンプル】Vibe Coding入門 第1章',
    description: 'バイブコーディングとは何か、AIと一緒に開発するワークフローを無料で学べます',
    url: `${baseUrl}/books/vibe-coding/sample`,
  },
  alternates: {
    canonical: `${baseUrl}/books/vibe-coding/sample`,
  },
}

export default function SampleChapterPage() {
  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <div className="bg-accent text-white py-3 text-center text-sm">
        <p>
          これは無料サンプルです。
          <Link href="/books/vibe-coding" className="underline ml-2 font-bold">
            全編を読む →
          </Link>
        </p>
      </div>

      <article className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Chapter Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-accent/10 text-accent text-sm font-bold px-4 py-1 rounded-full mb-4">
            無料サンプル
          </span>
          <p className="text-foreground/50 text-sm mb-2">Vibe Coding入門</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            第1章: Vibe Codingとは
          </h1>
          <p className="text-foreground/60">（導入編 / 20ページ相当）</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Section 1.1 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border">
              1.1 バイブコーディングとは何か
            </h2>

            <p className="text-foreground/80 leading-relaxed mb-6">
              「バイブコーディング（Vibe Coding）」とは、<strong>AIに自然言語で指示を出し、
              コードを生成させながら開発を進める手法</strong>です。
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              従来のプログラミングでは、開発者が一行一行コードを書いていました。
              しかしバイブコーディングでは、「こういう機能を作って」「このエラーを直して」と
              日本語で指示を出すだけで、AIがコードを書いてくれます。
            </p>

            <div className="bg-background-secondary p-6 rounded-lg mb-6">
              <h4 className="font-bold mb-3">従来の開発 vs バイブコーディング</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-surface p-4 rounded border border-border">
                  <p className="font-bold text-foreground/50 mb-2">従来</p>
                  <p className="text-foreground/70">
                    プログラミング言語を学ぶ → 文法を覚える → コードを書く → エラーを調べる → 修正する
                  </p>
                </div>
                <div className="bg-surface p-4 rounded border border-accent/30">
                  <p className="font-bold text-accent mb-2">バイブコーディング</p>
                  <p className="text-foreground/70">
                    作りたいものを日本語で伝える → AIがコードを生成 → 動作確認 → 修正を指示
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mt-8 mb-4">なぜ「Vibe」なのか</h3>

            <p className="text-foreground/80 leading-relaxed mb-6">
              「Vibe（バイブ）」は「雰囲気」「感覚」という意味です。
              細かい文法や構文を気にせず、<strong>「こんな感じで」という雰囲気でAIに伝えれば、
              AIが意図を汲み取ってコードにしてくれる</strong>。
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              この言葉は、Andrej Karpathy（テスラの元AI責任者）が提唱し、
              2024年から急速に広まりました。
            </p>

            <blockquote className="border-l-4 border-accent pl-4 py-2 my-6 bg-accent/5 rounded-r">
              <p className="text-foreground/70 italic">
                &ldquo;I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.&rdquo;
              </p>
              <p className="text-sm text-foreground/50 mt-2">
                — Andrej Karpathy
              </p>
            </blockquote>

            <h3 className="text-xl font-bold mt-8 mb-4">バイブコーディングで作れるもの</h3>

            <ul className="space-y-2 mb-6">
              {[
                'Webアプリ（ToDoアプリ、ブログ、ECサイト）',
                'モバイルアプリ（React Native、Flutter）',
                'Chrome拡張機能',
                'Discord / LINE / Slack Bot',
                'APIサーバー',
                'データ分析ツール',
                'SaaS（月額課金サービス）',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <span className="text-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-accent/5 border border-accent/20 p-6 rounded-lg">
              <p className="font-bold text-accent mb-2">ポイント</p>
              <p className="text-foreground/70 text-sm">
                バイブコーディングは「プログラミングを不要にする」ものではありません。
                「プログラミングの敷居を下げる」ものです。
                基本的な概念を理解していると、AIへの指示がより的確になり、
                結果としてより良いコードが生成されます。
              </p>
            </div>
          </section>

          {/* Section 1.2 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border">
              1.2 AIと一緒に開発するワークフロー
            </h2>

            <p className="text-foreground/80 leading-relaxed mb-6">
              バイブコーディングには、効率的に開発を進めるための「型」があります。
              この流れを押さえておくと、スムーズに開発できます。
            </p>

            <div className="space-y-6 mb-8">
              {[
                {
                  step: 'Step 1',
                  title: '要件を明確にする',
                  desc: '何を作りたいか、どんな機能が必要かを整理します。箇条書きで十分です。',
                },
                {
                  step: 'Step 2',
                  title: 'AIに全体像を伝える',
                  desc: '最初に「こういうアプリを作りたい」と全体像を伝えます。AIはコンテキストを理解した上でコードを生成してくれます。',
                },
                {
                  step: 'Step 3',
                  title: '小さく作って確認する',
                  desc: '一気に全部を作ろうとせず、小さな機能から始めます。動作確認しながら進めるのがコツです。',
                },
                {
                  step: 'Step 4',
                  title: 'エラーはAIに丸投げ',
                  desc: 'エラーが出たら、エラーメッセージをそのままAIに貼り付けます。AIが原因と解決策を教えてくれます。',
                },
                {
                  step: 'Step 5',
                  title: '繰り返し改善する',
                  desc: '「ここをこう変えて」「この機能を追加して」と対話しながら完成度を上げていきます。',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-20 h-8 bg-primary text-white text-xs font-bold rounded flex items-center justify-center">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-foreground/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-background-secondary p-6 rounded-lg">
              <h4 className="font-bold mb-3">プロンプトの例</h4>
              <div className="bg-surface p-4 rounded border border-border font-mono text-sm overflow-x-auto">
                <pre className="text-foreground/80 whitespace-pre-wrap">{`ToDoアプリを作りたいです。

機能：
- タスクの追加
- タスクの完了チェック
- タスクの削除
- ローカルストレージに保存

技術スタック：
- Next.js 14（App Router）
- TypeScript
- Tailwind CSS

まずは基本的なUIを作ってください。`}</pre>
              </div>
            </div>
          </section>

          {/* Section 1.3 Preview */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border">
              1.3 よくある失敗と対処法
            </h2>

            <p className="text-foreground/80 leading-relaxed mb-6">
              バイブコーディングには、初心者が陥りやすい「罠」があります。
              事前に知っておくことで、無駄な時間を使わずに済みます。
            </p>

            <div className="space-y-6">
              {[
                {
                  mistake: '失敗1: 指示が曖昧すぎる',
                  bad: '「いい感じのアプリを作って」',
                  good: '「タスク管理アプリを作って。追加・完了・削除ができて、データは保存される」',
                  tip: '具体的な機能を箇条書きで伝える',
                },
                {
                  mistake: '失敗2: 一度に全部を作ろうとする',
                  bad: '「ECサイトを全部作って」',
                  good: '「まず商品一覧ページを作って」→「次にカート機能を追加して」',
                  tip: '小さく分割して、動作確認しながら進める',
                },
                {
                  mistake: '失敗3: エラーを自分で解決しようとする',
                  bad: '（エラーメッセージを見て自分で調べる）',
                  good: '（エラーメッセージをそのままAIに貼る）',
                  tip: 'AIはエラー解決が得意。丸投げでOK',
                },
              ].map((item, i) => (
                <div key={i} className="card p-6">
                  <h4 className="font-bold text-error mb-4">{item.mistake}</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-error/5 p-3 rounded border border-error/20">
                      <p className="text-xs text-error font-bold mb-1">NG</p>
                      <p className="text-sm text-foreground/70">{item.bad}</p>
                    </div>
                    <div className="bg-success/5 p-3 rounded border border-success/20">
                      <p className="text-xs text-success font-bold mb-1">OK</p>
                      <p className="text-sm text-foreground/70">{item.good}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/60">
                    <span className="font-bold">対処法:</span> {item.tip}
                  </p>
                </div>
              ))}
            </div>

            {/* Fade out effect */}
            <div className="relative mt-12">
              <div className="h-32 bg-gradient-to-b from-transparent to-background" />
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="card-strong p-8 text-center mt-8">
          <h3 className="text-xl font-bold mb-2">続きを読む</h3>
          <p className="text-foreground/60 mb-6">
            第2章以降では、具体的なツールの使い方と<br />
            21種類のチュートリアルを解説しています。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/books/vibe-coding#purchase" className="btn-primary">
              全編を購入する（¥1,980）
            </Link>
            <Link href="/books/vibe-coding" className="btn-secondary">
              詳細を見る
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="font-bold mb-4">関連する無料記事</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/knowledge/vibe-coding/what-is-vibe-coding"
              className="card p-4 hover:border-primary transition-colors"
            >
              <p className="font-bold text-sm mb-1">バイブコーディングとは？</p>
              <p className="text-xs text-foreground/60">より詳しい解説記事</p>
            </Link>
            <Link
              href="/knowledge/vibe-coding/cursor-guide"
              className="card p-4 hover:border-primary transition-colors"
            >
              <p className="font-bold text-sm mb-1">Cursor入門</p>
              <p className="text-xs text-foreground/60">人気No.1 AIエディタの使い方</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
