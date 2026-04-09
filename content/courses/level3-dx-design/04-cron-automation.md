---
title: "定期実行（cron）で完全自動化"
step: 4
totalSteps: 5
expectedCommand: "claude \"毎朝8時にカレンダーのブリーフィングをSlackに投稿するcron設定を作って\""
acceptableCommands: ["claude '毎朝8時にカレンダーのブリーフィングをSlackに投稿するcron設定を作って'"]
simulatedOutput: "\n⏰ cron自動化を設定中...\n\n✓ 作成したファイル:\n  - morning-briefing.sh（実行スクリプト）\n  - crontab設定\n\n┌─ 動作フロー ─────────────────────┐\n│                                   │\n│  毎朝 8:00（自動起動）            │\n│      ↓                            │\n│  Googleカレンダーから今日の予定取得│\n│      ↓                            │\n│  Claude Codeでブリーフィング作成  │\n│      ↓                            │\n│  Slackの #general に自動投稿      │\n│                                   │\n│  あなたは何もしなくていい          │\n│                                   │\n└───────────────────────────────────┘\n\ncrontab:\n  0 8 * * 1-5 bash morning-briefing.sh\n  （平日の毎朝8時に実行）\n\n✓ 設定完了。明日の朝から自動で届きます"
hint: "claude \"毎朝8時にカレンダーのブリーフィングをSlackに投稿するcron設定を作って\" と入力してください"

relatedArticles:
  - title: "Hooks活用ガイド【自動化トリガー】"
    path: "/knowledge/claude-code/hooks-guide"
  - title: "カスタムコマンドの作り方"
    path: "/knowledge/claude-code/custom-commands"
---

## 寝ている間にAIが働く

cronは「タイマー」です。一度設定すれば、毎朝決まった時刻にスクリプトが自動実行されます。あなたが何もしなくても、Slackにブリーフィングが届きます。

```
claude "毎朝8時にカレンダーのブリーフィングをSlackに投稿するcron設定を作って"
```

右のターミナルにコピペして Enter を押してください。

## コツ

- **`0 8 * * 1-5` は「平日の毎朝8時」という意味**。cronの書式はAIに任せればOKです
- 日報の自動作成、週次レポートの集計など、定期業務は全てcron化できます
