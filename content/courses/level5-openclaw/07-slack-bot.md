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

## Slack Appのセットアップ

### 手順1: Slack App Manifestを使って一括作成

api.slack.com にアクセスし、「Create New App」→「From a manifest」を選択して以下を貼り付けます。

```yaml
# Slack App Manifest
display_information:
  name: OpenClaw Bot
  description: AI経営ダッシュボード
  background_color: "#1a1a2e"

features:
  bot_user:
    display_name: OpenClaw
    always_online: true
  slash_commands:
    - command: /ceo
      url: https://your-worker.your-domain.workers.dev/slack/commands
      description: 経営ダッシュボードを生成
      usage_hint: "[html|summary]"
    - command: /cfo
      url: https://your-worker.your-domain.workers.dev/slack/commands
      description: 財務レポート
      usage_hint: "[pl|cf|未決済]"
    - command: /coo
      url: https://your-worker.your-domain.workers.dev/slack/commands
      description: オペレーション状況
      usage_hint: "[tasks|clients|report]"
    - command: /cmo
      url: https://your-worker.your-domain.workers.dev/slack/commands
      description: マーケティングレポート
      usage_hint: "[report|seo|content]"

oauth_config:
  scopes:
    bot:
      - chat:write
      - commands
      - chat:write.public
```

### 手順2: Bot Tokenを取得

App作成後、「OAuth & Permissions」ページで「Install to Workspace」をクリック。表示される `xoxb-` で始まるBot Tokenを `.env` に保存します。

```bash
# .env に追加
SLACK_BOT_TOKEN="xoxb-xxxx-xxxx-xxxx"
SLACK_SIGNING_SECRET="xxxx"  # Basic Information ページから取得
```

## Webhookサーバーの実装（Node.js）

Slackからのスラッシュコマンドを受け取るWebhookサーバーです。

```javascript
// slack-bot/server.js
const express = require('express');
const crypto = require('crypto');
const { execSync } = require('child_process');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Slackリクエストの署名検証（セキュリティ必須）
function verifySlackRequest(req) {
  const signature = req.headers['x-slack-signature'];
  const timestamp = req.headers['x-slack-request-timestamp'];
  const body = new URLSearchParams(req.body).toString();

  // リプレイ攻撃防止: 5分以上前のリクエストは拒否
  if (Math.abs(Date.now() / 1000 - timestamp) > 300) return false;

  const sigBaseString = `v0:${timestamp}:${body}`;
  const mySignature = 'v0=' + crypto
    .createHmac('sha256', process.env.SLACK_SIGNING_SECRET)
    .update(sigBaseString)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(mySignature), Buffer.from(signature)
  );
}

app.post('/slack/commands', async (req, res) => {
  // 署名検証
  if (!verifySlackRequest(req)) {
    return res.status(401).send('Unauthorized');
  }

  const { command, text } = req.body;

  // Slackは3秒以内にレスポンスを要求するので、まず受領応答
  res.json({ response_type: 'in_channel', text: '生成中...' });

  // バックグラウンドでClaude Codeを実行
  try {
    const subcommand = text || '';
    const result = execSync(
      `claude "${command} ${subcommand}"`,
      { timeout: 60000, encoding: 'utf-8' }
    );

    // 結果をSlackに投稿
    await fetch(req.body.response_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        response_type: 'in_channel',
        text: result
      })
    });
  } catch (error) {
    await fetch(req.body.response_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        response_type: 'ephemeral',
        text: `エラーが発生しました: ${error.message}`
      })
    });
  }
});

app.listen(3000, () => console.log('OpenClaw Bot listening on port 3000'));
```

## Cloudflare Workersへのデプロイ

本番運用ではCloudflare Workersにデプロイすると、無料枠で月10万リクエストまで対応できます。

```bash
# Wranglerをインストール
npm install -g wrangler

# プロジェクトを初期化
wrangler init openclaw-bot

# シークレットを登録
wrangler secret put SLACK_BOT_TOKEN
wrangler secret put SLACK_SIGNING_SECRET
wrangler secret put ANTHROPIC_API_KEY

# デプロイ
wrangler deploy
```

デプロイ後に表示されるURLを、Slack App ManifestのRequest URLに設定します。

## セキュリティ: Slackリクエストの認証

Webhookエンドポイントはインターネットに公開されるため、**Slack以外からのリクエストを拒否する**認証が必須です。

上記のコード例にある `verifySlackRequest` 関数が以下を行っています:

1. **タイムスタンプ検証**: 5分以上前のリクエストはリプレイ攻撃の可能性があるため拒否
2. **HMAC署名検証**: Slackが送信した署名をSigning Secretで再計算し、一致を確認
3. **タイミングセーフ比較**: `crypto.timingSafeEqual` でタイミング攻撃を防止

この検証を省略すると、誰でもエンドポイントを叩いてClaude APIを不正利用できてしまいます。**絶対に省略しないでください。**

---step---

## チーム全員が使えるAI経営OS

Slackで `/ceo` と打つだけ。技術知識ゼロのメンバーでも経営データにアクセスできます。

**これがRadineerが実際に使っているシステムです。あなたも今日から使えます。**

```
claude "OpenClawをSlack Botにして、#generalで/ceoと打ったらダッシュボードが返ってくるようにして"
```

## 実装のポイント

- **Slack App Manifestを使う**: GUIで1つずつ設定するより、YAMLマニフェストを貼り付ける方が速く、再現性も高い
- **3秒ルールに注意**: Slackはスラッシュコマンドのレスポンスを3秒以内に要求する。Claude Codeの処理はそれより長いので、まず「生成中...」と応答してからバックグラウンド処理する
- **署名検証は絶対省略しない**: Webhookを公開する以上、Slack以外からのリクエストを弾く認証は必須。コードをコピペする際もこの部分は消さないこと
- **Cloudflare Workers推奨**: 無料枠が大きく、コールドスタートが速い。VPSを管理する手間も不要
- **権限は最小限に**: Bot Tokenのスコープは `chat:write` と `commands` のみ。ファイルアクセスやメッセージ読み取りの権限は付与しない

右のターミナルにコピペして Enter を押してください。
