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

  'cursor-complete': {
    title: 'Cursor完全ガイド｜AIコードエディタの全機能を徹底解説',
    shortTitle: 'Cursor完全ガイド',
    description: 'CursorはAIを搭載した次世代コードエディタです。インストールから高度な使い方、料金プラン、VSCodeとの違いまで完全解説。',
    keywords: ['Cursor', 'AI', 'コードエディタ', 'VSCode', 'プログラミング', 'バイブコーディング'],
    badges: ['完全ガイド', '2024年最新', 'AI搭載'],
    createdAt: '2024-01-20',
    updatedAt: '2024-12-20',
    readTime: 25,
    toc: [
      { id: 'what-is-cursor', title: 'Cursorとは' },
      { id: 'installation', title: 'インストール方法' },
      { id: 'basic-features', title: '基本機能' },
      { id: 'advanced-features', title: '高度な機能' },
      { id: 'pricing', title: '料金プラン' },
      { id: 'vs-vscode', title: 'VSCodeとの違い' },
      { id: 'tips', title: '使いこなしのコツ' },
    ],
    steps: [
      { title: 'Cursorをダウンロード', description: 'cursor.comからインストーラーをダウンロードします' },
      { title: 'インストール', description: 'インストーラーを実行してCursorをインストールします' },
      { title: 'アカウント作成', description: '無料アカウントを作成してログインします' },
      { title: 'VSCode設定のインポート', description: '既存のVSCode設定を引き継ぎます（任意）' },
      { title: 'AIモデルの選択', description: 'Claude 3.5 Sonnetを選択します（推奨）' },
      { title: '最初のプロジェクトを開く', description: 'フォルダを開いてAIチャットを試します' },
    ],
    faqs: [
      {
        question: 'Cursorは無料で使えますか？',
        answer: 'はい、無料プラン（Hobby）があります。月2000回のAI補完、50回のスローリクエストが含まれます。個人開発なら十分な量です。',
      },
      {
        question: 'VSCodeの拡張機能は使えますか？',
        answer: 'はい、CursorはVSCodeをベースにしているため、ほとんどの拡張機能がそのまま使えます。設定もインポート可能です。',
      },
      {
        question: 'どのAIモデルがおすすめですか？',
        answer: 'Claude 3.5 Sonnetがおすすめです。コーディング能力が高く、日本語も得意です。GPT-4も使えますが、コーディングではClaudeの方が優秀です。',
      },
      {
        question: 'オフラインでも使えますか？',
        answer: 'エディタとしての基本機能はオフラインでも使えますが、AI機能にはインターネット接続が必要です。',
      },
      {
        question: 'チームで使う場合の料金は？',
        answer: 'Businessプラン（$40/ユーザー/月）があります。管理機能、集中課金、優先サポートが含まれます。',
      },
    ],
    relatedArticles: [
      { href: '/guide/claude-code-complete', title: 'Claude Code完全ガイド', description: 'ターミナルで動くAI開発ツール' },
      { href: '/guide/vibe-coding', title: 'バイブコーディング完全ガイド', description: 'AIでアプリを作る方法' },
      { href: '/knowledge/vibe-coding/ai-tools-comparison', title: 'AIツール比較', description: '主要ツールの違いを解説' },
    ],
    content: (
      <>
        <section id="what-is-cursor">
          <h2>Cursorとは</h2>
          <p>
            <strong>Cursor</strong>は、AIを搭載した次世代のコードエディタです。
            VSCodeをベースにしており、使い慣れた操作感でAIの力を最大限に活用できます。
          </p>
          <h3>Cursorの特徴</h3>
          <table>
            <thead>
              <tr>
                <th>機能</th>
                <th>説明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AIチャット</td>
                <td>エディタ内でAIと会話しながらコーディング</td>
              </tr>
              <tr>
                <td>インライン編集</td>
                <td>選択したコードをAIが直接修正</td>
              </tr>
              <tr>
                <td>Tab補完</td>
                <td>AIが次に書くべきコードを予測</td>
              </tr>
              <tr>
                <td>コードベース理解</td>
                <td>プロジェクト全体を理解した上で回答</td>
              </tr>
              <tr>
                <td>マルチファイル編集</td>
                <td>複数ファイルを一度に生成・編集</td>
              </tr>
            </tbody>
          </table>
          <h3>なぜCursorなのか</h3>
          <p>
            GitHub CopilotやChatGPTなど、AIコーディングツールは多数ありますが、
            Cursorは<strong>エディタとAIの統合度</strong>が圧倒的に高いです。
          </p>
          <ul>
            <li>コードを書きながらシームレスにAIを呼び出せる</li>
            <li>プロジェクト全体のコンテキストをAIが理解</li>
            <li>生成されたコードをワンクリックで適用</li>
            <li>複数ファイルをまたぐ編集も自動</li>
          </ul>
        </section>

        <section id="installation">
          <h2>インストール方法</h2>
          <h3>ステップ1: ダウンロード</h3>
          <ol>
            <li><a href="https://cursor.com" target="_blank" rel="noopener noreferrer">cursor.com</a>にアクセス</li>
            <li>「Download」ボタンをクリック</li>
            <li>お使いのOS（Mac / Windows / Linux）を選択</li>
          </ol>
          <h3>ステップ2: インストール</h3>
          <p><strong>Mac:</strong></p>
          <ol>
            <li>ダウンロードした.dmgファイルを開く</li>
            <li>CursorアイコンをApplicationsフォルダにドラッグ</li>
            <li>Launchpadから起動</li>
          </ol>
          <p><strong>Windows:</strong></p>
          <ol>
            <li>ダウンロードした.exeファイルを実行</li>
            <li>インストーラーの指示に従う</li>
            <li>デスクトップのアイコンから起動</li>
          </ol>
          <h3>ステップ3: 初期設定</h3>
          <ol>
            <li>Cursorを起動</li>
            <li>「Create Account」でアカウント作成（Google/GitHubでも可）</li>
            <li>VSCodeの設定をインポートするか選択</li>
            <li>AIモデルを選択（Claude 3.5 Sonnet推奨）</li>
          </ol>
        </section>

        <section id="basic-features">
          <h2>基本機能</h2>
          <h3>1. AIチャット（Cmd/Ctrl + L）</h3>
          <p>
            エディタ内でAIと会話できます。コードの説明、生成、デバッグなど何でも相談できます。
          </p>
          <pre><code>{`使い方:
1. Cmd + L（Mac）/ Ctrl + L（Windows）を押す
2. サイドパネルにチャットが開く
3. 質問や指示を入力
4. AIが回答・コードを生成
5. 「Apply」で生成コードを適用`}</code></pre>
          <p><strong>便利な使い方：</strong></p>
          <ul>
            <li>「この関数の意味を教えて」 - コード解説</li>
            <li>「ログイン機能を追加して」 - 機能追加</li>
            <li>「このエラーを修正して」 - デバッグ</li>
            <li>「TypeScriptに変換して」 - リファクタリング</li>
          </ul>

          <h3>2. インラインチャット（Cmd/Ctrl + K）</h3>
          <p>
            コードを選択して、その場で編集指示を出せます。
          </p>
          <pre><code>{`使い方:
1. 編集したいコードを選択
2. Cmd + K（Mac）/ Ctrl + K（Windows）を押す
3. 指示を入力（例：「エラーハンドリングを追加」）
4. AIが編集案を提示
5. Accept/Rejectで採否を決定`}</code></pre>

          <h3>3. Tab補完</h3>
          <p>
            AIがコードの続きを予測して提案します。
          </p>
          <pre><code>{`使い方:
1. コードを書き始める
2. グレーの文字で補完候補が表示
3. Tabキーで採用
4. Escキーでキャンセル`}</code></pre>

          <h3>4. @ メンション</h3>
          <p>
            チャット内でファイルやドキュメントを参照できます。
          </p>
          <ul>
            <li><code>@filename</code> - 特定ファイルを参照</li>
            <li><code>@codebase</code> - プロジェクト全体を検索</li>
            <li><code>@docs</code> - ドキュメントを参照</li>
            <li><code>@web</code> - Web検索結果を参照</li>
          </ul>
        </section>

        <section id="advanced-features">
          <h2>高度な機能</h2>
          <h3>Composer（マルチファイル編集）</h3>
          <p>
            Cmd + Shift + I で起動。複数ファイルを一度に生成・編集できます。
          </p>
          <pre><code>{`例：「React + TypeScriptでToDoアプリを作って」

AIが自動で以下を生成：
- src/App.tsx
- src/components/TodoList.tsx
- src/components/TodoItem.tsx
- src/types/index.ts
- src/hooks/useTodos.ts`}</code></pre>

          <h3>Agent（自律的なコーディング）</h3>
          <p>
            AIが自分で考えながらコードを書きます。ファイル作成、コマンド実行も自動で行います。
          </p>
          <ul>
            <li>チャットで「Agent」モードを選択</li>
            <li>指示を出すとAIが自律的に作業</li>
            <li>途中でレビュー・修正可能</li>
          </ul>

          <h3>コードベースインデックス</h3>
          <p>
            プロジェクト全体をインデックス化し、AIがコンテキストを理解した上で回答します。
          </p>
          <ul>
            <li>設定 → Features → Codebase indexing をON</li>
            <li><code>@codebase</code> で全体を検索</li>
            <li>「この機能はどこに実装されている？」のような質問が可能</li>
          </ul>

          <h3>ルールファイル（.cursorrules）</h3>
          <p>
            プロジェクトルートに<code>.cursorrules</code>ファイルを置くと、AIの振る舞いをカスタマイズできます。
          </p>
          <pre><code>{`# .cursorrules
- TypeScriptを使用する
- 関数にはJSDocコメントを付ける
- エラーハンドリングを必ず含める
- テストコードも生成する`}</code></pre>
        </section>

        <section id="pricing">
          <h2>料金プラン</h2>
          <table>
            <thead>
              <tr>
                <th>プラン</th>
                <th>料金</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hobby（無料）</td>
                <td>$0</td>
                <td>月2000回のAI補完、50回のスローリクエスト</td>
              </tr>
              <tr>
                <td>Pro</td>
                <td>$20/月</td>
                <td>無制限のAI補完、500回の高速リクエスト</td>
              </tr>
              <tr>
                <td>Business</td>
                <td>$40/月</td>
                <td>Proの全機能 + チーム管理、SSO</td>
              </tr>
            </tbody>
          </table>
          <h3>プラン選択のポイント</h3>
          <ul>
            <li><strong>Hobby</strong>: 週末だけ開発する人、お試し用</li>
            <li><strong>Pro</strong>: 毎日開発する人、本格的に使いたい人</li>
            <li><strong>Business</strong>: チームで使う場合</li>
          </ul>
          <p>
            <strong>おすすめ</strong>: まずHobbyで試して、足りなくなったらProへ
          </p>
        </section>

        <section id="vs-vscode">
          <h2>VSCodeとの違い</h2>
          <table>
            <thead>
              <tr>
                <th>項目</th>
                <th>VSCode + Copilot</th>
                <th>Cursor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AI統合度</td>
                <td>拡張機能として追加</td>
                <td>エディタに完全統合</td>
              </tr>
              <tr>
                <td>チャット</td>
                <td>別ウィンドウ</td>
                <td>エディタ内でシームレス</td>
              </tr>
              <tr>
                <td>コンテキスト理解</td>
                <td>限定的</td>
                <td>プロジェクト全体を理解</td>
              </tr>
              <tr>
                <td>マルチファイル編集</td>
                <td>手動</td>
                <td>AIが自動で複数ファイルを編集</td>
              </tr>
              <tr>
                <td>料金</td>
                <td>Copilot $10/月</td>
                <td>無料〜$20/月</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>結論</strong>: AIを活用した開発なら、Cursorの方が圧倒的に使いやすいです。
          </p>
        </section>

        <section id="tips">
          <h2>使いこなしのコツ</h2>
          <h3>1. @メンションを活用する</h3>
          <pre><code>{`@components/Button.tsx このコンポーネントを参考に、Cardコンポーネントを作って`}</code></pre>
          <p>関連ファイルを参照に追加すると、より正確なコードが生成されます。</p>

          <h3>2. エラーはそのまま貼り付け</h3>
          <pre><code>{`以下のエラーを修正して：
TypeError: Cannot read property 'map' of undefined at ProductList.tsx:42`}</code></pre>

          <h3>3. .cursorrulesを設定する</h3>
          <p>プロジェクトの規約をAIに伝えると、一貫性のあるコードが生成されます。</p>

          <h3>4. Composerで大きな変更</h3>
          <p>機能追加や大規模リファクタリングはComposerモードで。</p>

          <h3>5. 段階的に指示を出す</h3>
          <pre><code>{`❌ 「完璧なECサイトを作って」
✅ 「まず商品一覧ページを作って」→「カートに追加機能を追加して」→「決済を実装して」`}</code></pre>
        </section>
      </>
    ),
  },

  'claude-code-complete': {
    title: 'Claude Code完全ガイド｜ターミナルで動くAI開発ツール',
    shortTitle: 'Claude Code完全ガイド',
    description: 'Claude CodeはAnthropicが提供するターミナルベースのAI開発ツールです。インストールから活用法、料金、Cursorとの使い分けまで完全解説。',
    keywords: ['Claude Code', 'AI', 'ターミナル', 'CLI', 'Anthropic', 'プログラミング'],
    badges: ['完全ガイド', '2024年最新', 'Anthropic公式'],
    createdAt: '2024-01-25',
    updatedAt: '2024-12-20',
    readTime: 22,
    toc: [
      { id: 'what-is-claude-code', title: 'Claude Codeとは' },
      { id: 'installation', title: 'インストール方法' },
      { id: 'basic-usage', title: '基本的な使い方' },
      { id: 'advanced-usage', title: '高度な使い方' },
      { id: 'pricing', title: '料金' },
      { id: 'vs-cursor', title: 'Cursorとの比較' },
      { id: 'best-practices', title: 'ベストプラクティス' },
    ],
    steps: [
      { title: 'Node.jsをインストール', description: 'Node.js 18以上が必要です' },
      { title: 'npmでインストール', description: 'npm install -g @anthropic-ai/claude-code' },
      { title: 'Anthropicアカウント作成', description: 'claude.aiでアカウントを作成' },
      { title: 'API設定', description: 'claude-code auth でログイン' },
      { title: 'プロジェクトで実行', description: 'プロジェクトフォルダでclaude-codeを起動' },
    ],
    faqs: [
      {
        question: 'Claude Codeは無料で使えますか？',
        answer: 'Claude Pro（月$20）またはClaude Max（月$100）のサブスクリプションが必要です。無料プランでは使用できません。',
      },
      {
        question: 'Cursorとどちらがおすすめですか？',
        answer: '初心者にはCursorがおすすめです。GUIで直感的に操作できます。ターミナル操作に慣れている人、より自動化したい人にはClaude Codeが向いています。',
      },
      {
        question: 'どのプログラミング言語に対応していますか？',
        answer: 'ほぼすべての言語に対応しています。JavaScript、TypeScript、Python、Go、Rust、Java、C++など、主要な言語は問題なく使えます。',
      },
      {
        question: 'オフラインでも使えますか？',
        answer: 'いいえ、Claude CodeはクラウドのClaude AIを使用するため、インターネット接続が必要です。',
      },
      {
        question: '企業での利用は可能ですか？',
        answer: 'はい、可能です。ただし、コードがClaudeに送信されるため、機密性の高いコードを扱う場合は社内ポリシーを確認してください。',
      },
    ],
    relatedArticles: [
      { href: '/guide/cursor-complete', title: 'Cursor完全ガイド', description: 'AIコードエディタの使い方' },
      { href: '/guide/vibe-coding', title: 'バイブコーディング完全ガイド', description: 'AIでアプリを作る方法' },
      { href: '/knowledge/vibe-coding/ai-tools-comparison', title: 'AIツール比較', description: '主要ツールの違いを解説' },
    ],
    content: (
      <>
        <section id="what-is-claude-code">
          <h2>Claude Codeとは</h2>
          <p>
            <strong>Claude Code</strong>は、Anthropicが提供するターミナルベースのAI開発ツールです。
            コマンドラインから直接Claudeに指示を出し、コードの生成、編集、実行を自動化できます。
          </p>
          <h3>Claude Codeの特徴</h3>
          <table>
            <thead>
              <tr>
                <th>機能</th>
                <th>説明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ファイル操作</td>
                <td>ファイルの作成、読み取り、編集を自動で実行</td>
              </tr>
              <tr>
                <td>コマンド実行</td>
                <td>ターミナルコマンドを自動で実行</td>
              </tr>
              <tr>
                <td>プロジェクト理解</td>
                <td>プロジェクト全体の構造を把握した上で作業</td>
              </tr>
              <tr>
                <td>自律的な作業</td>
                <td>複数ステップの作業を自動で実行</td>
              </tr>
              <tr>
                <td>Git操作</td>
                <td>コミット、ブランチ作成なども自動化可能</td>
              </tr>
            </tbody>
          </table>
          <h3>Cursorとの違い</h3>
          <p>
            Cursorがエディタ内でAIを使うのに対し、Claude Codeは<strong>ターミナルで動作</strong>します。
            より<strong>自動化された開発</strong>が可能で、複数の操作を一度に実行できます。
          </p>
        </section>

        <section id="installation">
          <h2>インストール方法</h2>
          <h3>前提条件</h3>
          <ul>
            <li>Node.js 18以上</li>
            <li>Claude Pro（$20/月）またはClaude Max（$100/月）プラン</li>
          </ul>
          <h3>ステップ1: Node.jsのインストール</h3>
          <p>まだインストールしていない場合は、<a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">nodejs.org</a>からダウンロードしてください。</p>
          <pre><code>{`# バージョン確認
node --version  # v18.0.0以上が必要`}</code></pre>

          <h3>ステップ2: Claude Codeのインストール</h3>
          <pre><code>{`# グローバルインストール
npm install -g @anthropic-ai/claude-code

# インストール確認
claude-code --version`}</code></pre>

          <h3>ステップ3: 認証</h3>
          <pre><code>{`# ログイン
claude-code auth

# ブラウザが開くので、Anthropicアカウントでログイン`}</code></pre>
        </section>

        <section id="basic-usage">
          <h2>基本的な使い方</h2>
          <h3>起動</h3>
          <pre><code>{`# プロジェクトフォルダで起動
cd my-project
claude-code`}</code></pre>
          <p>対話式のインターフェースが起動し、自然言語で指示を出せます。</p>

          <h3>基本的な指示の出し方</h3>
          <pre><code>{`# 機能追加
「ユーザー認証機能を追加して」

# バグ修正
「このエラーを修正して: TypeError: Cannot read property 'map' of undefined」

# リファクタリング
「このコンポーネントをTypeScriptに変換して」

# テスト作成
「src/utils/helpers.tsのユニットテストを作って」`}</code></pre>

          <h3>ファイル操作</h3>
          <p>Claude Codeはファイルの作成、編集、削除を自動で行います。</p>
          <pre><code>{`「新しいReactコンポーネントButton.tsxを作成して」
→ src/components/Button.tsx が自動作成される

「package.jsonにaxiosを追加して」
→ package.jsonが編集され、npm installが実行される`}</code></pre>

          <h3>コマンド実行</h3>
          <p>ターミナルコマンドも自動で実行できます。</p>
          <pre><code>{`「ビルドして問題があれば修正して」
→ npm run build を実行
→ エラーがあれば自動修正
→ 再ビルド`}</code></pre>
        </section>

        <section id="advanced-usage">
          <h2>高度な使い方</h2>
          <h3>複数ファイルの一括編集</h3>
          <pre><code>{`「全コンポーネントにエラーバウンダリを追加して」
→ 複数のファイルを自動で編集`}</code></pre>

          <h3>プロジェクト分析</h3>
          <pre><code>{`「このプロジェクトの構造を説明して」
「認証機能はどこに実装されている？」
「パフォーマンスの問題点を指摘して」`}</code></pre>

          <h3>Git操作</h3>
          <pre><code>{`「変更をコミットして」
「feature/loginブランチを作成して」
「mainブランチにマージして」`}</code></pre>

          <h3>テスト駆動開発</h3>
          <pre><code>{`「まずテストを書いて、それからテストが通る実装を作って」`}</code></pre>

          <h3>設定ファイル（.claude）</h3>
          <p>プロジェクトルートに<code>.claude</code>フォルダを作成し、設定を追加できます。</p>
          <pre><code>{`# .claude/settings.json
{
  "model": "claude-3-5-sonnet-20241022",
  "autoApprove": ["read", "write"],
  "ignore": ["node_modules", ".git", "dist"]
}`}</code></pre>
        </section>

        <section id="pricing">
          <h2>料金</h2>
          <p>Claude Codeを使用するには、Anthropicのサブスクリプションが必要です。</p>
          <table>
            <thead>
              <tr>
                <th>プラン</th>
                <th>料金</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Claude Pro</td>
                <td>$20/月</td>
                <td>Claude Codeが使用可能、使用量制限あり</td>
              </tr>
              <tr>
                <td>Claude Max</td>
                <td>$100/月</td>
                <td>より多くの使用量、優先アクセス</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>注意</strong>: 無料プランではClaude Codeは使用できません。
          </p>
        </section>

        <section id="vs-cursor">
          <h2>Cursorとの比較</h2>
          <table>
            <thead>
              <tr>
                <th>項目</th>
                <th>Claude Code</th>
                <th>Cursor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>インターフェース</td>
                <td>ターミナル（CLI）</td>
                <td>GUI（エディタ）</td>
              </tr>
              <tr>
                <td>自動化レベル</td>
                <td>高い（ファイル操作、コマンド実行）</td>
                <td>中程度</td>
              </tr>
              <tr>
                <td>学習コスト</td>
                <td>やや高い</td>
                <td>低い</td>
              </tr>
              <tr>
                <td>向いている人</td>
                <td>ターミナル慣れしている人</td>
                <td>初心者、GUI好きな人</td>
              </tr>
              <tr>
                <td>料金</td>
                <td>$20〜$100/月</td>
                <td>無料〜$20/月</td>
              </tr>
            </tbody>
          </table>
          <h3>使い分けのポイント</h3>
          <ul>
            <li><strong>初心者</strong>: まずCursorで始める</li>
            <li><strong>中級者</strong>: 両方使い分ける</li>
            <li><strong>上級者</strong>: Claude Codeをメインに</li>
          </ul>
          <p>
            <strong>おすすめ</strong>: 細かい編集はCursor、大きな変更やプロジェクト構築はClaude Codeという使い分けが効率的です。
          </p>
        </section>

        <section id="best-practices">
          <h2>ベストプラクティス</h2>
          <h3>1. 明確な指示を出す</h3>
          <pre><code>{`❌ 「ログインを作って」
✅ 「Supabase Authを使ってメール/パスワードのログイン機能を実装して。
   エラーハンドリングとローディング状態も含めて。」`}</code></pre>

          <h3>2. 段階的に進める</h3>
          <p>大きな機能は一度に頼まず、段階的に実装します。</p>
          <pre><code>{`1. 「まずログインフォームのUIを作って」
2. 「次にSupabase Authと接続して」
3. 「エラーハンドリングを追加して」
4. 「ローディング状態を追加して」`}</code></pre>

          <h3>3. レビューを怠らない</h3>
          <p>AIが生成したコードは必ず確認してください。特に:</p>
          <ul>
            <li>セキュリティ関連のコード</li>
            <li>データベース操作</li>
            <li>支払い処理</li>
          </ul>

          <h3>4. バージョン管理と併用</h3>
          <pre><code>{`# 作業前にコミット
git commit -m "Before AI changes"

# Claude Codeで作業

# 変更を確認
git diff

# 問題なければコミット
git commit -m "Add login feature via Claude Code"`}</code></pre>

          <h3>5. .claudeignoreを設定</h3>
          <p>機密情報を含むファイルはAIに読ませないようにします。</p>
          <pre><code>{`# .claudeignore
.env
.env.local
secrets/
*.pem
*.key`}</code></pre>
        </section>
      </>
    ),
  },
}
