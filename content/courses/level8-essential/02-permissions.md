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

### 3モード詳細比較

| 操作 | Restrictive | Default（推奨） | Permissive |
|---|---|---|---|
| ファイル読み取り | 毎回確認 | **自動許可** | 自動許可 |
| ファイル書き込み | 毎回確認 | 毎回確認 | **自動許可** |
| ファイル削除 | 毎回確認 | 毎回確認 | **自動許可** |
| Bashコマンド実行 | 毎回確認 | 毎回確認 | **自動許可** |
| git操作 | 毎回確認 | 毎回確認 | **自動許可** |
| Web検索 | 毎回確認 | **自動許可** | 自動許可 |

### 具体シナリオ：「Claudeが rm -rf dist/ を実行しようとした場合」

- **Restrictive**: `dist/` の削除を実行してよいですか？ → ユーザーが `y/n` で判断
- **Default**: `dist/` の削除を実行してよいですか？ → ユーザーが `y/n` で判断（書き込み操作なので確認される）
- **Permissive**: **確認なしで即座に実行される** → 取り返しがつかない可能性あり

### settings.json での設定方法

```json
// グローバル設定: ~/.claude/settings.json
{
  "permissions": {
    "mode": "default"
  }
}

// プロジェクト設定: .claude/settings.json（チーム共有用）
{
  "permissions": {
    "mode": "default",
    "allow": [
      "Read",
      "Glob",
      "Grep"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)"
    ]
  }
}
```

### allowlist / denylist で細かく制御

Permission Modeだけでなく、**個別のツールやコマンドパターン**で許可・拒否を設定できます。

```json
{
  "permissions": {
    "mode": "default",
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Bash(npm test)",
      "Bash(npm run lint)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(curl * | bash)",
      "Bash(chmod 777 *)"
    ]
  }
}
```

この設定なら、テストやlintは自動実行されるが、危険なコマンドは完全にブロックされます。

### 企業導入の推奨設定

エンタープライズ環境では **Default モード + allowlist** が鉄板構成です。

```json
// .claude/settings.json（チームリポジトリにコミット）
{
  "permissions": {
    "mode": "default",
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Bash(npm *)",
      "Bash(yarn *)",
      "Bash(pnpm *)",
      "Bash(git log *)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(curl * | *)",
      "Bash(wget *)",
      "Bash(git push --force *)",
      "Bash(git reset --hard *)"
    ]
  }
}
```

**ポイント**: `.claude/settings.json` をリポジトリにコミットすれば、チーム全員に同じ権限ポリシーが適用される。新メンバーが入っても設定ミスがない。

### 実務での使い方

**個人開発**: Permissive モードで高速開発。自分しか触らないので確認の手間を省く。ただし `deny` で `rm -rf` だけはブロック推奨。

**チーム開発**: Default モード。コードレビューと同じ感覚で、Claudeの変更を1つずつ確認。品質担保と学習効果がある。

**本番環境作業**: Restrictive モード。インフラ操作やDBマイグレーションなど、ミスが許されない場面では全操作を確認。

### よくある失敗

**1. Permissiveで本番DBに接続してしまう**
開発用のPermissive設定のまま本番作業を開始。Claudeが意図せずDROP TABLEを実行してしまう事例がある。環境ごとに設定ファイルを分けること。

**2. allowlistが広すぎる**
`"Bash(*)"` のようなワイルドカードをallowに入れると、Permissiveと同じ状態になる。パターンは具体的に書く。

**3. denylistだけに頼る**
denylistは「ブラックリスト方式」なので、想定外のコマンドは素通りする。必ずmodeとの併用が必要。

**4. プロジェクト設定とグローバル設定の競合**
プロジェクト（`.claude/settings.json`）とグローバル（`~/.claude/settings.json`）で異なるモードを設定すると、より厳しい方が適用される。意図的にそうなっているが、知らないと混乱する。

---step---

## Permission Modeを確認しよう

3つのモードの違い：

- **Restrictive** — 全操作に確認が必要。セキュリティ最優先。本番環境向け
- **Default** — 読み取りは自動、書き込みは確認。バランス型。チーム開発推奨
- **Permissive** — 全操作を自動許可。個人開発・プロトタイピング向け

企業利用では **Default + allowlist/denylist** の組み合わせがベストプラクティスです。

```
claude "現在のPermission Modeを確認して"
```

右のターミナルにコピペして Enter を押してください。
