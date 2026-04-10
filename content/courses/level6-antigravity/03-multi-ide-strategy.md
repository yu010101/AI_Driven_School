---
title: "マルチIDE戦略"
step: 3
totalSteps: 3
expectedCommand: "claude \"チームメンバーがCursor派とClaude Code派に分かれている場合のスキル共有戦略を設計して\""
acceptableCommands:
  - "claude 'チームメンバーがCursor派とClaude Code派に分かれている場合のスキル共有戦略を設計して'"
simulatedOutput: |

  📋 マルチIDE スキル共有戦略

  ━━ 推奨構成 ━━━━━━━━━━━━━━━━━━

  1. スキルをGitリポジトリで管理
     → company-skills/ リポジトリに全SKILL.md

  2. 各メンバーは好みのIDEを使う
     - 吉田: Claude Code
     - 田中: Cursor
     - 鈴木: Windsurf

  3. git pull するだけで全員同じスキル
     → 新スキル追加もpush一発で全員に展開

  4. MCP設定だけ各自のIDEで初回設定
     → freee/Slack/GA4のAPIキーを登録

  ✓ multi-ide-strategy.md に保存しました

  🏆 全レベル完了！あなたは黒帯です。
     AIで経営を動かす力を手に入れました。
hint: "claude \"チームメンバーがCursor派とClaude Code派に分かれている場合の...\" と入力してください"
---

## チーム全員が好きなIDEを使える

「うちはCursor派」「自分はClaude Code派」。もう問題になりません。SKILL.mdという共通言語があるから、**好きなツールで同じスキルが動く**。ツール強制はチームの生産性を下げます。

:::before-after{before="全員同じツール強制" after="好きなIDE、同じスキル"}

### Gitベースのスキル共有ワークフロー

チームでスキルを共有する推奨リポジトリ構成です。

```
company-skills/           ← 共有リポジトリ（全員がアクセス）
├── skills/
│   ├── estimate/
│   │   └── SKILL.md      ← 見積もりスキル
│   ├── invoice/
│   │   └── SKILL.md      ← 請求書スキル
│   ├── cfo/
│   │   └── SKILL.md      ← 経理スキル
│   └── ceo/
│       └── SKILL.md      ← 経営レポートスキル
├── CLAUDE.md              ← プロジェクト共通設定
└── README.md              ← スキル一覧と使い方
```

各開発者のローカル環境：
```
~/.claude/
├── settings.json          ← IDE固有のMCP設定（個人管理）
└── skills/ → company-skills/skills/  ← シンボリックリンク or git clone
```

**ポイント：スキル定義は共有リポジトリ、MCP設定は個人管理。** これで全員が同じスキルを使いつつ、IDEは自由に選べます。

### 新メンバーのオンボーディング手順

新しいメンバーがチームに参加したときの手順です。

1. **スキルリポジトリをclone** — `git clone git@github.com:company/company-skills.git`
2. **好みのIDEをインストール** — Claude Code / Cursor / Windsurf / Gemini CLI、何でもOK
3. **スキルフォルダを配置** — IDEが認識する場所にSKILL.mdを配置
4. **MCP設定を登録** — freee/Slack等のAPIキーを自分のIDEに設定
5. **動作テスト** — `/estimate` `/invoice` を実行して正常動作を確認

所要時間：約30分。以前は「ツールの使い方研修」に半日かけていたのが、スキルが共通言語になったおかげで大幅に短縮されます。

### IDE固有のクセへの対処法

IDEによって微妙な挙動の違いがあります。

- **Cursor** — SKILL.mdの読み込みパスが異なる場合がある。`.cursor/skills/` に配置
- **Windsurf** — エディタ内のAIフローに組み込まれるため、トリガー方法が若干異なる
- **Gemini CLI** — MCP設定のフォーマットがJSON5で若干異なる
- **GitHub Copilot** — Copilot Chatからスキルを呼び出す形式になる

対処法はシンプルです。各IDEの設定ドキュメントでスキルフォルダの場所を確認し、そこにSKILL.mdを配置すればOK。スキルの中身を書き換える必要はありません。

---step---

## Level 4-6の旅を振り返る

```
claude "チームメンバーがCursor派とClaude Code派に分かれている場合のスキル共有戦略を設計して"
```

スキルをGitリポジトリで一元管理すれば、`git pull` だけでチーム全員に最新スキルが届きます。IDE選びはもう個人の好みの問題です。

### Level 4-6 キャップストーンまとめ

ここまでの3レベルで学んだことを整理します。

| Level | テーマ | 学んだこと |
|-------|--------|-----------|
| Level 4 | Skills基礎 | スキルのインストール・作成・組み合わせ・SkillGraph設計 |
| Level 5 | OpenClaw経営OS | 複数エージェントによる経営自動化 |
| Level 6 | マルチIDE互換 | マルチIDE対応・ポータブルスキル・チーム戦略 |

**核心メッセージ：ビジネスロジックをSKILL.mdに書き、Gitで管理し、どのIDEからでも呼び出す。** これが現代のAI駆動経営のスタンダードです。

全レベル完了。白帯から黒帯まで、AIで経営を動かすスキルを習得しました。これはRadineerが実際に使っているシステムそのものです。

右のターミナルにコピペして Enter を押してください。
