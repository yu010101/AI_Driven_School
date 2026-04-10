---
title: "総合テスト — 全範囲"
step: 5
totalSteps: 5
expectedCommand: "claude \"CLAUDE.mdを作って。うちの会社の説明書として\""
acceptableCommands: ["claude 'CLAUDE.mdを作って。うちの会社の説明書として'", "claude \"CLAUDE.mdを作って\"", "claude 'CLAUDE.mdを作って'"]
simulatedOutput: "\n📝 CLAUDE.md を作成中...\n\n✅ 正解！CLAUDE.mdは全ての基盤です。\n\n━━ 総合まとめ ━━━━━━━━━━━━━━━━━━\n\n Level 0: claude でAIを起動\n Level 1: claude \"指示\" で業務を自動化\n Level 2: スクリプトで仕組み化\n Level 3: MCP で外部連携\n Level 4: SKILL.md でスキル拡張\n Level 5: 複数エージェントで経営OS\n Level 6: マルチIDEで展開\n Level 7: ✅ 全認定クリア！\n\n🏆 おめでとうございます！\n  あなたはClaude Code師範です。\n  Anthropic公式認定試験に挑戦する準備ができました。\n\n  → https://anthropic.skilljar.com"
hint: "CLAUDE.mdを作成するコマンドは？全ての始まりです"
---

## 🏆 認定模擬テスト ⑤ — 総合問題

**問題：Claude Codeで最も重要な設定ファイル CLAUDE.md を作成するコマンドを書いてください。**

これが全ての土台です。

:::flow{steps="Level 0 起動 → Level 1 業務自動化 → Level 2 仕組み化 → Level 3 MCP → Level 4 Skills → Level 5 経営OS → Level 6 マルチIDE → Level 7 認定"}

> CLAUDE.md = あなたの会社・プロジェクトの「説明書」

### 追加練習問題

**Q1：CLAUDE.mdとSKILL.mdの違いを説明してください。**

A：CLAUDE.mdは「プロジェクト全体の設定・文脈・ルール」を定義するファイルです。会社の説明書のようなもので、Claude Codeが作業する際の前提条件になります。一方、SKILL.mdは「特定の業務スキル」を定義するファイルで、`/estimate` のようにトリガーで呼び出す再利用可能なモジュールです。CLAUDE.mdは1プロジェクトに1つ、SKILL.mdは業務の数だけ作れます。

**Q2：Level 0からLevel 6まで、各レベルのキーワードを1つずつ挙げてください。**

A：Level 0 = `claude`（起動）、Level 1 = `claude "指示"`（ワンショット実行）、Level 2 = スクリプト（仕組み化）、Level 3 = MCP（外部連携）、Level 4 = SKILL.md（スキル拡張）、Level 5 = OpenClaw（経営OS）、Level 6 = Antigravity（マルチIDE）。各レベルが前のレベルの上に積み重なる構造になっています。この全体像を把握していることが総合試験では問われます。

**Q3：チームでClaude Codeを運用する際のベストプラクティスを3つ挙げてください。**

A：(1) CLAUDE.mdとSKILL.mdをGitリポジトリで一元管理する — 全員が同じルールで作業できる。(2) MCP設定のAPIキーは環境変数で管理する — セキュリティリスクを回避。(3) IDE選択は個人の自由にする — SKILL.mdの互換性があるので、全員同じIDEを強制する必要はない。

### 総合試験 学習のコツ

- **全レベルの繋がりを理解する** — 個別の知識より「なぜこの順番で学ぶのか」が重要
- **CLAUDE.mdが全ての土台** — ここが弱いとLevel 4以降の理解が浅くなる
- **実際に手を動かした経験が最強の対策** — コマンドを暗記するより、実際に使って体で覚える

### よくある間違い

- 各レベルの技術を独立して理解する → 全てが積み重なる構造を意識する
- CLAUDE.mdを一度作って放置する → プロジェクトの成長に合わせて継続的に更新する
- スキルを増やしすぎる → 本当に繰り返す業務だけをスキル化する（過剰なスキル化は管理コスト増）

### 関連レッスン

- Level 0-1「基礎」 — claude コマンドとCLAUDE.mdの基本
- Level 3「MCP」 — 外部サービス連携
- Level 4「Skills」 — SKILL.mdの作成と運用
- Level 6「Antigravity」 — マルチIDE戦略

## 総合レビュー — 各レベルの重要概念

### Level 0: セットアップと起動
- `npm install -g @anthropic-ai/claude-code` でインストール（Node.js 18+必須）
- `claude` で対話モード起動、`claude "指示"` でワンショット実行
- これが全ての土台。ここを理解せずに先に進めない

### Level 1: 業務自動化
- CLAUDE.mdでプロジェクトの文脈をAIに伝える
- ファイル名を指示に含めて自動読み込み
- 出力形式を明示して一貫した結果を得る

### Level 2: 仕組み化
- シェルスクリプトにClaude Codeを組み込む
- cron・GitHub Actionsとの連携で定期実行
- ワンショットモードが自動化のカギ

### Level 3: MCP（外部連携）
- Model Context Protocol = AIの「手足」を増やす技術
- 設定は `.claude/settings.json`、APIキーは環境変数で管理
- Gmail・Calendar・Slack・freee等と連携可能

### Level 4: Agent Skills
- SKILL.md = AIに業務手順を教えるMarkdownファイル
- 4要素: 名前・説明・トリガー・手順
- `/find-skills` で検索、`/install-skill` でインストール

