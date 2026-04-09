---
title: "CLAUDE.mdを書く（会社の説明書）"
step: 2
totalSteps: 3
expectedCommand: "claude \"CLAUDE.mdを作って。うちは従業員5名のWeb制作会社です\""
acceptableCommands: ["claude 'CLAUDE.mdを作って。うちは従業員5名のWeb制作会社です'"]
simulatedOutput: "\n📝 CLAUDE.md を作成しています...\n\n┌─ CLAUDE.md ─────────────────────────────┐\n│                                         │\n│ # 会社概要                               │\n│ - 業種: Web制作                          │\n│ - 従業員: 5名                            │\n│ - 文体: ビジネス敬語                      │\n│                                         │\n│ # よく使うツール                          │\n│ - Slack（社内連絡）                       │\n│ - Google Workspace（メール・ドキュメント）  │\n│ - freee（経理）                           │\n│                                         │\n│ # 注意事項                               │\n│ - 顧客名は伏せる                          │\n│ - 社外秘情報は出力しない                   │\n│                                         │\n└─────────────────────────────────────────┘\n\n✓ CLAUDE.md を作成しました\n  これ以降、Claude Codeはあなたの会社を理解した上で回答します"
hint: "claude \"CLAUDE.mdを作って。うちは従業員5名のWeb制作会社です\" と入力してください"

relatedArticles:
  - title: "CLAUDE.mdの書き方完全ガイド"
    path: "/knowledge/claude-code/claude-md-guide"
quiz:
  - question: "CLAUDE.mdの主な役割は？"
    choices: ["APIキーの保存", "インストール設定", "AIにプロジェクトの文脈を伝える説明書", "ログの出力先"]
    answer: 2
  - question: "CLAUDE.mdを作ると何が変わりますか？"
    choices: ["動作速度が上がる", "毎回会社の説明をしなくて済む", "料金が安くなる", "他のIDEでも使える"]
    answer: 1
---

## CLAUDE.mdとは？

**あなたの会社の説明書**です。一度作るだけで、Claude Codeが「あなたの会社を理解した状態」で動いてくれます。

毎回「うちは5人の会社で...」と説明する必要がなくなります。

:::before-after{before="毎回説明が必要" after="何も言わなくてOK"}

---step---

## やってみよう

```
claude "CLAUDE.mdを作って。うちは従業員5名のWeb制作会社です"
```

**コツ**
- 「Web制作会社」の部分をあなたの業種に変えてください
- 業種・サービス・よく使うツールを追加すると精度が上がります

右のターミナルにコピペして Enter を押してください。
