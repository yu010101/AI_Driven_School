---
title: "SKILL.mdの互換性"
step: 2
totalSteps: 3
expectedCommand: "claude \"うちのCFOスキルがAntigravityでも動くか検証して\""
acceptableCommands:
  - "claude 'うちのCFOスキルがAntigravityでも動くか検証して'"
simulatedOutput: |

  🔍 CFOスキル互換性チェック中...

  .claude/skills/cfo/SKILL.md を解析:

  ✅ メタデータ（name, description）: 互換
  ✅ トリガー定義: 互換
  ✅ ステップ手順: 互換
  ✅ 出力フォーマット: 互換
  ⚠️ MCP連携（freee API）: IDE側の設定が必要

  結果: Antigravity / Cursor / Gemini CLIで
  そのまま動作します。

  MCP連携部分は各IDEの設定画面から
  同じAPIキーを登録すればOKです。

  ✓ compatibility-report.md に保存しました
hint: "claude \"うちのCFOスキルがAntigravityでも動くか検証して\" と入力してください"
---

## 作ったスキルはどこでも動く

Level 4-5で作ったSKILL.mdファイル。これはClaude Code専用ではありません。**どのAI IDEでもそのまま動きます**。スキルのロジック自体がポータブルだからです。

:::flow{steps="SKILL.md作成 → Claude Code / Antigravity / Cursor → 同じ結果"}

---step---

## MCP連携だけはIDE側の設定が必要

スキルのロジック（SKILL.md）は完全互換です。ただし、freee APIやSlack APIなどの**MCP連携部分**は、各IDEの設定画面でAPIキーを登録する必要があります。一度設定すればOKです。

```
claude "うちのCFOスキルがAntigravityでも動くか検証して"
```

右のターミナルにコピペして Enter を押してください。
