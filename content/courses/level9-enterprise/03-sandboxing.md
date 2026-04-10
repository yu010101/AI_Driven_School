---
title: "Sandboxing — 安全な実行環境"
step: 3
totalSteps: 4
expectedCommand: "claude \"サンドボックスモードの設定を確認して\""
acceptableCommands: ["claude 'サンドボックスモードの設定を確認して'", "claude 'サンドボックスを確認して'"]
simulatedOutput: "🔒 サンドボックス設定\n\n現在のモード: デフォルト（推奨）\n\n┌──────────────────────────────────┐\n│ サンドボックスの仕組み           │\n│                                  │\n│ Claude Codeが実行するコマンドは │\n│ 隔離された環境で動作します。     │\n│                                  │\n│ ✅ ファイル読み書き: プロジェクト内のみ │\n│ ✅ コマンド実行: 許可リストに基づく    │\n│ ✅ ネットワーク: 必要な通信のみ        │\n│ ❌ システム変更: ブロック              │\n│ ❌ 他プロジェクト: アクセス不可        │\n└──────────────────────────────────┘\n\n📝 公式認定ポイント:\n  サンドボックスはClaude Codeの安全弁。\n  万が一の誤操作からシステムを保護する"
hint: "claude \"サンドボックスモードの設定を確認して\" と入力してください"
---

## Sandboxing — Claude Codeの「安全柵」

Sandboxing = 何でもできるAIに**「ここまでOK」の境界を設定**する仕組み。誤操作からシステムを守る安全弁。

:::flow{steps="🤖 Claude Code → 🔒 サンドボックス → ✅ 安全な操作のみ実行"}

公式認定ポイント：サンドボックスは企業導入の必須要件。許可/拒否の境界を説明できるようにしよう。

### なぜサンドボックスが必要なのか

Claude Codeはシェルコマンドを実行できる強力なツール。しかし「何でもできる」ことは、裏を返せば**誤操作のリスクも大きい**ということ。

サンドボックスなしで起きた実際のインシデント例：

> あるチームがサンドボックス未設定でClaude Codeを使用。「不要なファイルを整理して」と指示したところ、AIがプロジェクト外の `~/Documents` 配下のファイルまで削除対象と判断。設定ファイルやドキュメントが消失し、復旧に丸一日かかった。

このような事故を**構造的に防ぐ**のがサンドボックス。

### 許可/ブロック操作の一覧

サンドボックスが制御する操作の詳細。

| 操作カテゴリ | 具体例 | サンドボックス |
|-------------|--------|-------------|
| プロジェクト内ファイル読み取り | `src/index.ts` を読む | ✅ 許可 |
| プロジェクト内ファイル書き込み | `src/utils.ts` を編集 | ✅ 許可 |
| プロジェクト内ファイル作成 | 新しいコンポーネントを追加 | ✅ 許可 |
| 許可リスト内コマンド | `npm install`, `git status` | ✅ 許可 |
| ビルド・テスト実行 | `npm run build`, `npm test` | ✅ 許可 |
| localhost通信 | 開発サーバーへのアクセス | ✅ 許可 |
| プロジェクト外ファイル読み取り | `~/.ssh/id_rsa` を読む | ❌ ブロック |
| プロジェクト外ファイル書き込み | `/etc/hosts` を編集 | ❌ ブロック |
| システム設定の変更 | 環境変数のグローバル変更 | ❌ ブロック |
| 未許可の外部通信 | 任意のURLへのHTTPリクエスト | ❌ ブロック |
| プロセス管理 | `kill`, `pkill` コマンド | ❌ ブロック |
| パッケージのグローバルインストール | `npm install -g` | ❌ ブロック |
| ディスク操作 | `rm -rf /`, `dd` コマンド | ❌ ブロック |

### Dockerベースのサンドボックス構築

より厳密な分離が求められる場合、Dockerコンテナ内でClaude Codeを実行する方法がある。

