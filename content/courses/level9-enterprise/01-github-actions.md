---
title: "GitHub Actions — PRの自動レビュー"
step: 1
totalSteps: 4
expectedCommand: "claude \"GitHub ActionsでPRが作られたら自動コードレビューするワークフローを作って\""
acceptableCommands: ["claude 'GitHub ActionsでPRが作られたら自動コードレビューするワークフローを作って'"]
simulatedOutput: "📁 .github/workflows/claude-review.yml を作成します...\n\nname: Claude Code Review\non:\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Claude Review\n        run: claude review --pr ${{ github.event.number }}\n        env:\n          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}\n\n✓ .github/workflows/claude-review.yml を作成しました\nPRが作られるたびにClaude Codeが自動レビューします"
hint: "claude \"GitHub ActionsでPRが作られたら自動コードレビューするワークフローを作って\" と入力してください"
relatedArticles:
  - title: "CI/CD統合ガイド"
    path: "/knowledge/claude-code/ci-cd-integration"
---

> **前提知識**: Level 0-3完了。GitHubアカウントがあること。チームでの導入を検討している方向け。

## GitHub Actions — PRの自動レビュー

GitHub Actions = コードの変更を**自動チェックする仕組み**。PRが作られるたびにClaude Codeがレビューしてくれる。

:::flow{steps="📝 PR作成 → 🤖 Claude自動レビュー → ✅ コメント投稿"}

公式認定ポイント：CI/CD連携は実務で最も使われるパターン。自動レビューで品質を担保しよう。

### 完全なワークフローYAML

実際のプロダクション環境で使えるワークフローの全体像を見てみよう。

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  claude-review:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 差分比較のため全履歴を取得

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Code Review
        run: |
          claude review \
            --pr ${{ github.event.number }} \
            --output github-comment
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          CLAUDE_PROJECT_DIR: ${{ github.workspace }}
```

### 環境変数の設定手順

APIキーはGitHub Secretsで安全に管理する。**絶対にYAMLファイルに直書きしない。**

1. リポジトリの **Settings → Secrets and variables → Actions** を開く
2. **New repository secret** をクリック
3. Name: `ANTHROPIC_API_KEY`、Value: `sk-ant-...` を入力
4. **Add secret** で保存

Organization全体で共有する場合は **Organization secrets** を使う。チームごとにアクセス制御が可能。

### PRコメントの出力例

Claude Codeがレビューすると、PRに以下のようなコメントが自動投稿される：

```
## 🤖 Claude Code Review

### セキュリティ
⚠️ `api/users.ts:42` — ユーザー入力がサニタイズされていません。
SQLインジェクションのリスクがあります。

### パフォーマンス
💡 `lib/data.ts:18` — N+1クエリが発生しています。
バッチ取得への変更を推奨します。

### コード品質
✅ 命名規則・型安全性は良好です。
```

### CLAUDE.mdでレビュールールをカスタマイズ

プロジェクトルートに `CLAUDE.md` を置くことで、レビュー基準をチーム独自にカスタマイズできる。

```markdown
# コードレビューポリシー

## 必ずチェックする項目
- SQL文にはプレースホルダーを使っているか
- 認証・認可チェックが全エンドポイントにあるか
- エラーハンドリングでスタックトレースがユーザーに露出しないか
- 新しいAPIエンドポイントにはバリデーションがあるか
- console.logが本番コードに残っていないか

## コーディング規約
- 関数は50行以内に収める
- 型定義にanyを使わない（unknown → type guardで絞り込む）
- 非同期処理にはasync/awaitを使う（.then()チェーン禁止）
```

### コスト試算

Claude Code APIの利用コストを事前に把握しておくことが重要。

| PR規模 | 差分行数 | 推定コスト | 月100PR時 |
|---------|----------|-----------|----------|
| 小規模  | ~100行   | ~$0.05    | ~$5      |
| 中規模  | ~500行   | ~$0.15    | ~$15     |
| 大規模  | ~2000行  | ~$0.50    | ~$50     |

チーム10人で月間200PRとすると、**月額$10〜$100程度**。人間レビューの工数削減と比較すれば十分にペイする。

### 注意点

- **レート制限**：短時間に大量のPRが作られるとAPIレート制限に達する可能性がある。`concurrency` グループで同時実行数を制限しよう
- **プライベートコード**：コードがAnthropicのAPIに送信される。機密性の高いリポジトリではZDR（Zero Data Retention）設定を検討
- **過信禁止**：AIレビューは人間レビューの補完であり、代替ではない。最終判断は必ず人間が行う
- **差分サイズ**：巨大なPR（3000行超）はコンテキストウィンドウに収まらない場合がある。PRは小さく保つ運用を推奨

### 実務での活用例

**ケース1：スタートアップ（5人チーム）**
- 全PRにClaude自動レビューを適用。人間レビューは1名のみに削減。
- レビュー待ち時間が平均4時間→15分に短縮。

**ケース2：大企業（50人チーム）**
- セキュリティ関連ファイル（`auth/`, `api/`）のみClaude自動レビューを適用。
- `paths` フィルターで対象ディレクトリを限定し、コストを最適化。

**ケース3：オープンソースプロジェクト**
- 外部コントリビューターのPRに一次レビューとして適用。
- メンテナーの負担を大幅に軽減。

---step---

## ワークフローを作成しよう

YAMLファイルの基本構造：

- **on: pull_request** — PRイベントでトリガー
- **jobs** — 実行するジョブを定義
- **steps** — チェックアウト → Claude実行の流れ
- **secrets** — APIキーは環境変数で安全に管理

```
claude "GitHub ActionsでPRが作られたら自動コードレビューするワークフローを作って"
```

右のターミナルにコピペして Enter を押してください。
