---
title: "GitHub Actions — PRの自動レビュー"
step: 1
totalSteps: 4
expectedCommand: "claude \"GitHub ActionsでPRが作られたら自動コードレビューするワークフローを作って\""
acceptableCommands: ["claude 'GitHub ActionsでPRが作られたら自動コードレビューするワークフローを作って'"]
simulatedOutput: "📁 .github/workflows/claude-review.yml を作成します...\n\nname: Claude Code Review\non:\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Claude Review\n        run: claude review --pr ${{ github.event.number }}\n        env:\n          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}\n\n✓ .github/workflows/claude-review.yml を作成しました\nPRが作られるたびにClaude Codeが自動レビューします"
hint: "claude \"GitHub ActionsでPRが作られたら自動コードレビューするワークフローを作って\" と入力してください"
---

## GitHub Actions — PRの自動レビュー

GitHub Actions = コードの変更を**自動チェックする仕組み**。PRが作られるたびにClaude Codeがレビューしてくれる。

:::flow{steps="📝 PR作成 → 🤖 Claude自動レビュー → ✅ コメント投稿"}

公式認定ポイント：CI/CD連携は実務で最も使われるパターン。自動レビューで品質を担保しよう。

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
