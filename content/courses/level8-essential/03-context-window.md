---
title: "Context Window — AIの記憶容量を理解する"
step: 3
totalSteps: 4
expectedCommand: "claude \"現在のContext Windowの使用量を確認して\""
acceptableCommands: ["claude 'Context Windowの使用量を確認して'", "claude '現在のContext Windowの使用量を確認して'"]
simulatedOutput: "📊 Context Window 使用状況\n\n┌──────────────────────────────────┐\n│ ████████████░░░░░░░░ 62% 使用中  │\n└──────────────────────────────────┘\n\n使用: 124,000 / 200,000 トークン\n\n内訳:\n• システム指示: 8,000 (4%)\n• CLAUDE.md: 3,200 (1.6%)\n• 会話履歴: 98,000 (49%)\n• ファイル内容: 14,800 (7.4%)\n\n💡 ヒント:\n  会話が長くなったら /clear で履歴をリセット\n  大きなファイルは部分読み込みが効率的\n\n📝 公式認定ポイント:\n  Context Windowの管理は効率的な利用の鍵"
hint: "claude \"現在のContext Windowの使用量を確認して\" と入力してください"
---

## Context Window — AIの記憶容量を理解する

Context Window = AIの**短期記憶**。一度に覚えられる量に限りがある。超えると古い情報から忘れていく。

:::before-after{before="なぜか急にAIが忘れる" after="トークン管理で安定動作"}

公式認定でContext管理は必出テーマ。トークンの概念と最適化手法を押さえよう。

---step---

## Context Windowの使用量を確認しよう

効率的なContext管理のコツ：

- `/clear` で不要な会話履歴をリセット
- 大きなファイルは**部分読み込み**で節約
- CLAUDE.mdの指示は簡潔に書く

```
claude "現在のContext Windowの使用量を確認して"
```

右のターミナルにコピペして Enter を押してください。
