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

---step---

## SkillGraphで業務全体をAI化する

```
claude "うちのSkillGraphを可視化して。/estimate → /invoice → /cfo の流れで"
```

SkillGraphがあれば、どのスキルがどの順番で動くか一目瞭然。新しいスキルを追加する場所も明確になります。Level 5では、これを**OpenClaw経営OS**として本格運用します。

右のターミナルにコピペして Enter を押してください。
