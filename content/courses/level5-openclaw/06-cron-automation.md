---
title: "cronで24時間自動運用"
step: 6
totalSteps: 7
expectedCommand: "claude \"毎朝8時にCEOダッシュボードを生成してSlackに投稿するcronを設定して\""
acceptableCommands:
  - "claude \"毎朝8時にCEOダッシュボードを生成してSlackに投稿するcronを設定して\""
simulatedOutput: |
  # cron自動化を設定します

  ## 1. スクリプト作成
  `scripts/morning-briefing.sh` を作成中...

  ```bash
  #!/bin/bash
  # 毎朝のCEOブリーフィング
  cd /path/to/your/project

  # CEOダッシュボードを生成
  claude "/ceo ダッシュボードを生成して" > /tmp/ceo-dashboard.md

  # Slackに投稿
  curl -X POST "$SLACK_WEBHOOK_URL" \
    -H 'Content-type: application/json' \
    -d "{\"text\": \"$(cat /tmp/ceo-dashboard.md)\"}"

  echo "$(date) - ダッシュボード送信完了" >> logs/cron.log
  ```

  ## 2. crontab設定
  ```
  # 平日毎朝8時に実行
  0 8 * * 1-5 /path/to/scripts/morning-briefing.sh
  ```

  ## 3. 動作確認
  - スクリプトに実行権限を付与: `chmod +x scripts/morning-briefing.sh`
  - テスト実行: `./scripts/morning-briefing.sh`

  ✓ 設定完了。毎朝8時にダッシュボードが届きます
hint: "claude \"毎朝8時にCEOダッシュボードを...\" と入力してください"
---

# cronで24時間自動運用

cronとは「タイマー」です。一度設定すれば、あなたが寝ている間もAIが働きます。Radineerでは**28個以上**のcronが毎日動いています。

:::before-after
before: 毎朝手動でデータを確認。忙しいと忘れる
after: 寝てる間にAIが準備。朝Slackを開くだけ
:::

## 完全なcronスケジュール例

OpenClawで設定する代表的なcronジョブの一覧です。

```bash
# ===== 日次タスク =====
# 毎朝8:00 - CEOモーニングブリーフィング（平日のみ）
0 8 * * 1-5  /opt/openclaw/scripts/morning-briefing.sh

# 毎日9:00 - COO: タスク期限チェック＆遅延アラート
0 9 * * *    /opt/openclaw/scripts/coo-daily-check.sh

# 毎日10:00 - CMO: PV・CVR異常値チェック
0 10 * * *   /opt/openclaw/scripts/cmo-anomaly-check.sh

# 毎日17:00 - CFO: 未決済請求チェック
0 17 * * *   /opt/openclaw/scripts/cfo-unpaid-check.sh

# ===== 週次タスク =====
# 毎週月曜8:00 - CMO: 検索順位変動レポート
0 8 * * 1    /opt/openclaw/scripts/cmo-weekly-seo.sh

# 毎週金曜15:00 - COO: 週次ステータスレポート
0 15 * * 5   /opt/openclaw/scripts/coo-weekly-report.sh

# ===== 月次タスク =====
# 毎月3日9:00 - CMO: マーケティング月次分析
0 9 3 * *    /opt/openclaw/scripts/cmo-monthly-report.sh

# 毎月5日9:00 - CFO: 月次PLレポート
0 9 5 * *    /opt/openclaw/scripts/cfo-monthly-pl.sh
```

## GitHub Actionsでcronを実行する

ローカルマシンのcronだとPCが起動していない時に実行されません。GitHub Actionsを使えば、クラウドで確実に実行できます。

