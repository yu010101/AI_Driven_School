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

---step---

## CMOのSKILL.mdを作ろう

GA4でアクセス解析、GSCで検索順位チェック。この2つのAPIを連携するだけで、マーケ担当者1人分の仕事をAIが代行します。

```
claude "CMOエージェントのSKILL.mdを作って。GA4でPV・CVR分析、GSCで検索順位チェック、週次マーケレポート"
```

右のターミナルにコピペして Enter を押してください。
