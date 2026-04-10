---
title: "MCP 模擬テスト"
step: 3
totalSteps: 5
expectedCommand: "claude \"MCPサーバーの一覧を見せて\""
acceptableCommands: ["claude 'MCPサーバーの一覧を見せて'", "claude \"/mcp\"", "claude /mcp"]
simulatedOutput: "\n🔌 MCP一覧を表示中...\n\n✅ 正解！MCPサーバーの確認方法です。\n\nMCP認定の重要ポイント:\n• MCP = Model Context Protocol\n• 外部サービスとClaude Codeを接続する仕組み\n• Gmail, Calendar, Slack, freee等と連携可能\n• 設定は .claude/settings.json で管理\n\n📝 公式認定ポイント:\n  MCPはClaude Codeの「手足」を増やす技術。\n  APIキーを登録すれば外部サービスを操作できる"
hint: "MCPサーバーの一覧を確認するコマンドは？"
---

## 🏆 認定模擬テスト ③ — MCP

**問題：Claude Codeで利用可能なMCPサーバー（外部連携）の一覧を確認するコマンドは？**

MCPはClaude Codeの「手足」を増やす技術です。

:::flow{steps="🔌 MCP設定 → 📡 外部API接続 → 🤖 Claudeが操作"}

> Gmail・Slack・freeeなど、あらゆるサービスと連携できます。

### 追加練習問題

**Q1：MCPの正式名称は何ですか？**

A：Model Context Protocol（モデルコンテキストプロトコル）。Claude Codeと外部サービスを接続するための標準プロトコルです。MCPを通じて、AIが直接APIを呼び出し、データの取得や操作を行えます。「プロトコル」という名前が示すとおり、接続のルール（手順・形式）を定めた規格です。

**Q2：MCPサーバーの設定はどのファイルで管理されますか？**

A：`.claude/settings.json` — このファイルにMCPサーバーの接続情報（エンドポイント、APIキー等）を記述します。プロジェクトごとに異なるMCP設定を持つことが可能です。チームで共有する場合は、APIキーは各自の環境変数で管理し、settings.jsonには変数名だけを記載するのがベストプラクティスです。

**Q3：新しいMCPサーバー（例：Slack連携）を追加する手順は？**

A：(1) `.claude/settings.json` にSlack MCPサーバーの設定を追加 → (2) Slack APIトークンを環境変数に設定 → (3) Claude Codeを再起動 → (4) `claude "Slackに接続できるか確認して"` でテスト。MCPサーバーは設定ファイルに追記するだけで増やせます。追加のインストール作業は不要です。

### MCP認定 学習のコツ

- **MCPの3要素を覚える** — プロトコル（規格）、サーバー（接続先）、ツール（操作）
- **設定ファイルの場所を把握する** — `.claude/settings.json` は必ず出題される
- **セキュリティを意識する** — APIキーは環境変数で管理（settings.jsonに直書きしない）

### よくある間違い

- MCPを「プラグイン」と呼ぶ → プラグインではなくプロトコル（接続規格）
- APIキーをsettings.jsonに直書きする → 環境変数を使うのが正しい運用
- MCP設定変更後に再起動を忘れる → 設定変更後はClaude Codeの再起動が必要

### 関連レッスン

- Level 3「MCPでAIの手足を増やす」 — MCPの基本概念と設定方法
- Level 3「Gmail/Calendar連携」 — 具体的なMCPサーバー設定例

## 練習問題

**Q1**: MCPが解決する課題として最も適切なのはどれか？
A) Claude Codeの処理速度を向上させる  B) AIが外部サービスのデータを直接取得・操作できるようにする  C) プログラミング言語を増やす  D) ファイルの暗号化を行う
→ 正解: B。MCPはClaude Codeと外部サービス（Gmail、Slack、freeeなど）を接続するプロトコルです。MCPがなければ、AIはローカルファイルの操作しかできません。MCPによって「手足」が増え、メール送信やカレンダー操作など外部サービスとの連携が可能になります。

**Q2**: MCPサーバーの設定で、APIキーの管理方法として正しいのはどれか？
A) `.claude/settings.json` にAPIキーを直接記述する  B) CLAUDE.mdにAPIキーを記載する  C) 環境変数にAPIキーを設定し、settings.jsonでは変数名を参照する  D) APIキーは不要で自動認証される
→ 正解: C。APIキーを設定ファイルに直書きすると、Gitにコミットされてセキュリティリスクになります。環境変数（例: `export SLACK_TOKEN=xxx`）に設定し、settings.jsonでは `$SLACK_TOKEN` のように参照するのがベストプラクティスです。

**Q3**: 以下のMCPサービスのうち、ビジネスで最も利用頻度が高い組み合わせはどれか？
A) Gmail + Calendar + Slack  B) FTP + Telnet + IRC  C) Bluetooth + NFC + USB  D) DNS + DHCP + ARP
→ 正解: A。Gmail（メール自動化）、Calendar（スケジュール管理）、Slack（チャット連携）は、日常業務で最も頻繁に使うMCP連携先です。freee（会計）やNotion（ドキュメント管理）も人気の連携先です。

## 学習のポイント
- MCPは「Model Context Protocol」の略で、AIと外部サービスを繋ぐ標準規格
- 設定ファイルは `.claude/settings.json` に記述する
- APIキーは必ず環境変数で管理し、直書きは絶対にしない
- MCP設定変更後はClaude Codeの再起動が必要
- 対応レッスン: Level 3「MCPでAIの手足を増やす」

## 実力チェック — 応用問題

**Q4**: MCPの3つの構成要素を正しく説明しているのはどれか？
A) クライアント・サーバー・データベース  B) プロトコル（規格）・サーバー（接続先）・ツール（操作）  C) フロントエンド・バックエンド・API  D) 入力・処理・出力
→ 正解: B。プロトコルが接続のルールを定め、サーバーが外部サービスへの接続を提供し、ツールがAIから呼び出せる操作（メール送信、予定作成など）を定義します。

**Q5**: チームでMCPを運用する際のベストプラクティスとして正しいのはどれか？
A) 全員が同じAPIキーを使う  B) settings.jsonをGitにコミットし、APIキーは各自の環境変数で管理する  C) MCPサーバーは1人だけが設定すればよい  D) APIキーをSlackで共有する
→ 正解: B。settings.jsonの構造（どのサービスと接続するか）はチーム共通なのでGit管理し、APIキーは個人の環境変数で管理します。これによりセキュリティと再現性を両立できます。

## 認定試験に向けたまとめ

| 項目 | 覚えるべきこと |
|------|--------------|
| 正式名称 | Model Context Protocol |
| 設定ファイル | `.claude/settings.json` |
| APIキー管理 | 環境変数で管理（直書き厳禁） |
| 設定変更後 | Claude Codeの再起動が必要 |
| 主な連携先 | Gmail, Calendar, Slack, freee, Notion |
| 3要素 | プロトコル・サーバー・ツール |

### 試験直前チェックリスト
- [ ] MCPの正式名称と役割を説明できる
- [ ] settings.jsonの場所と構造を把握している
- [ ] APIキーのセキュアな管理方法を実践できる
- [ ] MCPサーバーの追加手順を4ステップで説明できる
- [ ] チーム運用時のベストプラクティスを理解している

---step---

## 回答を入力してください

```
claude "MCPサーバーの一覧を見せて"
```

MCPサーバーの一覧を表示するコマンドを入力してください。
