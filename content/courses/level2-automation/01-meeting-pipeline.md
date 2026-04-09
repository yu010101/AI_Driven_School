---
title: "議事録→Slack自動投稿パイプライン"
step: 1
totalSteps: 5
expectedCommand: "claude \"meeting.txtを要約してslack-summary.mdに保存する自動化スクリプトを作って\""
acceptableCommands: ["claude 'meeting.txtを要約してslack-summary.mdに保存する自動化スクリプトを作って'"]
simulatedOutput: "\n🔧 自動化スクリプトを作成中...\n\n✓ summarize-meeting.sh を作成しました\n\n┌─ 仕組み ────────────────────────┐\n│                                  │\n│  meeting.txt                     │\n│      ↓                           │\n│  Claude Code で要約              │\n│      ↓                           │\n│  slack-summary.md に保存         │\n│      ↓                           │\n│  Slack Webhook で自動投稿        │\n│                                  │\n└──────────────────────────────────┘\n\n使い方:\n  $ bash summarize-meeting.sh meeting.txt\n\n✓ 毎回手動でやっていた作業が1コマンドに"
hint: "claude \"meeting.txtを要約してslack-summary.mdに保存する自動化スクリプトを作って\" と入力してください"

relatedArticles:
  - title: "AIで自動化｜繰り返し作業を解決する方法"
    path: "/knowledge/vibe-coding/automation-with-ai"
  - title: "Hooks活用ガイド【自動化トリガー】"
    path: "/knowledge/claude-code/hooks-guide"
---

## コピペからの卒業

Level 1ではコマンドを毎回手打ちしていました。Level 2では「スクリプト」にして、1コマンドで全部終わる仕組みを作ります。

議事録ファイルを渡すだけで、要約からSlack投稿まで全自動。もう手動コピペは不要です。

```
claude "meeting.txtを要約してslack-summary.mdに保存する自動化スクリプトを作って"
```

右のターミナルにコピペして Enter を押してください。

## コツ

- **スクリプト化 = 再利用可能にすること**。一度作れば何度でも同じ品質で回せます
- 会議のたびに `bash summarize-meeting.sh meeting.txt` だけで済む世界を体感してください
