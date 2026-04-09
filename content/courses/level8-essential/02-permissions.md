---
title: "Permission Modes — セキュリティを守る"
step: 2
totalSteps: 4
expectedCommand: "claude \"現在のPermission Modeを確認して\""
acceptableCommands: ["claude 'Permission Modeを確認して'", "claude '現在のPermission Modeを確認して'"]
simulatedOutput: "現在のPermission Mode: Default\n\n利用可能なモード:\n• Default — ファイル読み取りは自動、書き込みは確認\n• Permissive — 全操作を自動許可（上級者向け）\n• Restrictive — 全操作に確認が必要（セキュリティ重視）\n\n推奨: 企業利用では Default を使用\n\n📝 公式認定ポイント:\n  Permission Modeはセキュリティの要。\n  チーム導入時は必ず設定する"
hint: "claude \"現在のPermission Modeを確認して\" と入力してください"
---

## Permission Modes — セキュリティを守る

Permission = Claude Codeが**何を勝手にやっていいか**のルール。企業利用では必須の設定。

:::flow{steps="Restrictive（全確認） → Default（推奨） → Permissive（全自動）"}

公式認定の頻出テーマ：企業利用時のセキュリティポリシー設定。チーム導入ではモード選択が問われる。

---step---

## Permission Modeを確認しよう

3つのモードの違い：

- **Restrictive** — 全操作に確認が必要。セキュリティ最優先
- **Default** — 読み取りは自動、書き込みは確認。バランス型
- **Permissive** — 全操作を自動許可。上級者・個人開発向け

```
claude "現在のPermission Modeを確認して"
```

右のターミナルにコピペして Enter を押してください。
