---
title: "Skillsって何？"
step: 1
totalSteps: 5
expectedCommand: "claude /find-skills"
acceptableCommands: ["claude '/find-skills'"]
simulatedOutput: "\n🧩 Skills マーケットプレイス\n\n利用可能なスキルカテゴリ:\n┌──────────────────┬────────────┐\n│ カテゴリ          │ インストール数 │\n├──────────────────┼────────────┤\n│ seo-mastery      │ 4,200+     │\n│ commit           │ 3,800+     │\n│ frontend-design  │ 2,900+     │\n│ content-creator  │ 2,100+     │\n│ copywriter       │ 1,800+     │\n│ cfo              │ 1,500+     │\n│ analytics        │ 1,200+     │\n│ review           │ 980+       │\n└──────────────────┴────────────┘\n\n1,340+ skills available\n→ /install-skill <name> でインストールできます"
hint: "claude /find-skills と入力してください"
relatedArticles:
  - title: "Next.js開発でのClaude Code活用"
    path: "/knowledge/claude-code/nextjs-development"
---

> **前提知識**: Level 0-3完了。ターミナル操作に慣れていること。

## Skills = Claude Codeの拡張プラグイン

Claude Codeは汎用AIですが、**Skills**を入れると専門家に変身します。SEO、経理、デザイン、営業文など、1,340以上のスキルが無料で使えます。

:::before-after{before="汎用AIが汎用回答" after="専門AIが専門回答"}

---step---

## スキルで「何でも屋」→「専門家チーム」に

```
claude /find-skills
```

スキルは**SKILL.mdファイル**として動きます。インストールするだけで、Claude Codeの回答品質が劇的に変わります。

右のターミナルにコピペして Enter を押してください。

## Skillsの仕組み

Skillsの正体は**SKILL.md**というマークダウンファイルです。このファイルにはAIへの専門的な指示（プロンプト）が書かれています。

```markdown
# /seo スキル (例)
---
description: SEO最適化の専門家として振る舞う
---

## 実行ルール
- meta titleは30文字以内
- meta descriptionは120文字以内
- H1は1ページに1つだけ
- 画像には必ずalt属性を付ける
...
```

つまり、「このルールに従って回答して」という専門知識をファイル化したものです。人間の専門家がマニュアルを読んで仕事するのと同じ仕組みです。

## よくある質問

**Q: Skillsは有料ですか？**
→ いいえ。オープンソースで、GitHubで公開されています。`npx skills find` でも検索できます。

**Q: 自分でSkillsを作れますか？**
→ はい。次のレッスンで学びます。SKILL.mdを書くだけです。

**Q: Skillsを入れると遅くなりますか？**
→ ほぼ影響ありません。SKILL.mdはテキストファイルなのでトークン消費はわずかです。ただし、大量のスキルを同時に読み込むとコンテキストウィンドウを圧迫します。実務では3-5個程度の併用が推奨です。
