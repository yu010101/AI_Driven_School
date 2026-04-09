---
title: "MCP 模擬テスト"
step: 3
totalSteps: 5
expectedCommand: "claude \"MCPサーバーの一覧を見せて\""
acceptableCommands: ["claude 'MCPサーバーの一覧を見せて'", "claude \"/mcp\"", "claude /mcp"]
simulatedOutput: "\n🔌 MCP一覧を表示中...\n\n✅ 正解！MCPサーバーの確認方法です。\n\nMCP認定の重要ポイント:\n• MCP = Model Context Protocol\n• 外部サービスとClaude Codeを接続する仕組み\n• Gmail, Calendar, Slack, freee等と連携可能\n• 設定は .claude/settings.json で管理\n\n📝 公式認定ポイント:\n  MCPはClaude Codeの「手足」を増やす技術。\n  APIキーを登録すれば外部サービスを操作できる"
hint: "MCPサーバーの一覧を確認するコマンドは？"
---

## 🏆 認定模擬テスト ③ — MCP

**問題：Claude Codeで利用可能なMCPサーバー（外部連携）の一覧を確認するコマンドは？**

MCPはClaude Codeの「手足」を増やす技術です。

:::flow{steps="🔌 MCP設定 → 📡 外部API接続 → 🤖 Claudeが操作"}

> Gmail・Slack・freeeなど、あらゆるサービスと連携できます。

---step---

## 回答を入力してください

```
claude "MCPサーバーの一覧を見せて"
```

MCPサーバーの一覧を表示するコマンドを入力してください。