```dockerfile
# Dockerfile.claude-sandbox
FROM node:20-slim

# Claude Codeのインストール
RUN npm install -g @anthropic-ai/claude-code

# 非rootユーザーで実行（権限の最小化）
RUN useradd -m -s /bin/bash claude-user
USER claude-user

# 作業ディレクトリ
WORKDIR /workspace

# ネットワークアクセスはdocker runで制限
# docker run --network=none で完全遮断も可能
```

**実行コマンド：**

```bash
# ビルド
docker build -f Dockerfile.claude-sandbox -t claude-sandbox .

# プロジェクトをマウントして実行（読み取り専用 + 出力ディレクトリのみ書き込み可）
docker run -it \
  --network=host \
  --memory=4g \
  --cpus=2 \
  -v $(pwd)/src:/workspace/src:ro \
  -v $(pwd)/output:/workspace/output \
  -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
  claude-sandbox \
  claude "コードをレビューして"
```

**Docker Composeでの運用例：**

```yaml
# docker-compose.claude.yml
services:
  claude-sandbox:
    build:
      context: .
      dockerfile: Dockerfile.claude-sandbox
    volumes:
      - ./src:/workspace/src:ro
      - ./output:/workspace/output
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    mem_limit: 4g
    cpus: 2
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp:size=100M
```

### settings.jsonでのサンドボックス設定

Claude Codeの設定ファイルでサンドボックスの挙動を細かくカスタマイズできる。

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Bash(npm run build)",
      "Bash(npm test)",
      "Bash(git status)",
      "Bash(git diff)",
      "Bash(npx prettier --write)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(curl *)",
      "Bash(wget *)",
      "Bash(ssh *)",
      "Bash(scp *)"
    ]
  }
}
```

### サンドボックスの境界をテストする

導入後は、サンドボックスが正しく機能しているか安全にテストしよう。

```bash
# テスト1: プロジェクト外へのアクセスを試みる（ブロックされるはず）
claude "~/.bashrcの内容を表示して"

# テスト2: 許可されたコマンドの実行（成功するはず）
claude "npm testを実行して結果を教えて"

# テスト3: 危険なコマンドの実行（ブロックされるはず）
claude "npm install -g typescript をグローバルにインストールして"

# テスト4: ネットワークアクセス（制限に依存）
claude "https://example.com にcurlでアクセスして"
```

各テストの結果を確認し、期待通りにブロック/許可されているかを検証する。

### 注意点

- **過度な制限は生産性を下げる**：サンドボックスの設定は「安全性」と「使いやすさ」のバランスが重要。全てをブロックするとClaude Codeの利点が失われる
- **Permission Modeとの組み合わせ**：サンドボックス + Permission Mode（手動承認）を併用すると二重の安全策になる。高リスクな操作は手動承認を必須にする
- **ログの確認**：サンドボックスがブロックした操作はログに記録される。定期的にログを確認し、正当な操作がブロックされていないか確認する
- **Docker環境の保守**：Dockerベースのサンドボックスを使う場合、コンテナイメージの定期的な更新が必要。セキュリティパッチの適用を忘れずに

### 実務での活用例

**ケース1：新人エンジニアのオンボーディング**
- 厳格なサンドボックス設定で安心してClaude Codeを使わせる
- 許可リストを限定し、`git push` や `npm publish` はブロック
- コードの読み書きとテスト実行のみに限定

**ケース2：CI/CDパイプラインでの利用**
- Dockerコンテナ内でClaude Codeを実行し、完全な分離を実現
- `--network=none` でネットワークアクセスを完全遮断
- ビルド成果物のみをホストに書き出す

**ケース3：マルチプロジェクト環境**
- プロジェクトごとに異なるサンドボックス設定を適用
- フロントエンドチームはビルド系コマンドを許可、インフラチームはTerraformコマンドを許可
- `.claude/settings.json` をリポジトリごとに管理

---step---

## サンドボックスの許可/拒否を確認しよう

サンドボックスが守る範囲：

- **許可** — プロジェクト内のファイル操作、許可リスト内のコマンド、必要な通信
- **拒否** — システム設定の変更、他プロジェクトへのアクセス、無許可の外部通信

```
claude "サンドボックスモードの設定を確認して"
```

右のターミナルにコピペして Enter を押してください。
