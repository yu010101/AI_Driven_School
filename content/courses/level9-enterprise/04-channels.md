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

### アーキテクチャ全体像

Channels & Remoteの仕組みをテキストベースで図示する。

```
┌────────────────────────────────────────────────────┐
│                   入力チャネル                       │
│                                                      │
│  Slack Bot    Discord Bot    Webhook    MCP Server   │
│     │              │            │           │        │
│     └──────────────┴────────────┴───────────┘        │
│                        │                              │
│                        ▼                              │
│              ┌─────────────────┐                     │
│              │  Channel Router  │                     │
│              └────────┬────────┘                     │
│                       │                              │
│                       ▼                              │
│    ┌──────────────────────────────────┐              │
│    │     Claude Code Session          │              │
│    │  ┌───────────┐  ┌────────────┐  │              │
│    │  │ Sandbox   │  │ CLAUDE.md  │  │              │
│    │  └───────────┘  └────────────┘  │              │
│    └──────────────────────────────────┘              │
│                       │                              │
│                       ▼                              │
│              ┌─────────────────┐                     │
│              │  結果を返信      │                     │
│              └─────────────────┘                     │
│                                                      │
│  + Remote Control: スマホ/ブラウザから操作           │
│  + Dispatch: タスクを投げて結果を受け取る            │
└────────────────────────────────────────────────────┘
```

### Slack Bot連携の実装

Node.jsでSlack Botを構築し、メッセージをClaude Codeセッションに転送する例。

```javascript
// slack-claude-bot.js
const { App } = require("@slack/bolt");
const { execSync, spawn } = require("child_process");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// #ai-tasks チャンネルのメッセージを監視
app.message(async ({ message, say }) => {
  // Botのメッセージは無視
  if (message.subtype === "bot_message") return;

  try {
    await say({
      text: `処理中です... :hourglass:`,
      thread_ts: message.ts,
    });

    // Claude Codeをサブプロセスとして実行
    const result = execSync(
      `claude --print "${message.text.replace(/"/g, '\\"')}"`,
      {
        cwd: "/path/to/your/project",
        timeout: 120000, // 2分タイムアウト
        env: {
          ...process.env,
          ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
        },
      }
    ).toString();

    await say({
      text: result,
      thread_ts: message.ts,
    });
  } catch (error) {
    await say({
      text: `エラーが発生しました: ${error.message}`,
      thread_ts: message.ts,
    });
  }
});

(async () => {
  await app.start(3000);
  console.log("Slack Claude Bot is running on port 3000");
})();
```

**必要な環境変数：**

```bash
export SLACK_BOT_TOKEN=xoxb-your-bot-token
export SLACK_SIGNING_SECRET=your-signing-secret
export SLACK_APP_TOKEN=xapp-your-app-token
export ANTHROPIC_API_KEY=sk-ant-your-api-key
```

### Webhook受信サーバーの実装

外部サービスからのWebhookを受信してClaude Codeに転送するサーバー。

```javascript
// webhook-receiver.js
const express = require("express");
const crypto = require("crypto");
const { execSync } = require("child_process");

const app = express();
app.use(express.json());

// Webhook署名の検証
function verifySignature(req, secret) {
  const signature = req.headers["x-webhook-signature"];
  const computed = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature || ""),
    Buffer.from(computed)
  );
}

app.post("/webhook/claude", (req, res) => {
  // 署名検証
  if (!verifySignature(req, process.env.WEBHOOK_SECRET)) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  const { task, project_path } = req.body;

  // 非同期で処理（Webhookはすぐにレスポンスを返す）
  res.status(202).json({ status: "accepted" });

  try {
    const result = execSync(`claude --print "${task}"`, {
      cwd: project_path || "/default/project/path",
      timeout: 300000,
      env: { ...process.env },
    });
    console.log("Task completed:", result.toString());
    // 結果をコールバックURLに送信するなどの処理
  } catch (error) {
    console.error("Task failed:", error.message);
  }
});

