---
title: "CFOエージェントを作る"
step: 2
totalSteps: 7
expectedCommand: "claude \"CFOエージェントのSKILL.mdを作って。freeeからPLを取得、キャッシュフロー予測、月次レポート生成\""
acceptableCommands:
  - "claude \"CFOエージェントのSKILL.mdを作って。freeeからPLを取得、キャッシュフロー予測、月次レポート生成\""
simulatedOutput: |
  # CFOエージェント SKILL.md を作成します

  `.claude/skills/cfo/SKILL.md` を作成中...

  ```markdown
  # CFO Agent - 最高財務責任者

  ## 役割
  財務データの自動取得・分析・レポート生成を担当

  ## データソース
  - freee会計 API（PL・BS・仕訳データ）
  - freee請求書 API（未決済・入金状況）

  ## 定期タスク
  1. 毎日: 未決済チェック → Slack通知
  2. 毎週: キャッシュフロー予測更新
  3. 毎月: 月次PLレポート生成

  ## コマンド
  - `/cfo pl` → 損益計算書を生成
  - `/cfo cf` → キャッシュフロー予測
  - `/cfo 未決済` → 未決済一覧

  ## freee API連携
  - エンドポイント: api.freee.co.jp/api/1
  - 認証: OAuth2.0
  - 取得項目: 勘定科目別損益、取引先別残高
  ```

  ✓ .claude/skills/cfo/SKILL.md を作成しました
hint: "claude \"CFOエージェントのSKILL.mdを作って...\" と入力してください"
---

# CFOエージェントを作る

CFOエージェントは、あなた専属の**24時間財務アナリスト**です。freee会計と連携して、数字を自動で追いかけます。

:::flow
steps:
  - "📊 freee API"
  - "🤖 CFOエージェント"
  - "💰 PL・CF・月次レポート"
:::

---step---

## SKILL.mdでエージェントを定義する

Claude Codeの「スキル」機能を使い、CFOの仕事内容を定義します。freee APIからPLを取得し、キャッシュフローを予測し、月次レポートを生成する指示書です。

```
claude "CFOエージェントのSKILL.mdを作って。freeeからPLを取得、キャッシュフロー予測、月次レポート生成"
```

右のターミナルにコピペして Enter を押してください。
