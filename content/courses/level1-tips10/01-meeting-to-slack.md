---
title: "議事録 → 要約 → Slackに投げる"
step: 1
totalSteps: 10
expectedCommand: "claude \"meeting.txtを読んで、決定事項・TODO・次回予定の3点で要約して。Slack投稿用のフォーマットで\""
acceptableCommands: ["claude 'meeting.txtを読んで、決定事項・TODO・次回予定の3点で要約して。Slack投稿用のフォーマットで'"]
simulatedOutput: "\n📄 meeting.txt を読み込み中...\n（3,240文字の議事録を解析）\n\n📋 *【MTG要約】マーケティング定例 4/3*\n\n*🔵 決定事項*\n• Q2リード目標を月500件に上方修正\n• LinkedIn広告予算 +30万で承認\n• 新LP「AI活用事例」4月末リリース\n\n*🟡 TODO*\n• @田中 LP用コピー初稿 → 4/7（月）\n• @鈴木 LinkedIn広告クリエイティブ → 4/10（木）\n• @山田 メルマガA/Bテスト結果共有 → 4/5（土）\n\n*📅 次回*\n• 4/10（木）14:00〜 同メンバー\n\n✓ slack_post.md に保存しました\n  → そのままSlackにコピペできます"
hint: "claude \"meeting.txtを読んで、決定事項・TODO・次回予定の3点で要約して。Slack投稿用のフォーマットで\" と入力してください"
relatedArticles:
  - title: "AIで自動化｜繰り返し作業を解決する方法"
    path: "/knowledge/vibe-coding/automation-with-ai"
quiz:
  - question: "Claude Codeで出力形式を指定するとどうなりますか？"
    choices: ["エラーになる", "処理速度が上がる", "指定した形式で整形された出力が得られる", "料金が安くなる"]
    answer: 2
  - question: "議事録要約のコツとして正しいのは？"
    choices: ["できるだけ長い指示を出す", "要約の軸（決定事項・TODO等）を指定する", "英語で指示する", "ファイル名は省略する"]
    answer: 1
---

## 毎週30分の手作業が、10秒になる

会議のたびに「誰か議事録まとめて」で止まっていませんか？

:::before-after{before="手作業で要約 30分" after="AI自動要約 10秒"}

:::flow{steps="📄 議事録テキスト → 🤖 Claude Codeで要約 → 💬 Slackにコピペ"}

---step---

## コマンドはこれだけ

```
claude "meeting.txtを読んで、決定事項・TODO・次回予定の3点で要約して。Slack投稿用のフォーマットで"
```

## コツ

- **「Slack投稿用」** と指定すると太字やリスト形式で整えてくれる
- 要約の軸（決定事項・TODO・次回予定）を決めると毎回同じ品質になる

右のターミナルにコピペして Enter を押してください。
