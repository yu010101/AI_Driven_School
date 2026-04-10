---
title: "CMOエージェントを作る"
step: 4
totalSteps: 7
expectedCommand: "claude \"CMOエージェントのSKILL.mdを作って。GA4でPV・CVR分析、GSCで検索順位チェック、週次マーケレポート\""
acceptableCommands:
  - "claude \"CMOエージェントのSKILL.mdを作って。GA4でPV・CVR分析、GSCで検索順位チェック、週次マーケレポート\""
simulatedOutput: |
  # CMOエージェント SKILL.md を作成します

  `.claude/skills/cmo/SKILL.md` を作成中...

  ```markdown
  # CMO Agent - 最高マーケティング責任者

  ## 役割
  マーケティングデータの自動分析と改善提案

  ## データソース
  - Google Analytics 4（PV・セッション・CVR）
  - Google Search Console（検索クエリ・順位・CTR）
  - SNSアナリティクス（X・note）

  ## 定期タスク
  1. 毎日: PV・CVR異常値チェック
  2. 毎週: 検索順位変動レポート
  3. 毎月: マーケティング総合分析

  ## コマンド
  - `/cmo report` → 週次マーケレポート
  - `/cmo seo` → 検索順位サマリー
  - `/cmo content` → コンテンツパフォーマンス

  ## API連携
  - GA4: Analytics Data API v1
  - GSC: Search Console API v1
  - 指標: PV, セッション, CVR, 検索順位, CTR, 表示回数
  ```

  ✓ .claude/skills/cmo/SKILL.md を作成しました
hint: "claude \"CMOエージェントのSKILL.mdを作って...\" と入力してください"
---

# CMOエージェントを作る

CMOエージェントは、**データで語るマーケティング分析官**です。GA4とGSCのデータを自動で取得し、改善提案まで出します。

:::flow
steps:
  - "📈 GA4 + GSC"
  - "🤖 CMOエージェント"
  - "📋 マーケレポート + 改善提案"
:::

## SKILL.mdの実際の内容

```markdown
# CMO Agent - 最高マーケティング責任者

## 役割
マーケティングデータの自動収集・分析・改善提案を担当する。
CMO Agentはデータの「収集と分析」を行い、改善提案を出す。
ただし、データの解釈と施策の最終判断は必ず人間が行うこと。
（例: CVRが下がった原因がUIか季節要因かはAIだけでは判断しきれない）

## データソース
- Google Analytics 4（PV・セッション・CVR・イベント）
- Google Search Console（検索クエリ・順位・CTR・表示回数）
- SNSアナリティクス（X・note、手動CSV対応）

## 定期タスク
1. 毎日10時: PV・CVR異常値チェック → 前日比20%以上の変動で通知
2. 毎週月曜: 検索順位変動レポート → TOP50キーワードの週次推移
3. 毎月3日: マーケティング総合月次分析 → CEO Agentに連携

## コマンド
- `/cmo report` → 週次マーケティングレポート
- `/cmo seo` → 検索順位サマリー（TOP50）
- `/cmo content` → コンテンツ別パフォーマンスランキング
- `/cmo anomaly` → 直近の異常値検知結果

## API連携
- GA4: Analytics Data API v1（プロパティID必須）
- GSC: Search Console API v1（サイトURL必須）
- 指標: PV, セッション, CVR, 直帰率, 検索順位, CTR, 表示回数
```

## GA4 APIの認証セットアップ

GA4 APIに接続するには、GCPサービスアカウントを設定します。

**手順1**: GCPコンソールでプロジェクトを作成（または既存を使用）

**手順2**: Analytics Data API v1を有効化
```
https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com
```

**手順3**: サービスアカウントを作成し、JSONキーをダウンロード
```bash
# ダウンロードしたキーを配置
mv ~/Downloads/service-account-key.json .secrets/ga4-credentials.json
```