### Level 5: 経営OS
- 複数エージェントでCEO・CFO・CTO・COO・CMOを構築
- OpenClawによるエージェント連携
- ビジネスプロセス全体をAIで統合管理

### Level 6: マルチIDE
- Antigravityによる複数AI IDE対応
- SKILL.mdのポータビリティ（どのIDEでも動作）
- IDE選択は個人の自由、スキルは共通

### Level 7: 認定試験
- 全レベルの知識を統合して実践力を証明する

## 総合練習問題

**Q1**: 以下の技術を、Claude Codeの学習順序として正しく並べ替えてください。
A) MCP → Skills → claude起動 → CLAUDE.md
B) claude起動 → CLAUDE.md → スクリプト化 → MCP → Skills
C) Skills → MCP → CLAUDE.md → claude起動
D) CLAUDE.md → claude起動 → Skills → MCP
→ 正解: B。Level 0（起動） → Level 1（CLAUDE.mdと業務自動化） → Level 2（スクリプト化） → Level 3（MCP） → Level 4（Skills）の順に積み上げます。各レベルが前のレベルの知識を前提としているため、順番を飛ばすと理解が浅くなります。

**Q2**: あるチームが「毎週月曜に先週の売上レポートをSlackに自動投稿したい」と依頼してきました。必要な技術の組み合わせとして正しいのはどれか？
A) claude起動のみ  B) ワンショットモード + cron + MCP（Slack連携）  C) SKILL.mdのみ  D) Antigravityのみ
→ 正解: B。定期実行にはワンショットモード + cron（Level 2）、売上データの処理にはファイル操作（Level 1）、Slackへの投稿にはMCP連携（Level 3）が必要です。複数レベルの知識を組み合わせる実践的な問題です。

**Q3**: CLAUDE.mdとSKILL.mdの関係として最も適切な説明はどれか？
A) 同じ内容を異なる形式で書いたもの  B) CLAUDE.mdはプロジェクト全体の設定、SKILL.mdは個別業務の手順書  C) SKILL.mdがCLAUDE.mdを自動生成する  D) どちらか一方だけあればよい
→ 正解: B。CLAUDE.mdは「会社の説明書」で1プロジェクトに1つ。SKILL.mdは「業務マニュアル」で業務の数だけ作れます。両方が揃うことでAIが文脈を理解した上で正確に業務を遂行できます。

## 認定試験の準備ガイド

### 推奨学習スケジュール（2週間プラン）

**第1週: 基礎の復習**
- Day 1-2: Level 0-1 を復習。`claude` コマンドとCLAUDE.mdの基本を完璧にする
- Day 3-4: Level 2-3 を復習。スクリプト化とMCPの設定を実際にやってみる
- Day 5-7: Level 4-6 を復習。SKILL.mdを1つ自作してテストする

**第2週: 実践と模擬テスト**
- Day 8-10: 各レベルの模擬テスト（このコースの問題）を繰り返し解く
- Day 11-12: 間違えた問題をピックアップして重点復習する
- Day 13: 全範囲の総復習。各レベルのキーワードを1分以内に説明できるか確認
- Day 14: 本番に臨む。体調を整えて万全の状態で受験する

### 試験攻略のコツ

1. **全体像を把握する** — 個別の知識より「Level 0から7への積み上げ構造」を理解することが最重要
2. **手を動かして覚える** — コマンドを暗記するだけでなく、実際にターミナルで実行して体で覚える
3. **CLAUDE.mdを軸に考える** — 多くの問題はCLAUDE.mdの理解度で差がつく
4. **セキュリティ問題に注意** — APIキーの管理方法は頻出テーマ。「環境変数で管理」が鉄則
5. **消去法を活用する** — 明らかに間違っている選択肢を先に除外して正答率を上げる
6. **実務シナリオ問題に慣れる** — Q2のような「この状況で何を使うか」という応用問題が合否を分ける

### 最終チェックリスト

- [ ] 全レベル（0-7）のキーワードを1つずつ即答できる
- [ ] `claude` の3つの使い方を説明できる
- [ ] CLAUDE.mdとSKILL.mdの違いを30秒で説明できる
- [ ] MCPの設定手順を4ステップで説明できる
- [ ] APIキーの安全な管理方法を実践できる
- [ ] スキルの検索・インストール・作成の流れを把握している
- [ ] 複数レベルの知識を組み合わせた実務シナリオに対応できる

## Anthropic公式認定の受験方法

AI道場の模擬試験で十分なスコアが取れたら、Anthropic公式認定に挑戦しましょう。

**受験URL**: https://anthropic.skilljar.com

**認定トラック**:
- Claude 101 — Claude Codeの基本概念（入門）
- Claude Code in Action — 実務でのClaude Code活用（中級）
- MCP (Model Context Protocol) — 外部サービス連携（上級）

**受験の流れ**:
1. 上記URLでAnthropicアカウントを作成
2. 受験するトラックを選択
3. オンラインで受験（選択式、制限時間あり）
4. 合格するとデジタル認定証が発行される

**準備のコツ**:
- AI道場の模擬試験で80%以上を安定して取れるようになってから受験する
- 特にMCPとPermission Modeの問題は実務経験があると有利
- 不合格でも再受験可能（回数制限あり）

---step---

## 最終回答を入力してください

```
claude "CLAUDE.mdを作って。うちの会社の説明書として"
```

全レベルの集大成。CLAUDE.mdの作成コマンドを入力してください。
