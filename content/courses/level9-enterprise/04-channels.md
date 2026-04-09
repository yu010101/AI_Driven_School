---
title: "Channels & Remote — どこからでもAIを使う"
step: 4
totalSteps: 4
expectedCommand: "claude \"Slackからのメッセージを受け取るChannelを設定して\""
acceptableCommands: ["claude 'Slackからのメッセージを受け取るChannelを設定して'"]
simulatedOutput: "📡 Channel設定\n\n✓ Slack Channel を作成しました\n\n┌─ 仕組み ────────────────────────┐\n│                                  │\n│ Slack #ai-tasks にメッセージ     │\n│      ↓                           │\n│ Claude Codeセッションに転送      │\n│      ↓                           │\n│ AIが処理して結果を返信           │\n│                                  │\n│ + Remote Control                 │\n│   スマホからセッション操作可能   │\n│                                  │\n└──────────────────────────────────┘\n\n📝 公式認定ポイント:\n• Channels: 外部イベントをセッションに流す\n• Remote Control: ローカルセッションを外出先から操作\n• Dispatch: スマホからタスクを投げる\n\n🏛️ Level 9 完了！エンタープライズ運用をマスター"
hint: "claude \"Slackからのメッセージを受け取るChannelを設定して\" と入力してください"
---

## Channels & Remote — どこからでもAIを使う

Channels = **外部からClaude Codeにイベントを流す仕組み**。Slack・Discord・Webhookなど多様な入口に対応。

:::flow{steps="💬 Slack/Discord/Webhook → 📡 Channel → 🤖 Claude Code処理 → 📤 結果返信"}

公式認定ポイント：Channels + Remote Controlで場所を問わないAI活用を実現。

---step---

## Channelを設定しよう

押さえるべき3つの公式認定キーワード：

- **Channels** — 外部イベント（Slack投稿など）をClaude Codeセッションに転送
- **Remote Control** — ローカルで動くセッションを外出先のスマホから操作
- **Dispatch** — スマホやブラウザからタスクを投げて結果を受け取る

```
claude "Slackからのメッセージを受け取るChannelを設定して"
```

右のターミナルにコピペして Enter を押してください。
