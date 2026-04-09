---
title: "Slack Bot化"
step: 7
totalSteps: 7
expectedCommand: "claude \"OpenClawをSlack Botにして、#generalで/ceoと打ったらダッシュボードが返ってくるようにして\""
acceptableCommands:
  - "claude \"OpenClawをSlack Botにして、#generalで/ceoと打ったらダッシュボードが返ってくるようにして\""
simulatedOutput: |
  # Slack Bot を設定します

  ## 1. Slack App作成
  - App名: OpenClaw Bot
  - Slash Command: `/ceo`
  - Bot Token Scope: `chat:write`, `commands`

  ## 2. Webhookサーバー
  `slack-bot/server.js` を作成中...

  ```javascript
  const express = require('express');
  const app = express();

  app.post('/slack/commands', async (req, res) => {
    const { command } = req.body;

    if (command === '/ceo') {
      // CEOダッシュボードを生成
      const dashboard = await generateDashboard();
      res.json({
        response_type: 'in_channel',
        text: dashboard
      });
    }
  });

  app.listen(3000);
  ```

  ## 3. Slash Command登録
  - Command: `/ceo`
  - Request URL: `https://your-server.com/slack/commands`
  - Description: OpenClaw CEOダッシュボード

  ## 4. テスト
  #general で `/ceo` と入力 → ダッシュボードが返信されます

  ✓ Slack Bot を設定しました
  #general で /ceo と打つとダッシュボードが返ります

  🎉 Level 5 完了！あなたのAI経営OSが稼働しました
hint: "claude \"OpenClawをSlack Botにして...\" と入力してください"
---

# Slack Bot化

最後のステップ。OpenClawをSlack Botにして、チーム全員がアクセスできるようにします。

:::flow
steps:
  - "💬 Slack /ceo"
  - "🤖 OpenClaw"
  - "📊 ダッシュボード返信"
:::

---step---

## チーム全員が使えるAI経営OS

Slackで `/ceo` と打つだけ。技術知識ゼロのメンバーでも経営データにアクセスできます。

**これがRadineerが実際に使っているシステムです。あなたも今日から使えます。**

```
claude "OpenClawをSlack Botにして、#generalで/ceoと打ったらダッシュボードが返ってくるようにして"
```

右のターミナルにコピペして Enter を押してください。
