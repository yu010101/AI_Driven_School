---
title: "Hooks — 自動化トリガーを仕掛ける"
step: 1
totalSteps: 4
expectedCommand: "claude \"ファイル保存時に自動でESLintを実行するHookを設定して\""
acceptableCommands: ["claude 'ファイル保存時に自動でESLintを実行するHookを設定して'"]
simulatedOutput: "📁 .claude/settings.json を更新します...\n\n{\n  \"hooks\": {\n    \"after_edit\": [\n      {\n        \"command\": \"eslint --fix $FILE\",\n        \"description\": \"ファイル編集後に自動lint\"\n      }\n    ]\n  }\n}\n\n✓ Hook設定完了。ファイル編集のたびにESLintが自動実行されます\n\n📝 公式認定ポイント:\n  Hooksは Courseraの3つ目のモジュール全体で扱われる重要トピック\n  pre_tool / post_tool / notification の3種類を覚えよう"
hint: "claude \"ファイル保存時に自動でESLintを実行するHookを設定して\" と入力してください"
---

## Hooks — Claude Codeの「自動トリガー」

Hooks = ファイル編集・コミット・ツール実行のタイミングで**自動処理を挟む仕組み**。

:::before-after{before="毎回手動でlint実行" after="編集するたび自動lint"}

公式認定では Hooks はモジュール全体で扱われる重要トピック。3種類のHookタイプを理解しておこう。

---step---

## Hookを設定してみよう

Hookには3つのタイプがある：

- **pre_tool** — ツール実行の前に処理を挟む
- **post_tool** — ツール実行の後に処理を挟む
- **notification** — 特定イベントで通知を送る

```
claude "ファイル保存時に自動でESLintを実行するHookを設定して"
```

右のターミナルにコピペして Enter を押してください。