**手順4**: GA4プロパティにサービスアカウントのメールを「閲覧者」として追加
```
GA4管理画面 → プロパティ → アクセス管理 → サービスアカウントのメールを追加
```

**手順5**: 環境変数を設定
```bash
# .env に追加
GA4_PROPERTY_ID="properties/123456789"
GOOGLE_APPLICATION_CREDENTIALS=".secrets/ga4-credentials.json"
```

## GSC APIの接続

GSCも同じサービスアカウントで接続できます。

```bash
# GCPコンソールで Search Console API を有効化
# https://console.cloud.google.com/apis/library/searchconsole.googleapis.com

# .env に追加
GSC_SITE_URL="https://your-domain.com"
```

Search Consoleの設定画面でサービスアカウントのメールをユーザーとして追加してください。

## マーケティングダッシュボードの出力例

```
============================================
  週次マーケティングレポート（2026/04/01〜04/07）
============================================

  ■ トラフィック概要
  PV:          45,200  (前週比 +15.3%)
  セッション:    12,800  (前週比 +11.2%)
  ユーザー:      9,400  (前週比 +13.8%)
  直帰率:        42.3%  (前週比 -1.2pt) ← 改善傾向

  ■ コンバージョン
  CVR:          2.8%   (前週比 +0.3pt)
  CV数:          358件  (前週比 +18.2%)

  ■ 検索パフォーマンス（GSC）
  TOP10キーワード: 28個  (前週比 +3)
  平均順位:       14.2位 (前週比 -0.8) ← 改善
  合計クリック:   8,920  (前週比 +9.1%)
  平均CTR:       3.2%   (前週比 +0.2pt)

  ■ 注目コンテンツ（PV上位5）
  1. /guide/claude-code-setup    → 4,200 PV (+42%)
  2. /knowledge/ai/prompt-tips   → 3,100 PV (+18%)
  3. /books/vibe-coding          → 2,800 PV (+5%)
  4. /tools/prompt-generator     → 2,400 PV (+22%)
  5. /free                       → 2,100 PV (-3%)

  ■ AI改善提案（参考情報 - 最終判断は人間が行うこと）
  1. 「claude code 使い方」が順位8位→CTR低い → タイトル改善を検討
  2. /free のPVが微減 → CTAの文言テストを検討
  3. /tools/ 系の成長率が高い → 新ツール追加が効果的な可能性
============================================
```

## 注意: データ解釈には人間の判断が必要

CMOエージェントが出す「改善提案」はあくまで**データパターンからの示唆**です。

- CVR低下の原因が「UIの問題」か「季節要因」か「競合の変化」かはAIだけでは判断できない
- 検索順位の変動がアルゴリズム更新によるものかコンテンツ品質の問題かは人間が判断する
- AIの提案を鵜呑みにせず、仮説として扱い、A/Bテストで検証する姿勢が重要

---step---

## CMOのSKILL.mdを作ろう

GA4でアクセス解析、GSCで検索順位チェック。この2つのAPIを連携するだけで、マーケ担当者1人分の仕事をAIが代行します。

```
claude "CMOエージェントのSKILL.mdを作って。GA4でPV・CVR分析、GSCで検索順位チェック、週次マーケレポート"
```

## 実装のポイント

- **GA4とGSCの2つだけで十分始められる**: SNS連携は後回し。まずこの2つのAPI接続が安定すればマーケデータの8割はカバーできる
- **サービスアカウントのJSONキーは厳重管理**: `.secrets/` ディレクトリを `.gitignore` に入れ、絶対にリポジトリにコミットしない
- **異常値検知の閾値を決めておく**: 前日比20%以上の変動でアラートを出す設定にしておくと、バグやGoogleアルゴリズム更新を早期発見できる
- **レポート頻度を欲張らない**: 毎日の詳細レポートはノイズになる。日次は異常値のみ、詳細は週次で十分

右のターミナルにコピペして Enter を押してください。
