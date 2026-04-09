---
title: "MCPって何？（Gmail/Calendar/Slack連携）"
step: 1
totalSteps: 5
expectedCommand: "claude \"MCPサーバーの一覧を見せて\""
acceptableCommands: ["claude 'MCPサーバーの一覧を見せて'", "claude \"/mcp\""]
simulatedOutput: "\n🔌 MCP（Model Context Protocol）\n  = Claude Codeを外部ツールとつなぐ仕組み\n\n利用可能なMCPサーバー:\n┌──────────────┬──────────────────┐\n│ サービス      │ できること         │\n├──────────────┼──────────────────┤\n│ Gmail        │ メール読み書き      │\n│ Calendar     │ 予定の取得・追加    │\n│ Slack        │ メッセージ投稿      │\n│ Google Drive │ ファイル操作        │\n│ Notion       │ ページ作成・更新    │\n│ freee        │ 会計データ取得      │\n│ GitHub       │ コード管理          │\n└──────────────┴──────────────────┘\n\n設定済み: なし\n→ 次のレッスンで設定していきます"
hint: "claude \"MCPサーバーの一覧を見せて\" と入力してください"

relatedArticles:
  - title: "MCP入門【Claude Codeの拡張機能】"
    path: "/knowledge/claude-code/mcp-guide"
---

## Claude Codeを外部ツールにつなぐ

MCPは「プラグイン」のようなもの。Gmail、カレンダー、Slack、freeeなど、普段使っているツールをClaude Codeから直接操作できるようになります。

```
claude "MCPサーバーの一覧を見せて"
```

右のターミナルにコピペして Enter を押してください。

## コツ

- **MCP = Model Context Protocol**。難しい名前ですが、要は「接続プラグイン」です
- Level 2まではファイル操作が中心でしたが、MCPがあれば外部サービスと直接やり取りできます
