import React from 'react'

export type Guide = {
  title: string
  shortTitle?: string
  description: string
  keywords: string[]
  badges?: string[]
  createdAt: string
  updatedAt: string
  readTime: number
  toc?: { id: string; title: string }[]
  steps?: { title: string; description: string }[]
  faqs?: { question: string; answer: string }[]
  relatedArticles?: { href: string; title: string; description: string }[]
  content: React.ReactNode
}

export const guides: Record<string, Guide> = {
  'vibe-coding': {
    title: 'バイブコーディング完全ガイド｜AIでアプリを作る方法',
    shortTitle: 'バイブコーディング',
    description: 'バイブコーディングとは、AIに指示を出すだけでアプリが作れる革新的な開発手法です。プログラミング知識ゼロでも、このガイドを読めば今日からアプリ開発を始められます。',
    keywords: ['バイブコーディング', 'AI', 'アプリ開発', '初心者', 'プログラミングなし', 'Cursor', 'Claude Code'],
    badges: ['完全ガイド', '初心者向け', '2024年最新'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-15',
    readTime: 20,
    toc: [
      { id: 'what-is-vibe-coding', title: 'バイブコーディングとは？' },
      { id: 'why-vibe-coding', title: 'なぜバイブコーディングなのか' },
      { id: 'tools', title: '必要なツール' },
      { id: 'first-app', title: '最初のアプリを作る' },
      { id: 'prompts', title: 'プロンプトの書き方' },
      { id: 'debugging', title: 'エラーの直し方' },
      { id: 'next-steps', title: '次のステップ' },
    ],
    steps: [
      { title: 'ツールを準備する', description: 'CursorまたはClaude Codeをインストールします' },
      { title: 'プロジェクトを作成する', description: 'AIに「ToDoアプリを作って」と指示します' },
      { title: 'コードを生成する', description: 'AIが自動でコードを書いてくれます' },
      { title: 'プレビューで確認する', description: '生成されたアプリを確認します' },
      { title: '修正を依頼する', description: '気になる点をAIに伝えて修正します' },
      { title: 'デプロイする', description: 'Vercelなどで公開します' },
    ],
    faqs: [
      {
        question: 'プログラミング経験がなくても本当にできますか？',
        answer: 'はい、できます。バイブコーディングはAIがコードを書くので、あなたは「何を作りたいか」を伝えるだけです。日本語で指示を出せるので、英語やプログラミング言語の知識は不要です。',
      },
      {
        question: 'どのツールから始めればいいですか？',
        answer: 'Cursor（カーソル）がおすすめです。無料プランがあり、インストールも簡単です。慣れてきたらClaude Codeも試してみてください。',
      },
      {
        question: 'どのくらいの期間で作れるようになりますか？',
        answer: '簡単なアプリなら1日で作れます。このガイドを読みながら手を動かせば、今日中に最初のアプリが完成します。',
      },
      {
        question: '作ったアプリは商用利用できますか？',
        answer: 'はい、問題ありません。AIが生成したコードの著作権は明確ではありませんが、現状では商用利用が認められています。',
      },
      {
        question: '無料でどこまでできますか？',
        answer: 'Cursorの無料プランで月2000回のAI補完が使えます。個人開発なら十分な量です。デプロイもVercelの無料プランで可能です。',
      },
    ],
    relatedArticles: [
      { href: '/knowledge/vibe-coding/cursor-guide', title: 'Cursor入門', description: 'AIコードエディタの使い方' },
      { href: '/knowledge/vibe-coding/claude-code-guide', title: 'Claude Code入門', description: 'ターミナルで動くAI' },
      { href: '/knowledge/vibe-coding/vibe-coding-prompts', title: 'プロンプト集', description: 'すぐ使えるプロンプト例' },
    ],
    content: (
      <>
        <section id="what-is-vibe-coding">
          <h2>バイブコーディングとは？</h2>
          <p>
            <strong>バイブコーディング（Vibe Coding）</strong>とは、AIに自然言語で指示を出すだけでアプリケーションを開発できる、新しい開発手法です。
          </p>
          <p>
            従来のプログラミングでは、JavaScript、Python、Swiftなどの<strong>プログラミング言語</strong>を習得する必要がありました。
            文法を覚え、エラーと格闘し、何百時間もの学習が必要でした。
          </p>
          <p>
            バイブコーディングでは、これらが<strong>すべて不要</strong>になります。
          </p>
          <blockquote>
            <p>「ToDoアプリを作って。タスクの追加、完了、削除ができるようにして」</p>
          </blockquote>
          <p>
            このように日本語で指示を出すだけで、AIが自動的にコードを生成してくれます。
          </p>
        </section>

        <section id="why-vibe-coding">
          <h2>なぜバイブコーディングなのか</h2>
          <h3>1. 学習コストがゼロ</h3>
          <p>
            プログラミング言語を学ぶ必要がありません。あなたが普段使っている<strong>日本語</strong>でAIに指示を出すだけです。
          </p>
          <h3>2. 開発スピードが圧倒的</h3>
          <p>
            従来なら1週間かかる開発が、<strong>数時間</strong>で完了することもあります。アイデアを思いついたその日にプロトタイプを作れます。
          </p>
          <h3>3. エラー修正もAIにお任せ</h3>
          <p>
            「このエラーを直して」とAIに伝えるだけ。デバッグで何時間も悩む必要はありません。
          </p>
          <h3>ノーコードとの違い</h3>
          <table>
            <thead>
              <tr>
                <th>項目</th>
                <th>ノーコード</th>
                <th>バイブコーディング</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>自由度</td>
                <td>テンプレート内で制限</td>
                <td>何でも作れる</td>
              </tr>
              <tr>
                <td>コスト</td>
                <td>月額数千円〜</td>
                <td>ほぼ無料</td>
              </tr>
              <tr>
                <td>カスタマイズ</td>
                <td>限定的</td>
                <td>完全自由</td>
              </tr>
              <tr>
                <td>データ所有</td>
                <td>プラットフォーム依存</td>
                <td>完全に自分のもの</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="tools">
          <h2>必要なツール</h2>
          <h3>Cursor（カーソル）</h3>
          <p>
            AIを搭載したコードエディタです。VSCodeをベースにしており、直感的に使えます。
          </p>
          <ul>
            <li><strong>料金</strong>: 無料プランあり（月2000回のAI補完）</li>
            <li><strong>特徴</strong>: チャットでAIと会話しながら開発</li>
            <li><strong>対応OS</strong>: Mac / Windows / Linux</li>
          </ul>
          <h3>Claude Code</h3>
          <p>
            ターミナル（コマンドライン）で動くAIアシスタントです。より自動化された開発が可能です。
          </p>
          <ul>
            <li><strong>料金</strong>: Claude Proプラン（月$20）が必要</li>
            <li><strong>特徴</strong>: 完全自動でファイル作成・編集</li>
            <li><strong>対応OS</strong>: Mac / Windows / Linux</li>
          </ul>
          <h3>おすすめの始め方</h3>
          <p>
            まずは<strong>Cursor</strong>から始めましょう。無料で、インストールも簡単です。
            慣れてきたらClaude Codeにステップアップすると、より効率的に開発できます。
          </p>
        </section>

        <section id="first-app">
          <h2>最初のアプリを作る</h2>
          <p>実際にToDoアプリを作ってみましょう。</p>
          <h3>ステップ1: Cursorをインストール</h3>
          <ol>
            <li><a href="https://cursor.com" target="_blank" rel="noopener noreferrer">cursor.com</a>にアクセス</li>
            <li>「Download」をクリック</li>
            <li>インストーラーを実行</li>
            <li>アカウントを作成（無料）</li>
          </ol>
          <h3>ステップ2: プロジェクトを作成</h3>
          <ol>
            <li>新しいフォルダを作成（例: my-todo-app）</li>
            <li>Cursorでそのフォルダを開く</li>
            <li>Cmd + L（Mac）/ Ctrl + L（Windows）でチャットを開く</li>
          </ol>
          <h3>ステップ3: AIに指示を出す</h3>
          <p>チャットに以下のように入力します：</p>
          <pre><code>{`ToDoアプリを作ってください。
以下の機能を含めてください：
- タスクの追加
- タスクの完了/未完了の切り替え
- タスクの削除
- ローカルストレージへの保存

HTMLとCSSとJavaScriptで、1つのindex.htmlファイルにまとめてください。`}</code></pre>
          <h3>ステップ4: 生成されたコードを確認</h3>
          <p>
            AIがコードを生成したら、「Apply」をクリックしてファイルに適用します。
            index.htmlをブラウザで開くと、ToDoアプリが動作します。
          </p>
        </section>

        <section id="prompts">
          <h2>プロンプトの書き方</h2>
          <p>良いプロンプトを書くコツを紹介します。</p>
          <h3>1. 具体的に書く</h3>
          <pre><code>{`❌ アプリを作って
✅ タスク管理アプリを作って。タスクの追加、編集、削除、完了マークができるようにして`}</code></pre>
          <h3>2. 技術を指定する</h3>
          <pre><code>{`❌ ログイン機能を追加して
✅ Supabase Authを使ってメールとパスワードでのログイン機能を追加して`}</code></pre>
          <h3>3. 段階的に依頼する</h3>
          <p>一度に全部を頼まず、少しずつ機能を追加していくのがコツです。</p>
          <pre><code>{`1回目: まず基本的なToDoアプリを作って
2回目: カテゴリ分け機能を追加して
3回目: 期限設定機能を追加して`}</code></pre>
        </section>

        <section id="debugging">
          <h2>エラーの直し方</h2>
          <p>エラーが出ても慌てないでください。AIに直してもらえます。</p>
          <h3>方法1: エラーメッセージをそのまま貼り付け</h3>
          <pre><code>{`以下のエラーを修正してください：

TypeError: Cannot read property 'map' of undefined
    at App.js:15:23`}</code></pre>
          <h3>方法2: 期待する動作を伝える</h3>
          <pre><code>{`ボタンをクリックしても何も起きません。
クリックしたらタスクが追加されるようにしてください。`}</code></pre>
          <h3>方法3: スクリーンショットを共有</h3>
          <p>
            Cursorでは画像を貼り付けることもできます。
            「この画面のレイアウトを修正して」と画像と一緒に送ると効果的です。
          </p>
        </section>

        <section id="next-steps">
          <h2>次のステップ</h2>
          <p>基礎を理解したら、次に進みましょう。</p>
          <h3>1. もっと複雑なアプリに挑戦</h3>
          <ul>
            <li>ユーザー認証（ログイン機能）</li>
            <li>データベース連携</li>
            <li>決済機能</li>
          </ul>
          <h3>2. デプロイして公開</h3>
          <p>
            作ったアプリをVercelやNetlifyで無料公開できます。
            URLを共有すれば、誰でもあなたのアプリを使えます。
          </p>
          <h3>3. マーケティングを学ぶ</h3>
          <p>
            作るだけでなく、<strong>売る</strong>方法も重要です。
            0円マーケティングガイドで集客方法を学びましょう。
          </p>
        </section>
      </>
    ),
  },

  'ai-app-beginner': {
    title: '非エンジニアのためのAIアプリ開発入門',
    shortTitle: 'AIアプリ開発入門',
    description: 'プログラミング未経験でもAIを使ってアプリを作る方法を完全解説。必要なツール、学習ロードマップ、よくある失敗と対策まで網羅。',
    keywords: ['AI', 'アプリ開発', '初心者', '非エンジニア', 'プログラミングなし', '入門'],
    badges: ['完全ガイド', '初心者向け'],
    createdAt: '2024-01-15',
    updatedAt: '2024-12-15',
    readTime: 15,
    toc: [
      { id: 'introduction', title: 'はじめに' },
      { id: 'mindset', title: '必要なマインドセット' },
      { id: 'roadmap', title: '学習ロードマップ' },
      { id: 'mistakes', title: 'よくある失敗と対策' },
    ],
    faqs: [
      {
        question: '本当に非エンジニアでもアプリが作れますか？',
        answer: 'はい、作れます。2024年現在、AIの進化により、プログラミング知識がなくてもアプリ開発が可能になりました。ただし、「何を作りたいか」を明確に言語化する能力は必要です。',
      },
      {
        question: '英語ができなくても大丈夫ですか？',
        answer: 'はい、日本語だけで開発できます。最新のAI（Claude、GPT-4）は日本語を高精度で理解します。エラーメッセージが英語の場合も、AIに「日本語で説明して」と頼めば翻訳してくれます。',
      },
      {
        question: 'MacとWindowsどちらがいいですか？',
        answer: 'どちらでも問題ありません。現在のツールはすべてクロスプラットフォーム対応です。iPhoneアプリを作る場合のみMacが必要ですが、Webアプリなら関係ありません。',
      },
    ],
    relatedArticles: [
      { href: '/guide/vibe-coding', title: 'バイブコーディング完全ガイド', description: 'AIでアプリを作る手法' },
      { href: '/knowledge/vibe-coding/cursor-guide', title: 'Cursor入門', description: 'AIコードエディタの使い方' },
    ],
    content: (
      <>
        <section id="introduction">
          <h2>はじめに</h2>
          <p>
            「アプリを作りたいけど、プログラミングは難しそう…」
          </p>
          <p>
            そう思っていませんか？実は、2024年の今、<strong>AIの力を借りれば誰でもアプリが作れる</strong>時代になりました。
          </p>
          <p>
            このガイドでは、プログラミング経験ゼロの人が、AIを使ってアプリを作れるようになるまでの道のりを解説します。
          </p>
        </section>

        <section id="mindset">
          <h2>必要なマインドセット</h2>
          <h3>1. 完璧を求めない</h3>
          <p>
            最初から完璧なアプリを作ろうとしないでください。
            まずは動くものを作り、少しずつ改善していきましょう。
          </p>
          <h3>2. エラーを恐れない</h3>
          <p>
            エラーは敵ではありません。「何かがうまくいっていない」というAIへのヒントです。
            エラーメッセージをそのままAIに貼り付ければ、解決策を教えてくれます。
          </p>
          <h3>3. 小さく始める</h3>
          <p>
            最初は超シンプルなアプリから始めましょう。
            「ボタンを押したら文字が変わる」程度で十分です。
          </p>
        </section>

        <section id="roadmap">
          <h2>学習ロードマップ</h2>
          <h3>Week 1: ツールに慣れる</h3>
          <ul>
            <li>Cursorをインストール</li>
            <li>AIチャットの使い方を覚える</li>
            <li>簡単なHTMLページを作る</li>
          </ul>
          <h3>Week 2: 最初のアプリ</h3>
          <ul>
            <li>ToDoアプリを作る</li>
            <li>デザインを調整する</li>
            <li>ローカルストレージで保存</li>
          </ul>
          <h3>Week 3: デプロイ</h3>
          <ul>
            <li>Vercelアカウント作成</li>
            <li>アプリを公開</li>
            <li>カスタムドメイン設定（任意）</li>
          </ul>
          <h3>Week 4: 応用</h3>
          <ul>
            <li>データベース連携</li>
            <li>ユーザー認証</li>
            <li>本格的なアプリ開発</li>
          </ul>
        </section>

        <section id="mistakes">
          <h2>よくある失敗と対策</h2>
          <h3>失敗1: 最初から大きなアプリを作ろうとする</h3>
          <p>
            <strong>対策</strong>: まずは「ボタン1つ」「入力欄1つ」から始める。
            機能は後から追加できます。
          </p>
          <h3>失敗2: エラーで心が折れる</h3>
          <p>
            <strong>対策</strong>: エラーはAIに丸投げ。「このエラーを直して」で解決します。
          </p>
          <h3>失敗3: ツールの選択で迷い続ける</h3>
          <p>
            <strong>対策</strong>: 迷ったらCursor。無料で始められて、十分な機能があります。
          </p>
        </section>
      </>
    ),
  },

  'zero-marketing': {
    title: '0円マーケティング完全ガイド｜広告費ゼロで集客する方法',
    shortTitle: '0円マーケティング',
    description: '広告費をかけずに集客する方法を完全解説。SNS運用、SEO、コミュニティ活用など、個人開発者が実践できるマーケティング手法を網羅。',
    keywords: ['マーケティング', '集客', '無料', 'SNS', 'SEO', '個人開発', 'X', 'Twitter'],
    badges: ['完全ガイド', '無料で実践可能'],
    createdAt: '2024-02-01',
    updatedAt: '2024-12-15',
    readTime: 18,
    toc: [
      { id: 'introduction', title: '0円マーケティングとは' },
      { id: 'sns', title: 'SNS運用で集客' },
      { id: 'seo', title: 'SEOで検索流入' },
      { id: 'community', title: 'コミュニティ活用' },
      { id: 'launch', title: 'ローンチ戦略' },
    ],
    faqs: [
      {
        question: '本当に無料で集客できますか？',
        answer: 'はい、可能です。お金の代わりに「時間」と「労力」を投資します。SNS投稿、ブログ執筆、コミュニティ参加など、すべて無料で実践できる方法です。',
      },
      {
        question: 'どのSNSから始めるべきですか？',
        answer: 'X（旧Twitter）がおすすめです。開発者コミュニティが活発で、テキストベースなので動画編集スキルが不要です。フォロワー0からでも始められます。',
      },
      {
        question: '効果が出るまでどのくらいかかりますか？',
        answer: '最低3ヶ月は見てください。SNSもSEOも、継続的な発信が重要です。最初の1ヶ月は反応がなくても、続けることで徐々に認知が広がります。',
      },
    ],
    relatedArticles: [
      { href: '/knowledge/marketing/x-growth-strategy', title: 'X運用戦略', description: 'フォロワーを増やす方法' },
      { href: '/knowledge/marketing/seo-basics', title: 'SEO基礎', description: '検索流入を増やす' },
    ],
    content: (
      <>
        <section id="introduction">
          <h2>0円マーケティングとは</h2>
          <p>
            0円マーケティングとは、<strong>広告費をかけずに集客する手法</strong>の総称です。
          </p>
          <p>
            個人開発者にとって、何十万円もの広告費は現実的ではありません。
            しかし、お金がなくても集客する方法はたくさんあります。
          </p>
          <h3>0円マーケティングの3本柱</h3>
          <ol>
            <li><strong>SNS運用</strong>: X、Instagram、YouTubeなど</li>
            <li><strong>SEO</strong>: Google検索からの流入</li>
            <li><strong>コミュニティ</strong>: 既存のコミュニティを活用</li>
          </ol>
        </section>

        <section id="sns">
          <h2>SNS運用で集客</h2>
          <h3>なぜXがおすすめか</h3>
          <ul>
            <li>開発者コミュニティが活発</li>
            <li>テキストベースで始めやすい</li>
            <li>バズれば一気に認知拡大</li>
            <li>フォロワー0からでもOK</li>
          </ul>
          <h3>X運用の基本</h3>
          <h4>1. プロフィールを整える</h4>
          <ul>
            <li>何をしている人か明確に</li>
            <li>アイコンは顔写真orイラスト</li>
            <li>リンクは1つに絞る</li>
          </ul>
          <h4>2. 発信の軸を決める</h4>
          <ul>
            <li>開発日記（進捗報告）</li>
            <li>学んだことの共有</li>
            <li>失敗談と解決策</li>
          </ul>
          <h4>3. 継続する</h4>
          <p>
            最低でも1日1投稿。反応がなくても3ヶ月は続けてください。
          </p>
        </section>

        <section id="seo">
          <h2>SEOで検索流入</h2>
          <h3>SEOとは</h3>
          <p>
            Search Engine Optimization（検索エンジン最適化）の略。
            Googleで検索したときに、あなたのサイトが上位に表示されるようにする施策です。
          </p>
          <h3>個人開発者のSEO戦略</h3>
          <h4>1. ロングテールキーワードを狙う</h4>
          <p>
            「アプリ 開発」のような競合の多いキーワードではなく、
            「非エンジニア アプリ 作り方」のような具体的なキーワードを狙います。
          </p>
          <h4>2. ブログを書く</h4>
          <ul>
            <li>開発過程を記事にする</li>
            <li>解決した問題を共有</li>
            <li>ツールの使い方を解説</li>
          </ul>
          <h4>3. 構造化データを設定</h4>
          <p>
            FAQ、HowTo、Articleなどの構造化データを設定すると、
            検索結果でリッチスニペットが表示されやすくなります。
          </p>
        </section>

        <section id="community">
          <h2>コミュニティ活用</h2>
          <h3>使えるプラットフォーム</h3>
          <ul>
            <li><strong>Product Hunt</strong>: 海外向けプロダクトローンチ</li>
            <li><strong>Zenn / Qiita</strong>: 技術記事の投稿</li>
            <li><strong>note</strong>: 開発ストーリーの発信</li>
            <li><strong>Discord</strong>: 開発者コミュニティ参加</li>
          </ul>
          <h3>コミュニティ活用のコツ</h3>
          <ol>
            <li>まず与える（情報提供、質問への回答）</li>
            <li>関係を構築する</li>
            <li>自然にプロダクトを紹介</li>
          </ol>
        </section>

        <section id="launch">
          <h2>ローンチ戦略</h2>
          <h3>ローンチ前</h3>
          <ul>
            <li>開発過程をSNSで発信</li>
            <li>ウェイトリストを作成</li>
            <li>β版テスターを募集</li>
          </ul>
          <h3>ローンチ当日</h3>
          <ul>
            <li>SNSで一斉告知</li>
            <li>Product Huntに投稿</li>
            <li>関連コミュニティに共有</li>
          </ul>
          <h3>ローンチ後</h3>
          <ul>
            <li>ユーザーフィードバックを収集</li>
            <li>改善を発信</li>
            <li>継続的にコンテンツ発信</li>
          </ul>
        </section>
      </>
    ),
  },
}
