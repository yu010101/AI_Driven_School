# データベーススキーマ設計

## 概要

初期はMDXファイルで管理し、後期にSupabase（Postgres）に移行する設計。

## スキーマ例：バイブコーディングの「プロンプトDB」

### テーブル設計

```sql
-- articles テーブル（全DB共通）
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('vibe-coding', 'build', 'marketing')),
  content TEXT NOT NULL, -- MDX or HTML
  excerpt TEXT, -- 抜粋（一覧表示用）
  tags TEXT[],
  related_articles UUID[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- インデックス
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at) WHERE status = 'published';

-- prompts テーブル（バイブコーディングDB専用）
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  goal TEXT NOT NULL, -- 何を達成するか
  target TEXT NOT NULL, -- 初心者/非エンジニア/個人開発者
  context_needed TEXT, -- 入力すべき情報
  prompt_template TEXT NOT NULL, -- コピペ用
  example_input TEXT,
  example_output TEXT,
  pitfalls TEXT[], -- 失敗例
  related_tools TEXT[], -- Claude / ChatGPT / Copilot 等
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- features テーブル（実装DB専用）
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  feature_name TEXT NOT NULL, -- ログイン、決済等
  stack TEXT[], -- Next.js, Supabase等
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_time TEXT, -- 実装にかかる時間
  prerequisites TEXT[], -- 前提知識
  steps JSONB, -- 実装ステップ
  test_checklist TEXT[],
  alternatives JSONB, -- 代替案
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- tactics テーブル（マーケDB専用）
CREATE TABLE tactics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tactic_name TEXT NOT NULL,
  platform TEXT, -- X, note, SEO等
  cost TEXT DEFAULT '0円',
  time_required TEXT, -- 必要時間
  target_audience TEXT,
  steps JSONB,
  success_patterns TEXT[],
  failure_patterns TEXT[],
  templates JSONB, -- コピペ用テンプレ
  case_studies UUID[], -- 事例記事への参照
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- internal_links テーブル（内部リンク管理）
CREATE TABLE internal_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  to_article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  anchor_text TEXT NOT NULL,
  link_type TEXT CHECK (link_type IN ('same-category', 'cross-category', 'cta')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(from_article_id, to_article_id)
);

-- seo_metrics テーブル（SEO指標管理）
CREATE TABLE seo_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr NUMERIC(5, 2) DEFAULT 0,
  average_position NUMERIC(5, 2),
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(article_id, keyword, date)
);
```

## リレーション設計

```
articles (1) ──< (N) prompts
articles (1) ──< (N) features
articles (1) ──< (N) tactics
articles (1) ──< (N) internal_links (from)
articles (1) ──< (N) internal_links (to)
articles (1) ──< (N) seo_metrics
```

## クエリ例

### 記事一覧取得（カテゴリ別）

```sql
SELECT 
  a.id,
  a.slug,
  a.title,
  a.description,
  a.excerpt,
  a.tags,
  a.published_at
FROM articles a
WHERE a.category = 'vibe-coding'
  AND a.status = 'published'
ORDER BY a.published_at DESC;
```

### 関連記事取得

```sql
SELECT 
  a.id,
  a.slug,
  a.title,
  a.description
FROM articles a
WHERE a.id = ANY(
  SELECT unnest(related_articles)
  FROM articles
  WHERE slug = 'vibe-coding-what-is'
)
AND a.status = 'published';
```

### 内部リンク自動生成用

```sql
SELECT 
  il.anchor_text,
  a_to.slug,
  a_to.title
FROM internal_links il
JOIN articles a_from ON il.from_article_id = a_from.id
JOIN articles a_to ON il.to_article_id = a_to.id
WHERE a_from.slug = 'vibe-coding-prompts'
  AND a_to.status = 'published'
ORDER BY il.link_type, il.created_at;
```

### SEO指標集計

```sql
SELECT 
  a.slug,
  a.title,
  sm.keyword,
  SUM(sm.impressions) as total_impressions,
  SUM(sm.clicks) as total_clicks,
  AVG(sm.average_position) as avg_position
FROM seo_metrics sm
JOIN articles a ON sm.article_id = a.id
WHERE sm.date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY a.id, a.slug, a.title, sm.keyword
HAVING AVG(sm.average_position) <= 20
ORDER BY total_impressions DESC;
```

## Prismaスキーマ例

```prisma
model Article {
  id              String   @id @default(uuid())
  slug            String   @unique
  title           String
  description     String?
  category        Category
  content         String
  excerpt         String?
  tags            String[]
  relatedArticles Article[] @relation("RelatedArticles")
  status          Status   @default(DRAFT)
  priority        Priority @default(MEDIUM)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  publishedAt     DateTime?
  
  prompts         Prompt[]
  features        Feature[]
  tactics         Tactic[]
  internalLinksFrom InternalLink[] @relation("FromArticle")
  internalLinksTo   InternalLink[] @relation("ToArticle")
  seoMetrics      SeoMetric[]
}

model Prompt {
  id            String   @id @default(uuid())
  articleId     String
  article       Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  title         String
  goal          String
  target        String
  contextNeeded String?
  promptTemplate String
  exampleInput  String?
  exampleOutput String?
  pitfalls      String[]
  relatedTools  String[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Feature {
  id             String   @id @default(uuid())
  articleId      String
  article        Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  featureName    String
  stack          String[]
  difficulty     Difficulty
  estimatedTime  String?
  prerequisites  String[]
  steps          Json
  testChecklist  String[]
  alternatives   Json?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Tactic {
  id              String   @id @default(uuid())
  articleId       String
  article         Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  tacticName      String
  platform        String?
  cost            String   @default("0円")
  timeRequired    String?
  targetAudience  String?
  steps           Json
  successPatterns String[]
  failurePatterns String[]
  templates       Json?
  caseStudies     String[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model InternalLink {
  id            String   @id @default(uuid())
  fromArticleId String
  fromArticle   Article  @relation("FromArticle", fields: [fromArticleId], references: [id], onDelete: Cascade)
  toArticleId   String
  toArticle     Article  @relation("ToArticle", fields: [toArticleId], references: [id], onDelete: Cascade)
  anchorText    String
  linkType      LinkType
  createdAt     DateTime @default(now())
  
  @@unique([fromArticleId, toArticleId])
}

model SeoMetric {
  id              String   @id @default(uuid())
  articleId       String
  article         Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  keyword         String
  impressions     Int      @default(0)
  clicks          Int      @default(0)
  ctr             Float    @default(0)
  averagePosition Float?
  date            DateTime
  createdAt       DateTime @default(now())
  
  @@unique([articleId, keyword, date])
}

enum Category {
  VIBE_CODING
  BUILD
  MARKETING
}

enum Status {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum Priority {
  HIGH
  MEDIUM
  LOW
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

enum LinkType {
  SAME_CATEGORY
  CROSS_CATEGORY
  CTA
}
```

## 移行戦略

### Phase 1: MDX運用

- ファイルベースで管理
- frontmatterでメタデータ管理
- Gitでバージョン管理

### Phase 2: ハイブリッド

- MDXファイルをDBにインポート
- 編集はDB経由
- 静的生成はMDXから

### Phase 3: 完全DB化

- Supabaseで完全管理
- 動的生成 + ISR
- 管理画面で編集可能
