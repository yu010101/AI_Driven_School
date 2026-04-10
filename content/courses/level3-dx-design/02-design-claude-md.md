---
title: "自社用のCLAUDE.mdを本格設計する"
step: 2
totalSteps: 5
expectedCommand: "claude \"うちのCLAUDE.mdを本格的に設計して。業種はWeb制作、freeeで経理、Slackで連絡\""
acceptableCommands: ["claude 'うちのCLAUDE.mdを本格的に設計して。業種はWeb制作、freeeで経理、Slackで連絡'"]
simulatedOutput: "\n📋 CLAUDE.md を本格設計中...\n\n✓ 以下の構成で作成しました:\n\n┌─ CLAUDE.md（全体構成）──────────┐\n│                                  │\n│ # 会社概要                       │\n│   業種・規模・サービス内容        │\n│                                  │\n│ # チームメンバー                  │\n│   名前・役割・担当領域            │\n│                                  │\n│ # 使用ツール                     │\n│   freee / Slack / Google系       │\n│                                  │\n│ # 業務ルール                     │\n│   見積もり作法 / 納期ルール       │\n│                                  │\n│ # よくある指示テンプレート        │\n│   「日報」「議事録」「請求書」    │\n│                                  │\n│ # セキュリティポリシー            │\n│   顧客名の扱い / 機密情報        │\n│                                  │\n└──────────────────────────────────┘\n\n✓ CLAUDE.md を保存しました（285行）"
hint: "claude \"うちのCLAUDE.mdを本格的に設計して。業種はWeb制作、freeeで経理、Slackで連絡\" と入力してください"

relatedArticles:
  - title: "CLAUDE.mdの書き方完全ガイド"
    path: "/knowledge/claude-code/claude-md-guide"
  - title: "パフォーマンス最適化Tips"
    path: "/knowledge/claude-code/performance-tips"
---

## 会社のことを全部知っているAIを作る

CLAUDE.mdを本格設計すると、AIが「新入社員に3ヶ月かけて教える情報」を最初から知っている状態になります。業種、ツール、ルールを伝えるだけで設計してくれます。

```
claude "うちのCLAUDE.mdを本格的に設計して。業種はWeb制作、freeeで経理、Slackで連絡"
```

右のターミナルにコピペして Enter を押してください。

## 効果的なCLAUDE.mdの書き方

- **肯定形で書く**: 「CSSは使わない」ではなく「Tailwind CSSを使用する」と書く。否定形は解釈の幅が広すぎる
- **具体的に書く**: 「きれいなコードを書く」ではなく「関数は20行以内、変数名はキャメルケース」
- **優先順位をつける**: 最も重要なルールを先頭に。AIは上にあるルールを重視する傾向がある

## コツ

- **業種と使用ツールを伝えるだけで、AIが最適な構成を提案してくれます**
- セキュリティポリシー欄を作っておくと、顧客名や機密情報の扱いミスを防げます
