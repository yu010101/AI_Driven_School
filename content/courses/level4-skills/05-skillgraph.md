---
title: "SkillGraph — スキル依存関係を設計する"
step: 5
totalSteps: 5
expectedCommand: "claude \"うちのSkillGraphを可視化して。/estimate → /invoice → /cfo の流れで\""
acceptableCommands: ["claude 'うちのSkillGraphを可視化して。/estimate → /invoice → /cfo の流れで'"]
simulatedOutput: "\n🗺️ SkillGraph を構築中...\n\n✓ skillgraph.md に保存しました\n\n┌─ SkillGraph ───────────────────────┐\n│                                    │\n│  📝 /estimate（見積もり作成）       │\n│       ↓ 受注確定                   │\n│  💳 /invoice（請求書発行）          │\n│       ↓ 入金確認                   │\n│  💰 /cfo（freee計上）              │\n│       ↓ 月末                       │\n│  📊 /ceo（経営ダッシュボード）     │\n│                                    │\n└────────────────────────────────────┘\n\nスキル数: 4 / 依存関係: 3\n\n🎉 Level 4 完了！\nあなたはSkillsマスターです。\n次の Level 5 では OpenClaw経営OS に挑戦します。"
hint: "claude \"うちのSkillGraphを可視化して...\" と入力してください"
---

## 自社のAIワークフローを地図にする

SkillGraphは**スキル同士の依存関係を可視化した設計図**です。見積もりから請求、計上まで、業務の流れをそのままAIワークフローにします。

:::flow{steps="📝 /estimate 見積もり → 💳 /invoice 請求書 → 💰 /cfo freee計上"}

### SkillGraphの全体像（テキスト依存関係図）

```
営業フェーズ:
  /sales-pipeline → /estimate → /contract
       ↓ 受注
納品フェーズ:
  /project-manage → /invoice
       ↓ 入金確認
経理フェーズ:
  /cfo → /ceo（経営ダッシュボード）
```

これが1つの会社の「案件獲得から経営報告まで」の全フローです。

### 自社のワークフローをSkillGraphに変換する方法

どの会社でも、以下の3ステップでSkillGraphを設計できます。

**ステップ1：業務の流れを書き出す**
紙やホワイトボードに、日常業務の流れを時系列で書き出します。「問い合わせ → 見積もり → 受注 → 納品 → 請求 → 入金」のように。

**ステップ2：各業務にスキル名を割り当てる**
書き出した業務それぞれに `/スキル名` を割り当てます。最初は主要な業務だけでOKです。

**ステップ3：依存関係を矢印で繋ぐ**
「見積もりが確定したら請求書を発行」のように、前後関係を矢印で結びます。

### ボトルネックの見つけ方

SkillGraphが完成したら、以下のポイントでボトルネックを探しましょう。

- **手動ステップが残っている箇所** — スキル化されていない部分が遅延の原因
- **1人に集中している承認フロー** — その人が不在だと全体が止まる
- **データの受け渡しが曖昧な箇所** — 出力形式が統一されていない部分

---step---

## SkillGraphで業務全体をAI化する

```
claude "うちのSkillGraphを可視化して。/estimate → /invoice → /cfo の流れで"
```

SkillGraphがあれば、どのスキルがどの順番で動くか一目瞭然。新しいスキルを追加する場所も明確になります。

### 実例：営業パイプラインの完全スキル化

```
/sales-pipeline → /estimate → /invoice → /cfo → /ceo
```

| ステップ | スキル | 自動化される作業 |
|---------|--------|----------------|
| リード管理 | `/sales-pipeline` | 案件ステータス更新・フォローアップ通知 |
| 見積もり | `/estimate` | 税込計算・バッファ日数・フォーマット統一 |
| 請求書 | `/invoice` | 振込先・支払条件・PDF生成 |
| 経理処理 | `/cfo` | freee仕訳計上・消込チェック |
| 経営報告 | `/ceo` | PL・KPIダッシュボード自動生成 |

### 次のステップ：Level 5 OpenClawへ

SkillGraphで設計した依存関係を、Level 5では**OpenClaw経営OS**として本格運用します。スキル同士が自動的に連携し、人間の介入なしにワークフロー全体が動く世界です。

Level 4で学んだこと：
- スキルのインストールと作成
- 複数スキルの組み合わせ
- SkillGraphによる全体設計

この土台の上に、Level 5で「経営OS」を構築します。

右のターミナルにコピペして Enter を押してください。
