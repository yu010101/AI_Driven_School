---
title: "マルチIDE互換とは？"
step: 1
totalSteps: 3
expectedCommand: "claude \"SKILL.mdフォーマットが使えるAI IDEの一覧を教えて\""
acceptableCommands:
  - "claude 'SKILL.mdフォーマットが使えるAI IDEの一覧を教えて'"
simulatedOutput: |

  🔌 SKILL.md 互換 AI IDE一覧

  ┌──────────────────┬──────────────┬──────────┐
  │ IDE              │ 開発元        │ 互換性    │
  ├──────────────────┼──────────────┼──────────┤
  │ Claude Code      │ Anthropic    │ ✅ 完全   │
  │ Cursor           │ Cursor Inc   │ ✅ 対応   │
  │ Windsurf         │ Codeium      │ ✅ 対応   │
  │ Gemini CLI       │ Google       │ ✅ 対応   │
  │ GitHub Copilot   │ GitHub       │ ✅ 対応   │
  └──────────────────┴──────────────┴──────────┘

  💡 SKILL.mdで作ったスキルは
    どのIDEでもそのまま動きます
hint: "claude \"SKILL.mdフォーマットが使えるAI IDEの一覧を教えて\" と入力してください"
---

> **前提知識**: Level 4-5完了。複数のAI IDEに興味がある方向け。

## 「マルチIDE互換」とは何か

現在、AI統合開発環境（AI IDE）は急速に増えています。Claude Code、Cursor、Windsurf、Gemini CLI、GitHub Copilotなど、選択肢は豊富です。重要なのは、**SKILL.mdフォーマットとの互換性**が各ツールで実現されていることです。

つまり、あなたがLevel 4-5で作ったスキルは、別のAI IDE環境でもそのまま動きます。

:::before-after{before="1つのIDEに依存" after="どのAI IDEでも動く"}

### なぜマルチIDE互換が重要か

従来のIDEは特定のエコシステムに縛られていました。VS Code → Microsoft、Xcode → Apple、というように。しかしSKILL.mdは**その制約から解放される**仕組みです。スキルが特定のツールに縛られない世界を作る、というコンセプトです。

### SKILL.mdのポータビリティが意味すること

SKILL.mdはただのMarkdownファイルです。だからこそ強い。

- **特定のIDEに依存しない** — テキストファイルなので、どの環境でも読める
- **ビジネスロジックはIDE非依存** — 「税込表記」「バッファ3日」はツールに関係ない
- **バージョン管理が簡単** — Gitで管理すれば変更履歴も追える

ここが最も重要な洞察です。**ビジネスルールをSKILL.mdに書いておけば、明日IDEが変わっても、あなたの資産は失われません。**

### AI IDE比較表

| 項目 | Claude Code | Cursor | Windsurf | Gemini CLI | GitHub Copilot |
|------|------------|--------|----------|-----------|----------------|
| 開発元 | Anthropic | Cursor Inc | Codeium | Google | GitHub |
| SKILL.md互換 | ✅ ネイティブ | ✅ 対応 | ✅ 対応 | ✅ 対応 | ✅ 対応 |
| MCP対応 | ✅ 完全 | ✅ 対応 | ✅ 対応 | ⚠️ 一部 | ✅ 対応 |
| ターミナル統合 | ✅ CLI直結 | ✅ エディタ内 | ✅ エディタ内 | ✅ CLI | ✅ エディタ内 |
| 強み | 自然言語精度 | コード補完 | フロー維持 | 大規模コンテキスト | GitHub統合 |
| 向いている人 | CLI好き | エディタ好き | AI初心者 | Google圏ユーザー | GitHub圏ユーザー |

どのIDEを選んでも、SKILL.mdで定義したスキルはそのまま動きます。

---step---

## SKILL.md = AIエージェントの共通言語

SKILL.mdは「AIエージェントに何をさせるか」を書くファイルです。これが事実上の**ユニバーサルスタンダード**になりました。Claude Code、Cursor、Windsurf、Gemini CLI、GitHub Copilot。どれでも同じSKILL.mdが動きます。

```
claude "SKILL.mdフォーマットが使えるAI IDEの一覧を教えて"
```

### IDE選びはもう「好み」の問題

以前は「どのIDEを使うか」がチームの技術選定で大きな議題でした。今は違います。SKILL.mdという共通言語があるおかげで、各メンバーが好きなIDEを使っても、同じスキルが動きます。

重要なのはIDEの選択ではなく、**SKILL.mdに書かれたビジネスロジックの品質**です。良いスキルを作れば、どのIDEでも良い結果が出ます。

右のターミナルにコピペして Enter を押してください。
