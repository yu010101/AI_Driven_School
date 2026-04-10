---
title: "Hooks — 自動化トリガーを仕掛ける"
step: 1
totalSteps: 4
expectedCommand: "claude \"ファイル保存時に自動でESLintを実行するHookを設定して\""
acceptableCommands: ["claude 'ファイル保存時に自動でESLintを実行するHookを設定して'"]
simulatedOutput: "📁 .claude/settings.json を更新します...\n\n{\n  \"hooks\": {\n    \"after_edit\": [\n      {\n        \"command\": \"eslint --fix $FILE\",\n        \"description\": \"ファイル編集後に自動lint\"\n      }\n    ]\n  }\n}\n\n✓ Hook設定完了。ファイル編集のたびにESLintが自動実行されます\n\n📝 公式認定ポイント:\n  Hooksは Courseraの3つ目のモジュール全体で扱われる重要トピック\n  pre_tool / post_tool / notification の3種類を覚えよう"
hint: "claude \"ファイル保存時に自動でESLintを実行するHookを設定して\" と入力してください"
relatedArticles:
  - title: "Claude Codeの高度なデバッグ手法"
    path: "/knowledge/claude-code/advanced-debugging"
---

> **前提知識**: Level 0-1完了。JSONファイルの編集ができること。

## Hooks — Claude Codeの「自動トリガー」

Hooks = ファイル編集・コミット・ツール実行のタイミングで**自動処理を挟む仕組み**。

:::before-after{before="毎回手動でlint実行" after="編集するたび自動lint"}

公式認定では Hooks はモジュール全体で扱われる重要トピック。3種類のHookタイプを理解しておこう。

### Hookの全体像

Hookとは、Claude Codeが特定のアクションを実行する**前後**に、あなたが定義したスクリプトやコマンドを自動実行する仕組みです。CI/CDのパイプラインに近い考え方で、開発ワークフローを自動化できます。

### 3種類のHookタイプ詳細

| Hook タイプ | 発火タイミング | 主な用途 |
|---|---|---|
| **PreToolUse** | ツール実行の**直前** | バリデーション、権限チェック、バックアップ作成 |
| **PostToolUse** | ツール実行の**直後** | lint実行、テスト実行、フォーマット整形 |
| **Notification** | 特定イベント発生時 | Slack通知、メール送信、ログ記録 |

### 実際の settings.json 設定例

```json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "cp \"$CLAUDE_FILE_PATH\" \"$CLAUDE_FILE_PATH.bak\""
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "eslint --fix \"$CLAUDE_FILE_PATH\""
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Codeの処理が完了\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

### 実務での使い方

**ケース1: 自動lint + フォーマット（フロントエンド開発）**
PostToolUseで `eslint --fix` と `prettier --write` を連続実行。Claudeがファイルを編集するたびにコード品質を自動担保。

**ケース2: コミット前の自動テスト**
PreToolUseの `matcher` を `"Bash"` にして、`git commit` を含むコマンド実行前にユニットテストを走らせる。テスト失敗時はコミットをブロック。

**ケース3: Slack通知でチーム共有**
Notificationフックで `curl -X POST` を使い、Slack Webhookに処理完了を通知。チームメンバーがリアルタイムで進捗を把握できる。

```bash
# Slack通知の例
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Claude Codeがデプロイ準備を完了しました"}' \
  https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**ケース4: 自動バックアップ**
PreToolUseで編集対象ファイルのバックアップを `.bak` として保存。万が一の変更ミスに備える。

### よくある失敗

**1. 無限ループに陥る**
PostToolUseでファイルを編集するHookを設定すると、その編集がさらにHookを発火させ無限ループに。`matcher` を厳密に設定して回避すること。

**2. Hookがブロッキングして応答が止まる**
重い処理（大規模テストスイートなど）をHookに入れると、Claude Codeの応答が長時間止まる。重い処理はバックグラウンド実行（`&` をつける）にするか、Notificationフックに移す。

**3. 環境変数の未設定**
`$CLAUDE_FILE_PATH` などのHook専用変数を使わず、ハードコードしたパスを書いてしまう。プロジェクトが変わると動かなくなる。

**4. matcherの設定ミス**
`matcher` を空文字列 `""` にすると全ツールに発火する。意図しないツール実行時にもHookが走り、予期しない動作の原因に。必ず対象ツール名を明示する。

**5. エラーハンドリングの欠如**
Hook内のコマンドが失敗してもデフォルトでは無視される。重要な処理には `set -e` やエラーチェックを入れる。

---step---

## Hookを設定してみよう

Hookには3つのタイプがある：

- **PreToolUse** — ツール実行の前に処理を挟む（バリデーション、バックアップ）
- **PostToolUse** — ツール実行の後に処理を挟む（lint、テスト、フォーマット）
- **Notification** — 特定イベントで通知を送る（Slack、デスクトップ通知）

設定は `.claude/settings.json` の `hooks` キーに記述します。`matcher` でどのツールに対して発火するかを制御します。

```
claude "ファイル保存時に自動でESLintを実行するHookを設定して"
```

右のターミナルにコピペして Enter を押してください。
