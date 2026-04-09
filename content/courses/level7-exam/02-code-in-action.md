---
title: "Claude Code in Action 模擬テスト"
step: 2
totalSteps: 5
expectedCommand: "claude \"meeting.txtを読んで要約して\""
acceptableCommands: ["claude 'meeting.txtを読んで要約して'", "claude \"meeting.txt を読んで要約して\"", "claude \"meeting.txtを読んで、要約して\""]
simulatedOutput: "\n📄 meeting.txt を読み込み中...\n\n✅ 正解！ファイルを読んで処理するパターンです。\n\nClaude Code in Action の重要ポイント:\n• ファイル名を指示に含めれば自動で読み込む\n• 出力形式を指定すると精度UP\n• CLAUDE.mdで文脈を事前設定できる\n\n📝 公式認定ポイント:\n  Claude Codeは既存ファイルを読み取り、\n  内容を理解した上で処理できる"
hint: "meeting.txtを読んで要約するコマンドは？ claude \"...\" の形式で"
---

## 🏆 認定模擬テスト ② — Claude Code in Action

**問題：会議の議事録ファイル meeting.txt を読み込んで要約させるコマンドを書いてください。**

:::before-after{before="手動で議事録を読んで要約 30分" after="AIに任せて 10秒"}

:::flow{steps="📄 meeting.txt → 🤖 Claude Code → 📋 要約完成"}

---step---

## 回答を入力してください

```
claude "meeting.txtを読んで要約して"
```

ファイル名を含めた指示を `claude "..."` の形式で入力してください。
