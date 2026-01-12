# Next.js実装設計

## ディレクトリ構造

```
app/
 ├─ page.tsx                # トップ
 ├─ layout.tsx              # ルートレイアウト
 ├─ about/
 │   └─ page.tsx
 ├─ free/
 │   ├─ page.tsx            # 無料教材一覧
 │   ├─ vibe-coding-book/
 │   │   └─ page.tsx        # バイブコーディングの教科書LP
 │   └─ zero-marketing-book/
 │       └─ page.tsx        # 0円マーケティングの教科書LP
 ├─ knowledge/
 │   ├─ page.tsx            # DB一覧
 │   ├─ vibe-coding/
 │   │   ├─ page.tsx        # バイブコーディングDB一覧
 │   │   └─ [slug]/
 │   │       └─ page.tsx    # 記事詳細
 │   ├─ build/
 │   │   ├─ page.tsx        # 実装DB一覧
 │   │   └─ [slug]/
 │   │       └─ page.tsx
 │   └─ marketing/
 │       ├─ page.tsx        # マーケDB一覧
 │       └─ [slug]/
 │           └─ page.tsx
 ├─ sitemap.ts              # サイトマップ自動生成
 └─ robots.ts               # robots.txt

content/                    # MDX記事ファイル
 ├─ vibe-coding/
 │   ├─ what-is-vibe-coding.mdx
 │   └─ ...
 ├─ build/
 └─ marketing/

lib/
 ├─ mdx.ts                  # MDX処理
 └─ seo.ts                  # SEO関連ユーティリティ
```

## 技術スタック

### 必須

- **Next.js 14+** (App Router)
- **TypeScript**
- **MDX** (記事管理)
- **Tailwind CSS** (スタイリング)

### オプション（後期）

- **Supabase** (Postgres) - DB化時
- **Prisma** - ORM
- **Contentlayer** or **next-mdx-remote** - MDX処理

## 実装の重要ポイント

### 1. 動的ルーティング

```typescript
// app/knowledge/[category]/[slug]/page.tsx
export async function generateStaticParams() {
  // 全記事のslugを取得
  const articles = await getAllArticles();
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}
```

### 2. SEO最適化

```typescript
// metadata生成
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
    },
  };
}
```

### 3. サイトマップ自動生成

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const articles = await getAllArticles();
  
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
    },
    ...articles.map((article) => ({
      url: `https://example.com/knowledge/${article.category}/${article.slug}`,
      lastModified: article.updatedAt,
    })),
  ];
}
```

### 4. robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

### 5. 内部リンク自動生成

記事のfrontmatterに`relatedArticles`を設定し、自動でリンクを生成。

```typescript
// 記事コンポーネント内
{article.relatedArticles && (
  <RelatedArticles articles={article.relatedArticles} />
)}
```

## コンテンツ管理（初期）

### MDXファイル例

```mdx
---
title: バイブコーディングとは
description: 非エンジニアでもAIでアプリを作る方法
category: vibe-coding
tags: [バイブコーディング, AI, 初心者]
relatedArticles:
  - slug: vibe-coding-prompts
    anchor: プロンプト集
  - slug: build-auth
    anchor: ログイン機能の実装
---

# 結論（30秒要約）

...
```

## 後期のDB化（Supabase移行）

### スキーマ例

```sql
-- articles テーブル
CREATE TABLE articles (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- vibe-coding, build, marketing
  content TEXT NOT NULL, -- MDX or HTML
  tags TEXT[],
  related_articles UUID[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_slug ON articles(slug);
```

## デプロイ

- **Vercel** 推奨（Next.jsとの相性が良い）
- 環境変数でDB接続情報を管理
- プレビューデプロイで品質確認

## パフォーマンス最適化

- 画像最適化（next/image）
- 静的生成（generateStaticParams）
- インクリメンタル静的再生成（ISR）
- フォント最適化（next/font）
