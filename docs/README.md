# 公式サイト + SEO DBサイト プロジェクト

## プロジェクト概要

非エンジニア向けに「作れて・動いて・売れる」をAIで実現する実践知のデータベースサイト。

### 目的

- **公式サイト**: 信頼・商品導線・リード獲得（成約装置）
- **SEO DBサイト**: 検索流入の蛇口（集客装置）

### リードマグネット

1. **バイブコーディングの教科書** - 作る力
2. **0円マーケティングの教科書** - 売る力

## ドキュメント構成

- [01-site-overview.md](./01-site-overview.md) - サイト全体の設計と構造
- [02-positioning.md](./02-positioning.md) - ポジショニングとタグライン
- [03-content-templates.md](./03-content-templates.md) - 記事テンプレート
- [04-keyword-list.md](./04-keyword-list.md) - キーワードリスト（MVP 60本）
- [05-implementation.md](./05-implementation.md) - Next.js実装設計
- [06-ai-prompts.md](./06-ai-prompts.md) - Cursor/Claude Code用プロンプト
- [07-workflow.md](./07-workflow.md) - 記事生成〜公開までの運用フロー
- [08-seo-strategy.md](./08-seo-strategy.md) - SEO戦略の詳細
- [09-database-schema.md](./09-database-schema.md) - データベーススキーマ設計

## サイト構造

```
/                    # 公式トップ
/about               # プロフィール
/free                # 無料教材
  /vibe-coding-book  # バイブコーディングの教科書
  /zero-marketing-book # 0円マーケティングの教科書
/knowledge/          # SEO用DB群
  /vibe-coding/      # バイブコーディングDB
  /build/            # 実装DB
  /marketing/        # 0円マーケDB
```

## 実装フェーズ

### Phase 1（最初の30日）
- 公式サイト（LP + 無料教材2枚）
- バイブコーディングDB 20本

### Phase 2
- 実装DB追加（10〜20本）
- 内部リンク最適化

### Phase 3
- マーケDB投入
- プログラマティックSEO開始
