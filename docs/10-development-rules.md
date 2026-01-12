# 開発ルール

## コーディング規約

### TypeScript

- **strictモード**: 有効
- **型定義**: 必須（any禁止）
- **命名規則**:
  - コンポーネント: PascalCase (`ArticleCard.tsx`)
  - 関数・変数: camelCase (`getArticle`, `articleList`)
  - 定数: UPPER_SNAKE_CASE (`MAX_ARTICLES`)
  - ファイル名: kebab-case (`article-card.tsx`)

### React/Next.js

- **関数コンポーネント**: 必須（クラスコンポーネント禁止）
- **Server Components**: デフォルトで使用
- **Client Components**: `'use client'` ディレクティブ必須
- **Props型定義**: interface使用

```typescript
interface ArticleCardProps {
  title: string;
  description: string;
  slug: string;
  category: Category;
}
```

### スタイリング

- **Tailwind CSS**: 必須（インラインスタイル禁止）
- **クラス名**: 意味のある命名
- **レスポンシブ**: mobile-first

### ファイル構造

```
components/
  ├─ ui/              # 汎用UIコンポーネント
  ├─ layout/          # レイアウトコンポーネント
  └─ features/         # 機能別コンポーネント
    ├─ article/
    └─ cta/
```

## エラーハンドリング

### 原則

- **エラー境界**: 必須（ErrorBoundary使用）
- **404ページ**: カスタム404実装
- **500ページ**: カスタム500実装
- **ログ**: 本番環境ではエラーのみ記録

### エラーパターン

```typescript
// 記事が見つからない場合
if (!article) {
  notFound();
}

// APIエラー
try {
  const data = await fetchData();
} catch (error) {
  console.error('Failed to fetch:', error);
  throw new Error('データの取得に失敗しました');
}
```

## パフォーマンス

### 必須最適化

- **画像**: `next/image` 必須
- **フォント**: `next/font` 使用
- **動的インポート**: 大きなコンポーネントは`dynamic`使用
- **メタデータ**: 全ページで設定

### 禁止事項

- ❌ `useEffect`での不要な再レンダリング
- ❌ 大きなバンドルサイズ（300KB超）
- ❌ 同期的な重い処理

## セキュリティ

### 必須対策

- **環境変数**: 機密情報は`.env.local`で管理
- **XSS対策**: サニタイズ必須（MDX処理時）
- **CSRF**: Next.jsのデフォルト対策を活用
- **CSP**: Content Security Policy設定

## テスト

### テスト方針

- **E2Eテスト**: Playwright（必須）
- **ユニットテスト**: ビジネスロジックのみ
- **カバレッジ**: 80%以上

### テストファイル構造

```
tests/
  ├─ e2e/
  │   ├─ home.spec.ts
  │   ├─ article.spec.ts
  │   └─ cta.spec.ts
  └─ unit/
      └─ business-logic.test.ts
```

## Git運用

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能追加
- `fix/*`: バグ修正

### コミットメッセージ

```
feat: 記事一覧ページ追加
fix: CTAの表示バグ修正
docs: 開発ルール追加
refactor: コンポーネント分割
```

## コードレビュー

### チェックリスト

- [ ] TypeScriptエラーなし
- [ ] ビジネスロジックに準拠
- [ ] テストが通る
- [ ] パフォーマンス問題なし
- [ ] セキュリティ問題なし
- [ ] アクセシビリティ対応
