export const claude101Questions = [
  {
    id: 1,
    question: "Claude Codeとは何ですか？",
    choices: [
      "Webブラウザで動くチャットボット",
      "ターミナルで動くAIコーディングアシスタント",
      "画像生成ツール",
      "データベース管理システム"
    ],
    answer: 1,
    explanation:
      "Claude CodeはAnthropicが開発した、ターミナル（CLI）で動作するAIコーディングアシスタントです。コードの読み書き、コマンド実行、Git操作などをターミナル上で対話的に行えます。"
  },
  {
    id: 2,
    question: "Claude Codeが直接実行できないタスクはどれですか？",
    choices: [
      "ファイルの読み書き",
      "シェルコマンドの実行",
      "クラウドサーバーのプロビジョニング",
      "Gitコミットの作成"
    ],
    answer: 2,
    explanation:
      "Claude Codeはローカル環境でファイル操作やシェルコマンド実行、Git操作が可能ですが、クラウドインフラのプロビジョニングを直接行う機能は備えていません。あくまでCLIツールやAPIを通じて間接的に操作します。"
  },
  {
    id: 3,
    question:
      "Claude Codeの最大の特徴として正しいものはどれですか？",
    choices: [
      "GUIベースのドラッグ＆ドロップ操作",
      "コードベース全体を理解した上でのコンテキスト対応",
      "自動でデプロイまで行う完全自律型システム",
      "インターネット接続なしで完全に動作する"
    ],
    answer: 1,
    explanation:
      "Claude Codeはプロジェクト全体のコードベースを読み取り、ファイル構造や依存関係を理解した上でコンテキストに沿った提案・編集を行えることが大きな特徴です。"
  },
  {
    id: 4,
    question: "Claude Codeをインストールする推奨コマンドはどれですか？",
    choices: [
      "pip install claude-code",
      "brew install claude",
      "curl -fsSL https://claude.ai/install.sh | bash",
      "apt-get install claude-code"
    ],
    answer: 2,
    explanation:
      "Claude Codeの推奨インストール方法はネイティブインストーラーで、`curl -fsSL https://claude.ai/install.sh | bash`（macOS/Linux）で実行します。Homebrewやnpmでもインストール可能ですが、ネイティブインストールが推奨されています。"
  },
  {
    id: 5,
    question:
      "Claude Codeのネイティブインストールに必要な前提条件として正しいものはどれですか？",
    choices: [
      "Python 3.10以上",
      "4GB以上のRAMとインターネット接続",
      "Docker Desktop",
      "Rust コンパイラ"
    ],
    answer: 1,
    explanation:
      "Claude Codeのネイティブインストールは依存パッケージ不要で、4GB以上のRAMとインターネット接続があれば動作します。macOS 13.0+、Windows 10+、Ubuntu 20.04+等がサポートされています。npmインストール（非推奨）の場合はNode.js 18+が必要です。"
  },
  {
    id: 6,
    question:
      "Claude Codeをインタラクティブモードで起動するコマンドはどれですか？",
    choices: [
      "claude start",
      "claude",
      "claude --interactive",
      "claude run"
    ],
    answer: 1,
    explanation:
      "ターミナルでプロジェクトディレクトリに移動し、`claude`と入力するだけでインタラクティブモードが起動します。対話的にプロンプトを入力して操作できます。"
  },
  {
    id: 7,
    question:
      "Claude Codeで非インタラクティブ（ワンショット）実行を行う方法はどれですか？",
    choices: [
      "claude --once 'タスク内容'",
      "claude -p 'タスク内容'",
      "claude exec 'タスク内容'",
      "claude --batch 'タスク内容'"
    ],
    answer: 1,
    explanation:
      "`claude -p 'タスク内容'`を使うと、インタラクティブモードに入らずにワンショットでタスクを実行し、結果を出力して終了します。CI/CDやスクリプトでの利用に便利です。"
  },
  {
    id: 8,
    question: "CLAUDE.mdファイルの主な役割は何ですか？",
    choices: [
      "Claude Codeのインストール設定を記述するファイル",
      "プロジェクト固有の指示やルールをClaudeに伝えるファイル",
      "APIキーを安全に保存するファイル",
      "Claudeの応答ログを記録するファイル"
    ],
    answer: 1,
    explanation:
      "CLAUDE.mdはプロジェクトのルート等に配置し、コーディング規約、アーキテクチャの説明、コマンドの実行方法などプロジェクト固有の指示をClaudeに伝えるためのファイルです。"
  },
  {
    id: 9,
    question:
      "CLAUDE.mdを配置できる場所として正しくないものはどれですか？",
    choices: [
      "プロジェクトルート（リポジトリ直下）",
      "ホームディレクトリの ~/.claude/CLAUDE.md",
      "/etc/claude/CLAUDE.md（システムグローバル）",
      "サブディレクトリごとのCLAUDE.md"
    ],
    answer: 2,
    explanation:
      "CLAUDE.mdはプロジェクトルート、~/.claude/CLAUDE.md（ユーザーグローバル）、サブディレクトリに配置できます。管理ポリシー用のパスはLinuxでは/etc/claude-code/CLAUDE.mdであり、/etc/claude/CLAUDE.mdは正しくありません。"
  },
  {
    id: 10,
    question:
      "CLAUDE.mdに記述する内容として最も適切でないものはどれですか？",
    choices: [
      "コーディングスタイルのルール",
      "テストの実行コマンド",
      "APIキーやシークレット",
      "プロジェクトのアーキテクチャ概要"
    ],
    answer: 2,
    explanation:
      "CLAUDE.mdはリポジトリにコミットされる可能性があるため、APIキーやシークレットなどの機密情報は絶対に記述してはいけません。コーディングルールやコマンド、アーキテクチャ情報を記述します。"
  },
  {
    id: 11,
    question: "Claude Codeの「自動メモリ」機能の説明として正しいものはどれですか？",
    choices: [
      "すべての会話履歴をクラウドに永続保存する機能",
      "セッション間で記憶したい情報を自動的にファイルに保存する機能",
      "プロジェクトの全ファイルをキャッシュする機能",
      "ユーザーの入力パターンを学習する機械学習機能"
    ],
    answer: 1,
    explanation:
      "自動メモリ（Auto Memory）は、Claude Codeがセッションをまたいで覚えておくべき情報（ユーザーの好み、プロジェクト情報など）を~/.claude/以下のファイルに自動保存する機能です。"
  },
  {
    id: 12,
    question:
      "自動メモリの保存先として正しいものはどれですか？",
    choices: [
      "プロジェクトルートの.memory/ディレクトリ",
      "~/.claude/ 配下のメモリファイル",
      "~/.config/claude/memory.json",
      "Anthropicのクラウドサーバー"
    ],
    answer: 1,
    explanation:
      "自動メモリは~/.claude/配下にファイルとして保存されます。ユーザーのホームディレクトリに保存されるため、プロジェクトをまたいで参照できます。"
  },
  {
    id: 13,
    question:
      "Claude Codeのインタラクティブモードで会話をリセットするコマンドはどれですか？",
    choices: [
      "/reset",
      "/clear",
      "/new",
      "/restart"
    ],
    answer: 1,
    explanation:
      "`/clear`コマンドで現在の会話コンテキストをクリアし、新しい会話を開始できます。コンテキストウィンドウがいっぱいになった時などに有用です。"
  },
  {
    id: 14,
    question:
      "Claude Codeでファイルやイメージをコンテキストに追加するスラッシュコマンドはどれですか？",
    choices: [
      "/import",
      "/add",
      "/load",
      "/add-file"
    ],
    answer: 1,
    explanation:
      "`/add`コマンドでファイルパスやURLを指定して、コンテキストに情報を追加できます。画像ファイルも追加可能です。"
  },
  {
    id: 15,
    question:
      "Claude Codeの現在のコンテキスト使用量を確認するコマンドはどれですか？",
    choices: [
      "/usage",
      "/status",
      "/cost",
      "/tokens"
    ],
    answer: 2,
    explanation:
      "`/cost`コマンドで現在のセッションのトークン使用量とおおよそのコストを確認できます。コンテキストウィンドウの使用状況の把握に役立ちます。"
  },
  {
    id: 16,
    question:
      "Claude Codeの料金体系について正しいものはどれですか？",
    choices: [
      "月額固定料金のサブスクリプションのみ",
      "Claude ProまたはMaxプランのサブスクリプションに含まれる",
      "完全無料で利用できる",
      "1回の質問ごとに課金される従量制のみ"
    ],
    answer: 1,
    explanation:
      "Claude CodeはClaude ProやMaxプランのサブスクリプションに含まれており、API利用の場合は従量課金も可能です。プランによって利用量の上限が異なります。"
  },
  {
    id: 17,
    question:
      "Claude Codeの利用コストを抑える方法として正しくないものはどれですか？",
    choices: [
      "タスクを明確に指示してやり取りの回数を減らす",
      "不要なファイルをコンテキストに含めない",
      "すべてのタスクで常にOpusモデルを使用する",
      "/clearで定期的にコンテキストをリセットする"
    ],
    answer: 2,
    explanation:
      "すべてのタスクでOpusを使うとコストが高くなります。公式ドキュメントではSonnetが大半のコーディングタスクに十分で、Opusは複雑なアーキテクチャ判断に使うべきとされています。/modelコマンドで適切にモデルを切り替えることがコスト最適化に有効です。"
  },
  {
    id: 18,
    question: "Claude Codeが動作する環境として正しいものはどれですか？",
    choices: [
      "Webブラウザのみ",
      "ターミナル、VS Code、JetBrains IDE、デスクトップアプリ、Webブラウザ",
      "デスクトップアプリのみ",
      "モバイルアプリのみ"
    ],
    answer: 1,
    explanation:
      "Claude Codeはターミナル（CLI）、VS Code拡張機能、JetBrainsプラグイン、スタンドアロンのデスクトップアプリ、Webブラウザ（claude.ai/code）など複数の環境で動作します。すべて同じClaude Codeエンジンに接続されます。"
  },
  {
    id: 19,
    question:
      "VS Code上でClaude Codeを使用する利点として正しいものはどれですか？",
    choices: [
      "ターミナル版より高性能なモデルが使える",
      "エディタのファイルコンテキストと統合されたシームレスな操作",
      "料金が無料になる",
      "インターネット接続なしで動作する"
    ],
    answer: 1,
    explanation:
      "VS Code拡張機能では、開いているファイルやエディタの状態とClaude Codeが統合され、ファイル編集のdiffプレビューやインラインでの操作がシームレスに行えます。"
  },
  {
    id: 20,
    question:
      "Claude Codeをリモート開発環境で使う方法として正しいものはどれですか？",
    choices: [
      "リモート環境では使用できない",
      "SSHやGitHub Codespaces等のリモート環境にインストールして使う",
      "専用のクラウドサービスを別途契約する必要がある",
      "ブラウザ版のみリモート対応している"
    ],
    answer: 1,
    explanation:
      "Claude CodeはSSH接続先やGitHub Codespaces、Docker内などリモート環境にもインストールして利用できます。Node.jsが動作する環境であれば場所を問わず使えます。"
  }
];
