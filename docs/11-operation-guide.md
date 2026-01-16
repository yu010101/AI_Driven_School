# 運用セットアップガイド

サイト公開後に必要な設定をまとめます。

## 1. Google Search Console

### 設定手順

1. [Google Search Console](https://search.google.com/search-console/)にアクセス
2. 「プロパティを追加」
3. URLプレフィックスで `https://ai-driven-school.vercel.app` を入力
4. HTML タグ認証（推奨）:
   - metaタグをコピー
   - `app/layout.tsx` の `<head>` に追加

```tsx
// app/layout.tsx
export const metadata = {
  // ...
  verification: {
    google: 'ここに認証コード',
  },
}
```

5. サイトマップを送信: `/sitemap.xml`

### 確認事項

- [ ] 所有権の確認完了
- [ ] サイトマップ送信
- [ ] インデックス登録リクエスト（トップページ）

---

## 2. Google Analytics 4

### 設定手順

1. [Google Analytics](https://analytics.google.com/)にアクセス
2. プロパティを作成
3. 測定IDをコピー（G-XXXXXXXX）
4. 環境変数に追加:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
```

5. コードを追加:

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 確認事項

- [ ] GA4プロパティ作成
- [ ] 測定ID設定
- [ ] リアルタイムでアクセス確認

---

## 3. SNSアカウント

### 必要なアカウント

| プラットフォーム | 目的 |
|-----------------|------|
| X（Twitter） | メイン発信 |
| note | 長文コンテンツ |
| GitHub | 技術信頼性 |

### X運用ルール

- 1日1投稿以上
- 開発日記、Tips、記事シェア
- ハッシュタグ: #バイブコーディング #個人開発 #AIアプリ

### 投稿テンプレート

```
【新着記事】
[タイトル]

[概要]

詳しくはこちら👇
[URL]

#バイブコーディング #AI駆動塾
```

---

## 4. 定期タスク

### 毎日

- [ ] SNS投稿（1日1回以上）
- [ ] コメント・DM対応

### 毎週

- [ ] Search Console確認
- [ ] GA4アクセス確認
- [ ] 記事1本公開

### 毎月

- [ ] KPI確認
- [ ] コンテンツ計画更新
- [ ] 競合分析

---

## 5. KPI目標

| 指標 | 1ヶ月後 | 3ヶ月後 | 6ヶ月後 |
|------|---------|---------|---------|
| 記事数 | 30 | 50 | 80 |
| 月間PV | 1,000 | 5,000 | 15,000 |
| インデックス数 | 30 | 50 | 100 |
| Xフォロワー | 100 | 300 | 1,000 |

---

## 6. トラブルシューティング

### インデックスされない

1. robots.txtを確認（ブロックされていないか）
2. サイトマップを再送信
3. URL検査でクロールリクエスト

### アクセスが増えない

1. キーワードの見直し
2. タイトル改善
3. SNS流入を増やす

### エラーが出る

1. Vercelのログを確認
2. 環境変数を確認
3. ビルドエラーを修正

---

## 7. 便利なリンク

- [Google Search Console](https://search.google.com/search-console/)
- [Google Analytics](https://analytics.google.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools)（無料）
