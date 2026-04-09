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

---step---

## 毎朝のブリーフィングを自動化

`0 8 * * 1-5` は「平日の毎朝8時」という意味です。これだけで、出社前にダッシュボードがSlackに届きます。

```
claude "毎朝8時にCEOダッシュボードを生成してSlackに投稿するcronを設定して"
```

右のターミナルにコピペして Enter を押してください。