```yaml
# .github/workflows/openclaw-cron.yml
name: OpenClaw Daily Briefing

on:
  schedule:
    # UTCなので日本時間8:00 = UTC 23:00（前日）
    - cron: '0 23 * * 0-4'   # 平日朝8時JST
  workflow_dispatch: {}       # 手動実行も可能

jobs:
  morning-briefing:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Generate CEO Dashboard
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          FREEE_REFRESH_TOKEN: ${{ secrets.FREEE_REFRESH_TOKEN }}
          GOOGLE_APPLICATION_CREDENTIALS: ${{ secrets.GA4_CREDENTIALS }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
        run: |
          claude "/ceo" > /tmp/dashboard.md
          curl -X POST "$SLACK_WEBHOOK_URL" \
            -H 'Content-type: application/json' \
            -d "{\"text\": $(cat /tmp/dashboard.md | jq -Rs .)}"

      - name: Notify on failure
        if: failure()
        run: |
          curl -X POST "${{ secrets.SLACK_WEBHOOK_URL }}" \
            -H 'Content-type: application/json' \
            -d '{"text": "⚠️ OpenClaw morning briefing failed. Check GitHub Actions."}'
```

## 失敗時のハンドリング

cronジョブは「動いていて当然」なので、失敗に気づきにくいのが最大のリスクです。

**リトライ戦略**:

```bash
#!/bin/bash
# scripts/morning-briefing.sh（リトライ付き）
MAX_RETRIES=3
RETRY_DELAY=60  # 秒

for i in $(seq 1 $MAX_RETRIES); do
  claude "/ceo" > /tmp/dashboard.md 2>/tmp/ceo-error.log
  if [ $? -eq 0 ]; then
    # 成功: Slackに投稿
    curl -X POST "$SLACK_WEBHOOK_URL" \
      -H 'Content-type: application/json' \
      -d "{\"text\": $(cat /tmp/dashboard.md | jq -Rs .)}"
    echo "$(date) - SUCCESS (attempt $i)" >> /var/log/openclaw/cron.log
    exit 0
  fi
  echo "$(date) - FAILED (attempt $i/$MAX_RETRIES)" >> /var/log/openclaw/cron.log
  sleep $RETRY_DELAY
done

# 全リトライ失敗: エラー通知
curl -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-type: application/json' \
  -d '{"text": "OpenClaw morning briefing が3回失敗しました。手動確認してください。"}'
```

**監視のポイント**:
- `/var/log/openclaw/cron.log` にすべての実行結果を記録する
- 成功時もログを残す（「今日も正常に動いた」の証跡）
- 3回リトライしても失敗した場合のみSlackにエラー通知

## コスト見積もり

各cron実行のAPI呼び出しコストの目安です。

| ジョブ | Claude API | 外部API | 合計/回 | 月間コスト |
|-------|-----------|---------|--------|----------|
| モーニングブリーフィング | ~$0.15 | freee+GA4+GSC無料枠内 | ~$0.15 | ~$3.00（20営業日） |
| COO日次チェック | ~$0.05 | なし（ローカルYAML） | ~$0.05 | ~$1.50 |
| CMO異常値チェック | ~$0.08 | GA4無料枠内 | ~$0.08 | ~$2.40 |
| CFO未決済チェック | ~$0.05 | freee無料枠内 | ~$0.05 | ~$1.50 |
| 週次・月次レポート | ~$0.20 | 無料枠内 | ~$0.20 | ~$1.60 |
| **合計** | | | | **~$10/月** |

Claude APIの料金は入出力トークン数に依存します。上記は目安であり、レスポンスの長さによって変動します。

---step---

## 毎朝のブリーフィングを自動化

`0 8 * * 1-5` は「平日の毎朝8時」という意味です。これだけで、出社前にダッシュボードがSlackに届きます。

```
claude "毎朝8時にCEOダッシュボードを生成してSlackに投稿するcronを設定して"
```

## 実装のポイント

- **GitHub Actionsが最も安定**: ローカルcronはマシンが落ちると止まる。GitHub Actionsなら確実に実行され、ログも残る
- **UTCとJSTの変換に注意**: GitHub Actionsのcronはすべて**UTC**で指定する。日本時間8時 = UTC 23時（前日）
- **リトライは3回まで**: API一時障害に対応するため。3回失敗したら人間にエスカレーション
- **ログは必ず残す**: 「いつ、何が、成功/失敗したか」を記録。トラブル時の原因特定に不可欠
- **コストを把握しておく**: 月$10程度で経営管理が自動化できるのは破格だが、ジョブを増やしすぎるとコストも増える

右のターミナルにコピペして Enter を押してください。
