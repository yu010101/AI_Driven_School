---
title: "Agent Skills 模擬テスト"
step: 4
totalSteps: 5
expectedCommand: "claude /find-skills"
acceptableCommands: ["claude '/find-skills'", "claude /find-skills"]
simulatedOutput: "\n🔍 スキル検索中...\n\n✅ 正解！スキルの検索コマンドです。\n\nAgent Skills認定の重要ポイント:\n• Skills = SKILL.mdで定義する拡張モジュール\n• /find-skills で利用可能なスキルを検索\n• /install-skill でインストール\n• 自社専用スキルも作成可能\n• SKILL.mdは他のAI IDE(Antigravity等)でも互換\n\n📝 公式認定ポイント:\n  SKILL.mdフォーマットはクロスIDE標準。\n  一度作れば複数のAI環境で再利用できる"
hint: "利用可能なスキルを検索するコマンドは？ /から始まります"
---

## 🏆 認定模擬テスト ④ — Agent Skills

**問題：Claude Codeで利用可能なAgent Skillsを検索するコマンドは？**

Skillsは SKILL.md で定義する拡張モジュールです。

:::flow{steps="🔍 スキル検索 → 📦 インストール → ⚡ 即座に利用可能"}

> SKILL.md形式はAntigravity等、他のAI IDEでも互換性があります。

---step---

## 回答を入力してください

```
claude /find-skills
```

スキルを検索するスラッシュコマンドを入力してください。
