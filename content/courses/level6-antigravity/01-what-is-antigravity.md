---
title: "Antigravityとは？"
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
  │ Antigravity      │ Google       │ ✅ 完全   │
  │ Cursor           │ Cursor Inc   │ ✅ 対応   │
  │ Gemini CLI       │ Google       │ ✅ 対応   │
  │ Codex CLI        │ OpenAI       │ ✅ 対応   │
  └──────────────────┴──────────────┴──────────┘

  💡 SKILL.mdで作ったスキルは
    どのIDEでもそのまま動きます
hint: "claude \"SKILL.mdフォーマットが使えるAI IDEの一覧を教えて\" と入力してください"
---

> **前提知識**: Level 4-5完了。複数のAI IDEに興味がある方向け。

## 「Antigravity」とは何か

まず誤解を解きましょう。「Antigravity」は特定の製品名ではなく、GoogleのProject IDX / AI IDEエコシステム全体を指す概念です。Googleが推進するAI統合開発環境の取り組みの中で、**既存のSKILL.mdフォーマットとの互換性**を実現したことが最大のポイントです。

つまり、あなたがLevel 4-5で作ったスキルは、Google側の環境でもそのまま動きます。

:::before-after{before="1つのIDEに依存" after="どのAI IDEでも動く"}

### なぜ「反重力（Antigravity）」という名前か

従来のIDEは特定のエコシステムに「引力」で縛られていました。VS Code → Microsoft、Xcode → Apple、というように。Antigravityは「その引力から解放される」というコンセプトです。スキルが特定のツールに縛られない世界を作る、という意味が込められています。

### SKILL.mdのポータビリティが意味すること

SKILL.mdはただのMarkdownファイルです。だからこそ強い。

- **特定のIDEに依存しない** — テキストファイルなので、どの環境でも読める
- **ビジネスロジックはIDE非依存** — 「税込表記」「バッファ3日」はツールに関係ない
- **バージョン管理が簡単** — Gitで管理すれば変更履歴も追える

ここが最も重要な洞察です。**ビジネスルールをSKILL.mdに書いておけば、明日IDEが変わっても、あなたの資産は失われません。**

### AI IDE比較表

| 項目 | Claude Code | Cursor | Gemini CLI | Antigravity |
|------|------------|--------|-----------|-------------|
| 開発元 | Anthropic | Cursor Inc | Google | Google |
| SKILL.md互換 | ✅ ネイティブ | ✅ 対応 | ✅ 対応 | ✅ 完全 |
| MCP対応 | ✅ 完全 | ✅ 対応 | ⚠️ 一部 | ✅ 対応 |
| ターミナル統合 | ✅ CLI直結 | ✅ エディタ内 | ✅ CLI | ✅ ブラウザ |
| 強み | 自然言語精度 | コード補完 | 大規模コンテキスト | クラウド環境 |
| 向いている人 | CLI好き | エディタ好き | Google圏ユーザー | チーム開発 |

どのIDEを選んでも、SKILL.mdで定義したスキルはそのまま動きます。

---step---

## SKILL.md = AIエージェントの共通言語

SKILL.mdは「AIエージェントに何をさせるか」を書くファイルです。これが事実上の**ユニバーサルスタンダード**になりました。Claude Code、Antigravity、Cursor、Gemini CLI、Codex CLI。どれでも同じSKILL.mdが動きます。

```
claude "SKILL.mdフォーマットが使えるAI IDEの一覧を教えて"
```

### IDE選びはもう「好み」の問題

以前は「どのIDEを使うか」がチームの技術選定で大きな議題でした。今は違います。SKILL.mdという共通言語があるおかげで、各メンバーが好きなIDEを使っても、同じスキルが動きます。

重要なのはIDEの選択ではなく、**SKILL.mdに書かれたビジネスロジックの品質**です。良いスキルを作れば、どのIDEでも良い結果が出ます。

右のターミナルにコピペして Enter を押してください。
