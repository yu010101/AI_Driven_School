# AI Driven School

非エンジニアでも「作れて・動いて・売れる」をAIで実現する実践知のデータベースサイト。

## プロジェクト構成

- **公式サイト**: 信頼・商品導線・リード獲得（成約装置）
- **SEO DBサイト**: 検索流入の蛇口（集客装置）

## 技術スタック

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- MDX (記事管理)
- Playwright (E2Eテスト)

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm run test:e2e
```

## ディレクトリ構造

```
app/                    # Next.js App Router
  ├─ page.tsx         # トップページ
  ├─ about/           # Aboutページ
  ├─ free/            # 無料教材
  └─ knowledge/       # 知識DB
components/            # Reactコンポーネント
content/               # MDX記事ファイル
docs/                  # ドキュメント
tests/                 # Playwrightテスト
```

## ドキュメント

詳細なドキュメントは `/docs` 配下を参照してください。

- [開発ルール](./docs/10-development-rules.md)
- [ビジネスロジック](./docs/11-business-logic.md)
- [テストシナリオ](./docs/12-test-scenarios.md)

## ライセンス

MIT
