---
title: "自社の経営ダッシュボードを作る"
step: 5
totalSteps: 5
expectedCommand: "claude \"freeeの売上データとGSCのアクセスデータを組み合わせた経営ダッシュボードをHTMLで作って\""
acceptableCommands: ["claude 'freeeの売上データとGSCのアクセスデータを組み合わせた経営ダッシュボードをHTMLで作って'"]
simulatedOutput: "\n📊 経営ダッシュボードを構築中...\n\n✓ dashboard.html を作成しました\n\n┌─ ダッシュボード構成 ──────────────┐\n│                                   │\n│  📈 売上推移（freee連携）         │\n│  今月: ¥5,100,000 (+34% MoM)     │\n│  [グラフ: 6ヶ月トレンド]          │\n│                                   │\n│  🌐 Webアクセス（GSC連携）        │\n│  PV: 12,400 / セッション: 8,200   │\n│  [グラフ: 流入チャネル別]         │\n│                                   │\n│  👥 顧客（CSV連携）               │\n│  アクティブ: 12社 / 休眠: 5社     │\n│                                   │\n│  📋 今週のTODO                    │\n│  残: 8件 / 完了: 15件             │\n│                                   │\n└───────────────────────────────────┘\n\n✓ ブラウザで dashboard.html を開いてください\n\n🎉 全レベル完了！あなたは黒帯です"
hint: "claude \"freeeの売上データとGSCのアクセスデータを組み合わせた経営ダッシュボードをHTMLで作って\" と入力してください"

relatedArticles:
  - title: "アナリティクス活用ガイド"
    path: "/knowledge/marketing/analytics-guide"
  - title: "MCP入門【Claude Codeの拡張機能】"
    path: "/knowledge/claude-code/mcp-guide"
---

## 自分だけの経営ダッシュボード

売上、アクセス数、顧客数、TODO。バラバラだったデータを1画面に集約します。これがClaude Codeで作るDXの最終形です。

```
claude "freeeの売上データとGSCのアクセスデータを組み合わせた経営ダッシュボードをHTMLで作って"
```

右のターミナルにコピペして Enter を押してください。

## コツ

- **HTMLファイル1枚で完結する**ので、サーバー不要。ブラウザで開くだけで見られます
- Level 1からここまで来たあなたは、月額30万円のDXコンサルと同じことを自力でやっています
