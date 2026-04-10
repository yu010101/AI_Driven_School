---
title: "SKILL.mdの互換性"
step: 2
totalSteps: 3
expectedCommand: "claude \"うちのCFOスキルがCursorやWindsurfでも動くか検証して\""
acceptableCommands:
  - "claude 'うちのCFOスキルがCursorやWindsurfでも動くか検証して'"
simulatedOutput: |

  🔍 CFOスキル互換性チェック中...

  .claude/skills/cfo/SKILL.md を解析:

  ✅ メタデータ（name, description）: 互換
  ✅ トリガー定義: 互換
  ✅ ステップ手順: 互換
  ✅ 出力フォーマット: 互換
  ⚠️ MCP連携（freee API）: IDE側の設定が必要

  結果: Cursor / Windsurf / Gemini CLIで
  そのまま動作します。

  MCP連携部分は各IDEの設定画面から
  同じAPIキーを登録すればOKです。

  ✓ compatibility-report.md に保存しました
hint: "claude \"うちのCFOスキルがCursorやWindsurfでも動くか検証して\" と入力してください"
---

## 作ったスキルはどこでも動く

Level 4-5で作ったSKILL.mdファイル。これはClaude Code専用ではありません。**どのAI IDEでもそのまま動きます**。スキルのロジック自体がポータブルだからです。

:::flow{steps="SKILL.md作成 → Claude Code / Cursor / Windsurf → 同じ結果"}

### 互換性チェックの手順

既存のスキルが他のIDEでも動くか、以下の手順で確認しましょう。

**ステップ1：SKILL.mdの構文チェック**
SKILL.mdが標準的なMarkdown形式で書かれているか確認します。IDE固有の記法（Claude Code専用ディレクティブなど）が含まれていなければOKです。

**ステップ2：MCP依存の洗い出し**
スキルが外部APIを呼んでいる場合、その部分はIDE側で再設定が必要です。

**ステップ3：移行先IDEでテスト実行**
SKILL.mdファイルを配置して、トリガーコマンドを実行。期待通りの出力が出るか確認します。

### 移行できるもの・できないもの

| 項目 | 移行可否 | 備考 |
|------|---------|------|
| SKILL.mdのロジック | ✅ そのまま移行 | テキストファイルなのでコピーするだけ |
| ルール定義 | ✅ そのまま移行 | 「税込表記」「バッファ3日」等 |
| 出力フォーマット指定 | ✅ そのまま移行 | Markdown/CSV/JSON等 |
| MCP接続設定 | ⚠️ 再登録が必要 | APIキーを新しいIDEの設定画面で入力 |
| IDE固有のショートカット | ❌ 移行不可 | 各IDEで再設定が必要 |
| CLAUDE.md（プロジェクト設定）| ✅ ほぼ移行可 | IDE固有記法がなければそのまま |

### IDE切り替え時のマイグレーションチェックリスト

新しいIDEに移行する際は、以下を順番に確認しましょう。

1. ☐ SKILL.mdファイルを新IDEのスキルフォルダにコピー
2. ☐ 各スキルのトリガーコマンドが動作するか確認
3. ☐ MCP連携が必要なスキルのAPIキーを再登録
4. ☐ 出力結果が以前のIDEと同じか比較テスト
5. ☐ チームメンバーに移行完了を通知

---step---

## MCP連携だけはIDE側の設定が必要

スキルのロジック（SKILL.md）は完全互換です。ただし、freee APIやSlack APIなどの**MCP連携部分**は、各IDEの設定画面でAPIキーを登録する必要があります。一度設定すればOKです。

```
claude "うちのCFOスキルがCursorやWindsurfでも動くか検証して"
```

### 実際のシナリオ：新メンバーが別のIDEを使いたい場合

田中さんがチームに加入。普段はCursorを使っている。チームのスキルはClaude Codeで作られている。この場合：

1. **田中さんがリポジトリをclone** — スキルファイルも一緒に取得される
2. **Cursorでスキルフォルダを認識** — SKILL.md形式は互換
3. **MCP設定だけ手動で追加** — freee/Slack等のAPIキーを自分の環境に登録
4. **動作確認** — `/estimate` を実行して正しい出力が出ればOK

所要時間は約15分。IDEの違いはもはや障壁ではありません。

右のターミナルにコピペして Enter を押してください。
