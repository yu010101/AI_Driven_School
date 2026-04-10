---
title: "CEOダッシュボード"
step: 5
totalSteps: 7
expectedCommand: "claude \"/ceo ダッシュボードを生成して\""
acceptableCommands:
  - "claude \"/ceo ダッシュボードを生成して\""
  - "claude '/ceo ダッシュボードを生成して'"
  - "claude /ceo"
simulatedOutput: |
  # CEO経営ダッシュボード生成

  各エージェントからレポートを収集中...

  ## 💰 財務サマリー（CFO Report）
  | 指標 | 今月 | 前月比 |
  |------|------|--------|
  | 売上 | ¥3,200,000 | +12% |
  | 営業利益 | ¥890,000 | +8% |
  | キャッシュ残高 | ¥5,400,000 | - |

  ## 📋 オペレーション（COO Report）
  | 指標 | 状況 |
  |------|------|
  | 進行中タスク | 12件 |
  | 期限超過 | ⚠️ 2件 |
  | クライアント対応待ち | 3件 |

  ## 📈 マーケティング（CMO Report）
  | 指標 | 今週 | 前週比 |
  |------|------|--------|
  | PV | 45,200 | +15% |
  | CVR | 2.8% | +0.3pt |
  | 検索TOP10キーワード | 28個 | +3 |

  ## 🎯 CEOアクション提案
  1. 期限超過タスク2件の優先対応を推奨
  2. CVR改善トレンド継続 → 広告予算増を検討
  3. キャッシュフロー健全 → 新規投資枠あり

  ✓ ceo-dashboard.html を生成しました
hint: "claude \"/ceo ダッシュボードを生成して\" と入力してください"
---

# CEOダッシュボード

CEOエージェントは、3つのエージェントの報告を**1画面に統合する頭脳**です。これを見るだけで経営状況が分かります。

:::flow
steps:
  - "💰 CFO報告 + 📋 COO報告 + 📈 CMO報告"
  - "🏢 CEOエージェント"
  - "📊 経営ダッシュボード"
:::

## SKILL.mdの実際の内容

```markdown
# CEO Agent - 最高経営責任者

## 役割
CFO・COO・CMOの3エージェントを呼び出し、各報告を統合して
経営ダッシュボードを生成する。
CEO Agentは「情報の統合と可視化」を行う。
経営判断（投資・採用・撤退など）は必ず人間が行うこと。

## サブエージェント呼び出し
以下の順序で各エージェントを実行し、結果を統合する:
1. CFO Agent → 財務サマリー（売上・利益・キャッシュ）
2. COO Agent → オペレーション状況（タスク・クライアント）
3. CMO Agent → マーケティング数値（PV・CVR・検索順位）

## 呼び出し方法
各エージェントのSKILL.mdを参照し、以下のコマンドを順次実行:
- `.claude/skills/cfo/SKILL.md` の `/cfo pl` を実行
- `.claude/skills/coo/SKILL.md` の `/coo tasks` を実行
- `.claude/skills/cmo/SKILL.md` の `/cmo report` を実行

## 出力形式
- Slack投稿用: マークダウン形式
- ブラウザ用: ceo-dashboard.html を生成
- どちらの形式で出力するかはコマンド引数で指定

## コマンド
- `/ceo` → 経営ダッシュボード（Slack形式）
- `/ceo html` → HTML形式のダッシュボード生成
- `/ceo summary` → 3行エグゼクティブサマリーのみ

## KPIカスタマイズ
表示するKPIは config/ceo-kpis.yaml で変更可能
```

## サブエージェントの呼び出しフロー

CEO Agentが実行されると、内部で以下の流れが走ります。

```
/ceo コマンド実行
    │
    ├─ 1. CFO Agent 実行
    │     └─ freee API → PL・CF取得 → 財務サマリー生成
    │
    ├─ 2. COO Agent 実行
    │     └─ tasks/ YAML読込 → 進捗集計 → 遅延チェック
    │
    ├─ 3. CMO Agent 実行
    │     └─ GA4 + GSC API → 数値取得 → 分析レポート
    │
    └─ 4. 統合処理
          └─ 3つの報告をマージ → ダッシュボード生成
              → アクション提案（参考情報として）
```

## ダッシュボードHTML構造の例

`/ceo html` で生成されるHTMLの骨格です。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>CEO Dashboard - 2026/04/09</title>
  <style>
    body { font-family: 'Hiragino Sans', sans-serif; max-width: 960px; margin: 0 auto; padding: 20px; }
    .section { border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 16px 0; }
    .section h2 { margin-top: 0; font-size: 18px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .kpi-card { background: #f8f9fa; padding: 16px; border-radius: 6px; text-align: center; }
    .kpi-value { font-size: 28px; font-weight: bold; }
    .kpi-label { font-size: 13px; color: #666; }
    .trend-up { color: #16a34a; }
    .trend-down { color: #dc2626; }
    .action-item { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px; margin: 8px 0; }
  </style>
</head>
<body>
  <h1>経営ダッシュボード</h1>
  <p>生成日時: 2026-04-09 08:00 JST</p>

  <div class="section">
    <h2>財務サマリー（CFO）</h2>
    <div class="kpi-grid">
      <!-- KPIカードがここに動的生成される -->
    </div>
  </div>

  <div class="section">
    <h2>オペレーション（COO）</h2>
    <!-- タスク進捗テーブル -->
  </div>

  <div class="section">
    <h2>マーケティング（CMO）</h2>
    <!-- PV・CVR・検索順位 -->
  </div>

  <div class="section">
    <h2>アクション提案（参考）</h2>
    <div class="action-item">
      <!-- AI生成のアクション提案 -->
    </div>
  </div>
</body>
</html>
```

## KPIのカスタマイズ

表示するKPIは `config/ceo-kpis.yaml` で変更できます。

```yaml
# config/ceo-kpis.yaml
finance:
  - key: "revenue"
    label: "売上高"
    show_trend: true
  - key: "operating_profit"
    label: "営業利益"
    show_trend: true
  - key: "cash_balance"
    label: "キャッシュ残高"
    show_trend: false

operations:
  - key: "active_projects"
    label: "進行中プロジェクト"
  - key: "overdue_tasks"
    label: "期限超過タスク"
    alert_threshold: 1    # 1件以上で赤表示

marketing:
  - key: "weekly_pv"
    label: "週間PV"
    show_trend: true
  - key: "cvr"
    label: "CVR"
    show_trend: true
```

業種やビジネスモデルに合わせて、不要なKPIを削除したり、独自の指標を追加できます。

---step---

## 全体を1画面で見る

CFOの財務データ、COOの運営状況、CMOのマーケ数値。バラバラだった情報が1つのダッシュボードにまとまります。

```
claude "/ceo ダッシュボードを生成して"
```

これがOpenClawの真価です。**社長が見るべき画面は、これ1つだけ。**

## 実装のポイント

- **CEOダッシュボードは「サマリー」に徹する**: 詳細データは各CxOエージェントに聞けばよい。CEOは全体像を30秒で把握できることが目的
- **アクション提案は「参考情報」**: AIが出す提案は仮説であり、経営判断は人間が行う。これをSKILL.mdに明記することで、過信を防ぐ
- **HTML形式はローカルで開く**: 生成されたHTMLファイルをブラウザで開くだけ。Webサーバーは不要
- **サブエージェントの実行順序**: CFO→COO→CMOの順で実行される。1つが失敗しても残りは実行され、失敗箇所は「データ取得失敗」と表示される

右のターミナルにコピペして Enter を押してください。