app.listen(8080, () => {
  console.log("Webhook receiver listening on port 8080");
});
```

### Remote Controlと通常のClaude Codeの違い

| 機能 | 通常のClaude Code | Remote Control |
|------|------------------|---------------|
| 実行場所 | ローカルターミナル | ローカルで動作（操作は遠隔） |
| 操作方法 | 直接キーボード入力 | ブラウザ/スマホから操作 |
| セッション共有 | 不可 | 複数デバイスから同一セッション |
| 外出先での利用 | 不可 | 可能 |
| ファイルアクセス | ローカルファイル | ローカルファイル（セッション経由） |
| セキュリティ | ローカル完結 | 認証付きトンネル経由 |

Remote Controlのポイント：**処理自体はローカルマシンで実行**される。遠隔からの操作インターフェースだけがリモートになる。これにより、コードがクラウドに送られる心配がない。

### MCPサーバーをチャネルソースとして活用

Model Context Protocol (MCP) サーバーをChannelの入力ソースとして使うことで、**外部データをリアルタイムにClaude Codeに提供**できる。

```json
{
  "mcpServers": {
    "jira-channel": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-jira"],
      "env": {
        "JIRA_URL": "https://your-org.atlassian.net",
        "JIRA_API_TOKEN": "${JIRA_API_TOKEN}"
      }
    },
    "github-channel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "slack-channel": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}"
      }
    }
  }
}
```

MCPサーバーを使うと、Claude Codeが**Jiraのチケット情報を読み取ってコードを修正**したり、**GitHubのIssueに基づいてPRを作成**したりできるようになる。

### 小規模チーム向けセットアップ手順

5〜10人のチームで始めるための実践的な導入ステップ。

**Step 1: Slack Botの作成**
1. [api.slack.com/apps](https://api.slack.com/apps) で新しいAppを作成
2. **Socket Mode** を有効化
3. **Bot Token Scopes** に `chat:write`, `channels:history`, `app_mentions:read` を追加
4. ワークスペースにインストール

**Step 2: 専用チャンネルの作成**
- `#ai-code-review` — コードレビュー依頼用
- `#ai-tasks` — 汎用タスク依頼用
- `#ai-alerts` — CI/CD通知の受信用

**Step 3: サーバーのデプロイ**
- 社内サーバーまたはVPSにSlack Botとwebhookサーバーをデプロイ
- PM2やsystemdでプロセスを常駐化
- APIキーは環境変数で管理（dotenvを使わず、OS側で設定）

**Step 4: 運用ルールの策定**
- チャンネルごとの用途と対象プロジェクトを明確にする
- AIの応答にメンションを付けて、依頼者に通知が届くようにする
- 1日あたりの利用上限を設定してコストを管理

### 注意点

- **セキュリティリスク**：Slackメッセージ経由でClaude Codeにコマンドを送るため、チャンネルのアクセス権限を厳格に管理する。誰でも投稿できるパブリックチャンネルは避ける
- **タイムアウト設定**：長時間かかるタスクはSlackの応答制限（3秒）に引っかかる。非同期処理パターンを使い、完了後にスレッドに返信する設計にする
- **コスト管理**：チーム全員がAIに依頼できると利用量が急増する。月次の利用上限を設定し、ダッシュボードで可視化する
- **障害対応**：Botがダウンした場合のフォールバック手順を用意する。直接Claude Codeをターミナルで使えることを周知しておく

### 実務での活用例

**ケース1：DevOpsチームのアラート対応**
- PagerDuty/Datadogのアラートをwebhookで受信
- Claude Codeが関連ログを分析し、原因の仮説をSlackに投稿
- オンコールエンジニアの初動対応が大幅に高速化

**ケース2：プロダクトマネージャーのタスク投入**
- PMがSlackで「ユーザー登録画面にメールアドレスのバリデーションを追加して」と投稿
- Claude CodeがPRを自動作成し、レビュー依頼をSlackに投稿
- エンジニアはレビューとマージのみに集中

**ケース3：リモートワーク環境での活用**
- Remote Controlを使い、自宅の開発マシンにカフェのスマホからアクセス
- 移動中にコードレビューの結果を確認し、承認
- セッションの状態はローカルマシンに保持されるため、セキュリティを維持

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
