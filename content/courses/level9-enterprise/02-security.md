---
title: "セキュリティ — データの安全な取り扱い"
step: 2
totalSteps: 4
expectedCommand: "claude \"うちのセキュリティポリシーをCLAUDE.mdに追加して。顧客データは外部送信禁止、APIキーはログに出さない\""
acceptableCommands: ["claude 'うちのセキュリティポリシーをCLAUDE.mdに追加して。顧客データは外部送信禁止、APIキーはログに出さない'"]
simulatedOutput: "📁 CLAUDE.md を更新します...\n\n## セキュリティポリシー\n\n### データ取り扱いルール\n- 顧客データ（個人情報・取引履歴）は外部APIに送信しない\n- APIキー・シークレットをログやコメントに出力しない\n- .envファイルをコミットに含めない\n\n### 推奨設定\n- Zero Data Retention (ZDR) を有効化\n- サンドボックスモードをデフォルトで使用\n- Permission Modeで操作範囲を制限\n\n✓ CLAUDE.md にセキュリティポリシーを追加しました\n\n📝 公式認定ポイント:\n• Zero Data Retention (ZDR): APIデータをAnthropicが保持しないオプション\n• Sandboxing: 実行環境の分離で安全性確保\n• Permission Modes: 操作の自動/手動を制御"
hint: "claude \"うちのセキュリティポリシーをCLAUDE.mdに追加して...\" と入力してください"
---

## セキュリティ — 企業導入の最大関門

企業でClaude Codeを導入するとき、**セキュリティが最大の関門**になる。ポリシーを事前に設定すれば安心。

:::before-after{before="セキュリティ不安で導入見送り" after="ポリシー設定済みで安心導入"}

公式認定ポイント：データ保護・アクセス制御・監査ログの3本柱を理解しておこう。

---step---

## セキュリティポリシーを設定しよう

押さえるべき3つの公式認定キーワード：

- **Zero Data Retention (ZDR)** — APIデータをAnthropicが保持しない設定
- **Sandboxing** — 実行環境を分離して安全性を確保
- **Permission Modes** — 操作の自動実行/手動承認を制御

```
claude "うちのセキュリティポリシーをCLAUDE.mdに追加して。顧客データは外部送信禁止、APIキーはログに出さない"
```

右のターミナルにコピペして Enter を押してください。
