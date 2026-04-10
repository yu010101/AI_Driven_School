---
title: "COOエージェントを作る"
step: 3
totalSteps: 7
expectedCommand: "claude \"COOエージェントのSKILL.mdを作って。タスク進捗管理、クライアント対応状況、週次ステータスレポート\""
acceptableCommands:
  - "claude \"COOエージェントのSKILL.mdを作って。タスク進捗管理、クライアント対応状況、週次ステータスレポート\""
simulatedOutput: |
  # COOエージェント SKILL.md を作成します

  `.claude/skills/coo/SKILL.md` を作成中...

  ```markdown
  # COO Agent - 最高執行責任者

  ## 役割
  全プロジェクトの進捗・クライアント対応・リソース管理

  ## データソース
  - tasks/ ディレクトリ（タスクYAML）
  - clients/ ディレクトリ（クライアント情報）
  - Slack通知履歴

  ## 定期タスク
  1. 毎日: タスク期限チェック → 遅延アラート
  2. 毎日: クライアント未返信チェック
  3. 毎週金曜: 週次ステータスレポート生成

  ## コマンド
  - `/coo tasks` → タスク進捗一覧
  - `/coo clients` → クライアント状況
  - `/coo report` → 週次レポート生成

  ## 監視ルール
  - 期限3日前 → 黄色アラート
  - 期限超過 → 赤アラート + Slack通知
  - 未返信48時間 → フォローアップ提案
  ```

  ✓ .claude/skills/coo/SKILL.md を作成しました
hint: "claude \"COOエージェントのSKILL.mdを作って...\" と入力してください"
---

# COOエージェントを作る

COOエージェントは、**絶対に忘れないオペレーション管理者**です。タスク漏れやクライアント対応遅れを自動で検知します。

:::before-after
before: タスク漏れ・対応遅れ。「あれどうなった？」が口癖
after: 全案件を自動追跡。遅延は即アラート
:::

## SKILL.mdの実際の内容

```markdown
# COO Agent - 最高執行責任者

## 役割
全プロジェクトの進捗監視・クライアント対応管理・リソース配分の可視化。
COO Agentは「状況の報告」と「アラートの発報」を行う。
タスクの優先度変更やリソース再配分の判断は人間が行う。

## データソース
- tasks/ ディレクトリ（タスクYAMLファイル）
- clients/ ディレクトリ（クライアント情報YAML）
- Slack通知履歴（対応状況の確認用）

## 定期タスク
1. 毎日9時: タスク期限チェック → 遅延・期限間近をSlack通知
2. 毎日17時: クライアント未返信チェック → 48時間超過で通知
3. 毎週金曜15時: 週次ステータスレポート生成 → CEO Agentに連携

## コマンド
- `/coo tasks` → 全タスク進捗一覧
- `/coo clients` → クライアント対応状況
- `/coo report` → 週次ステータスレポート生成
- `/coo overdue` → 期限超過タスクのみ表示

## アラート閾値
- 期限3日前 → 黄色アラート（Slack通知、メンション無し）
- 期限1日前 → オレンジアラート（Slack通知、担当者メンション）
- 期限超過 → 赤アラート（Slack通知、チーム全体メンション）
- クライアント未返信48時間 → フォローアップ提案を自動生成
```

## タスクYAMLの構造

COOエージェントが読み取る `tasks/` ディレクトリには、以下の形式でYAMLファイルを配置します。

```yaml
# tasks/project-alpha.yaml
project: "Project Alpha"
client: "株式会社サンプル"
status: "進行中"       # 進行中 / 完了 / 保留 / 中止
tasks:
  - name: "LP制作"
    assignee: "田中"
    due: "2026-04-15"
    status: "進行中"
    progress: 60        # パーセント
  - name: "GA4設定"
    assignee: "鈴木"
    due: "2026-04-10"
    status: "完了"
    progress: 100
  - name: "広告入稿"
    assignee: "田中"
    due: "2026-04-20"
    status: "未着手"
    progress: 0
```

このYAML形式を統一しておくことで、COOエージェントが自動で集計・アラートを出せます。

## アラート閾値のカスタマイズ

`config/coo-config.yaml` でアラート閾値を調整できます。

```yaml
# config/coo-config.yaml
alerts:
  task_warning_days: 3          # 何日前から黄色アラート
  task_urgent_days: 1           # 何日前からオレンジアラート
  client_no_reply_hours: 48     # 未返信何時間でアラート
  slack_channel: "#ops-alerts"  # アラート投稿先
  mention_on_overdue: true      # 期限超過時にメンション
```

## プロジェクト管理ツールとの連携

YAML管理以外に、既存のプロジェクト管理ツールと連携する方法もあります。

| ツール | 連携方法 | メリット |
|-------|---------|---------|
| Linear | Linear API → YAML変換スクリプト | 既存ワークフローを維持できる |
| Notion | Notion API → データベース取得 | ドキュメントと一元管理 |
| GitHub Issues | GitHub API → ラベルでフィルタ | 開発タスクと統合できる |
| Asana | Asana API → タスク同期 | 大規模チームに対応 |

連携スクリプトの例（Linear → YAML変換）:

```bash
# scripts/sync-linear.sh
curl -s -X POST https://api.linear.app/graphql \
  -H "Authorization: $LINEAR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ issues { nodes { title, assignee { name }, dueDate, state { name } } } }"}' \
  | jq -r '.data.issues.nodes' > tasks/linear-sync.json
```

## 週次ステータスレポートの出力例

```
============================================
  週次ステータスレポート（2026/04/07〜04/11）
============================================
  進行中プロジェクト:    8件
  今週完了タスク:       12件
  期限超過タスク:        2件（要対応）
  クライアント未返信:    1件

  [要対応] Project Alpha - LP制作
    担当: 田中 / 期限: 04/10（1日超過）
    → 推奨アクション: クライアントに確認連絡

  [要対応] Project Beta - 契約書送付
    担当: 鈴木 / 期限: 04/09（2日超過）
    → 推奨アクション: 社内承認フローを確認

  [順調] 他6プロジェクトは予定通り進行中
============================================
```

---step---

## COOのSKILL.mdを作ろう

タスク管理、クライアント対応、週次レポート。人間がやると漏れる仕事を、AIに任せます。

```
claude "COOエージェントのSKILL.mdを作って。タスク進捗管理、クライアント対応状況、週次ステータスレポート"
```

## 実装のポイント

- **タスクの期限管理が最大の価値**: COOエージェントで最も効果が高いのは「期限超過の即時アラート」。人間は忘れるがAIは忘れない
- **YAML形式を統一する**: チーム全員が同じフォーマットでタスクを記録すること。フォーマットが揃わないとパースエラーになる
- **既存ツールとの二重管理を避ける**: LinearやNotionを使っているなら、同期スクリプトで自動変換する。手動で二重入力させるとチームが使わなくなる
- **アラート疲れに注意**: 閾値を厳しくしすぎると通知が多すぎて無視される。最初は「期限超過のみ」から始めて、徐々に調整する

右のターミナルにコピペして Enter を押してください。
