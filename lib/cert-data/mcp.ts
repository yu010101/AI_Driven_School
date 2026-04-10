export const mcpQuestions = [
  // What is MCP (3 questions)
  {
    id: 1,
    question: "MCPとは何の略ですか？",
    choices: [
      "Model Context Protocol",
      "Machine Control Program",
      "Multi-Channel Platform",
      "Managed Cloud Provider",
    ],
    answer: 0,
    explanation:
      "MCPはModel Context Protocolの略で、AIモデルと外部ツール・データソースを接続するためのオープンスタンダードです。",
  },
  {
    id: 2,
    question: "MCPの主な目的として最も適切なものはどれですか？",
    choices: [
      "AIモデルのファインチューニングを自動化する",
      "AIモデルが外部ツールやデータソースに安全にアクセスできるようにする",
      "複数のAIモデルを同時に実行するための負荷分散を行う",
      "AIモデルのトレーニングデータを暗号化する",
    ],
    answer: 1,
    explanation:
      "MCPはAIモデルが外部のツール、API、データソースに標準化された方法で安全にアクセスするためのプロトコルです。ファインチューニングや負荷分散とは異なる目的を持ちます。",
  },
  {
    id: 3,
    question:
      "MCPが登場する以前、AIアシスタントが外部サービスと連携する際の主な課題は何でしたか？",
    choices: [
      "外部サービスのAPI料金が高すぎた",
      "各サービスごとに個別の統合コードが必要で、標準化されていなかった",
      "AIモデルのコンテキストウィンドウが小さすぎた",
      "外部サービスがAI連携を法律で禁止していた",
    ],
    answer: 1,
    explanation:
      "MCP以前は、各外部サービスとの連携にそれぞれ個別のAPIラッパーやプラグインが必要でした。MCPはこの問題を解決する統一プロトコルです。",
  },
  // How MCP works (architecture) (3 questions)
  {
    id: 4,
    question: "MCPアーキテクチャにおいて、MCPホストの役割はどれですか？",
    choices: [
      "外部APIのエンドポイントを提供する",
      "MCPクライアントを内包し、ユーザーと対話するアプリケーション（Claude Codeなど）",
      "データベースのバックアップを管理する",
      "MCPサーバーの認証トークンを発行する",
    ],
    answer: 1,
    explanation:
      "MCPホストはClaude CodeやClaude Desktopなど、ユーザー向けアプリケーションです。内部にMCPクライアントを持ち、MCPサーバーと通信します。",
  },
  {
    id: 5,
    question:
      "MCPのクライアント-サーバーモデルにおいて、MCPサーバーが提供する3つの主要な機能はどれですか？",
    choices: [
      "ツール（Tools）、リソース（Resources）、プロンプト（Prompts）",
      "認証（Auth）、暗号化（Encryption）、ログ（Logging）",
      "ストレージ（Storage）、コンピュート（Compute）、ネットワーク（Network）",
      "入力（Input）、処理（Processing）、出力（Output）",
    ],
    answer: 0,
    explanation:
      "MCPサーバーはTools（実行可能なアクション）、Resources（読み取り可能なデータ）、Prompts（テンプレート化されたプロンプト）の3つを提供します。",
  },
  {
    id: 6,
    question:
      "MCPサーバーとMCPクライアント間の通信方式として正しいものはどれですか？",
    choices: [
      "GraphQLクエリのみ",
      "JSON-RPCベースのメッセージング",
      "gRPCによるバイナリストリーミング",
      "WebSocketによるリアルタイム双方向通信のみ",
    ],
    answer: 1,
    explanation:
      "MCPはJSON-RPCベースのプロトコルで、stdio（標準入出力）またはHTTP+SSEを通じてメッセージをやり取りします。",
  },
  // Available MCP servers (4 questions)
  {
    id: 7,
    question:
      "Gmail MCPサーバーを使用してClaude Codeからできることとして、正しいものはどれですか？",
    choices: [
      "メールの送信のみ",
      "メールの検索・閲覧・送信・ラベル管理など複数の操作",
      "メールのバックアップとアーカイブのみ",
      "スパムフィルターの設定変更のみ",
    ],
    answer: 1,
    explanation:
      "Gmail MCPサーバーはメールの検索、閲覧、送信、下書き作成、ラベル管理など、Gmailの主要な操作をClaude Codeから実行できるようにします。",
  },
  {
    id: 8,
    question:
      "freee MCPサーバーを活用する場面として最も適切なものはどれですか？",
    choices: [
      "社内チャットでメンバーにメッセージを送る",
      "会計データの取得や仕訳の登録を自然言語で依頼する",
      "カレンダーにミーティングを追加する",
      "ファイルストレージにドキュメントをアップロードする",
    ],
    answer: 1,
    explanation:
      "freee MCPサーバーはfreee会計APIと連携し、売上データの取得、仕訳の登録、請求書の確認などの会計業務をClaude Codeから自然言語で実行できます。",
  },
  {
    id: 9,
    question:
      "Slack MCPサーバーが提供する機能として正しくないものはどれですか？",
    choices: [
      "チャンネルへのメッセージ送信",
      "チャンネル内のメッセージ検索",
      "Slackワークスペースの課金プラン変更",
      "特定のチャンネルの履歴取得",
    ],
    answer: 2,
    explanation:
      "Slack MCPサーバーはメッセージの送信・検索・履歴取得などを提供しますが、ワークスペースの課金プラン変更のような管理者権限の操作は含まれません。",
  },
  {
    id: 10,
    question:
      "Google Calendar MCPサーバーを使って、Claude Codeに「来週の空き時間を教えて」と依頼した場合、どのような動作が期待されますか？",
    choices: [
      "カレンダーAPIにアクセスし、来週の予定を取得して空き時間を計算する",
      "Googleの検索結果から来週の祝日情報を取得する",
      "ユーザーのメールから予定を推測する",
      "ローカルのカレンダーファイル（.ics）を解析する",
    ],
    answer: 0,
    explanation:
      "Google Calendar MCPサーバーはGoogle Calendar APIを通じて予定データにアクセスし、既存の予定から空き時間を算出できます。",
  },
  // MCP configuration (3 questions)
  {
    id: 11,
    question: "MCPサーバーの設定を記述するファイルはどれですか？",
    choices: [
      ".claude/mcp.json",
      ".claude/settings.json",
      ".claude/servers.yaml",
      ".claude/config.toml",
    ],
    answer: 1,
    explanation:
      "MCPサーバーの設定は.claude/settings.json内のmcpServersセクションに記述します。プロジェクト単位またはユーザー単位で設定できます。",
  },
  {
    id: 12,
    question:
      "以下のMCP設定で、commandフィールドの役割として正しいものはどれですか？\n\n```json\n{\n  \"mcpServers\": {\n    \"gmail\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@anthropic/mcp-gmail\"]\n    }\n  }\n}\n```",
    choices: [
      "MCPサーバープロセスを起動するためのコマンドを指定する",
      "MCPクライアントがリクエストを送る先のURLを指定する",
      "MCPサーバーが使用するプログラミング言語を指定する",
      "MCPホストの名前を定義する",
    ],
    answer: 0,
    explanation:
      "commandフィールドはMCPサーバーのプロセスを起動するための実行コマンドを指定します。この例ではnpxを使ってnpmパッケージとしてサーバーを起動しています。",
  },
  {
    id: 13,
    question:
      "MCPサーバーを追加する際、設定ファイルのパスとして正しいものはどれですか？",
    choices: [
      ".claude/settings.json",
      "package.json",
      "tsconfig.json",
      ".env",
    ],
    answer: 0,
    explanation:
      "MCPサーバーの設定は .claude/settings.json に記述します。プロジェクトのルートディレクトリに .claude/ フォルダを作成し、settings.json に接続情報を記載します。",
  },
  // Security considerations (2 questions)
  {
    id: 14,
    question:
      "MCPサーバーを使用する際のセキュリティ上の懸念として、最も重要なものはどれですか？",
    choices: [
      "MCPサーバーがCPUリソースを大量に消費する可能性",
      "MCPサーバーが外部サービスへの認証情報にアクセスできるため、信頼できるサーバーのみ使用すべき",
      "MCPサーバーがAIモデルの学習データを変更する可能性",
      "MCPサーバーがインターネット接続を遮断する可能性",
    ],
    answer: 1,
    explanation:
      "MCPサーバーはAPIキーやOAuthトークンなどの認証情報を扱うため、信頼できるソースのサーバーのみを使用し、不要なパーミッションを付与しないことが重要です。",
  },
  {
    id: 15,
    question:
      "MCPにおける「Tool Poisoning」攻撃とはどのようなリスクですか？",
    choices: [
      "MCPサーバーのコードにマルウェアを仕込む攻撃",
      "悪意あるMCPサーバーがツールの説明文に隠し指示を埋め込み、AIの動作を操作する攻撃",
      "MCPプロトコルの暗号化を解読する攻撃",
      "大量のMCPリクエストでサーバーをダウンさせるDDoS攻撃",
    ],
    answer: 1,
    explanation:
      "Tool Poisoningは、MCPサーバーがツールのdescriptionに悪意のある指示を隠し、AIモデルの挙動を意図しない方向に誘導する攻撃手法です。信頼できないサーバーの導入時に注意が必要です。",
  },
  // Practical use cases (3 questions)
  {
    id: 16,
    question:
      "以下のユースケースのうち、MCPを活用する利点が最も大きいものはどれですか？",
    choices: [
      "単純な足し算・掛け算の計算",
      "社内のSlack・Gmail・カレンダー・会計ソフトを横断した業務自動化",
      "ローカルファイルの名前変更",
      "単一のWebページのスクリーンショット取得",
    ],
    answer: 1,
    explanation:
      "MCPの真価は複数の外部サービスを統合して横断的な業務フローを自動化できる点にあります。単体で完結する作業より、複数サービス連携で大きなメリットが得られます。",
  },
  {
    id: 17,
    question:
      "「毎週月曜に先週の売上データをfreeeから取得し、Slackの#sales-reportチャンネルに投稿する」という自動化を実現するために最低限必要なMCPサーバーの組み合わせはどれですか？",
    choices: [
      "freeeサーバーのみ",
      "freeeサーバーとSlackサーバー",
      "freeeサーバー、Slackサーバー、Calendarサーバー",
      "freeeサーバー、Slackサーバー、Gmailサーバー",
    ],
    answer: 1,
    explanation:
      "この自動化にはfreeeから売上データを取得するMCPサーバーと、Slackにメッセージを投稿するMCPサーバーの2つが必要です。スケジュール実行はcronやGitHub Actionsなど別の仕組みで制御します。",
  },
  {
    id: 18,
    question:
      "MCPサーバーを使ったワークフローの中で、AIモデルがツールを呼び出す前にユーザー確認を求める仕組みを何と呼びますか？",
    choices: [
      "Auto-approve（自動承認）",
      "Human-in-the-loop（人間による確認）",
      "Batch processing（バッチ処理）",
      "Lazy evaluation（遅延評価）",
    ],
    answer: 1,
    explanation:
      "Human-in-the-loop（HITL）は、AIがツールを実行する前にユーザーの確認を挟む仕組みです。特にメール送信や決済など、取り消しが難しいアクションで重要です。",
  },
  // Troubleshooting MCP connections (2 questions)
  {
    id: 19,
    question:
      "MCPサーバーへの接続が失敗した際、最初に確認すべきこととして最も適切なものはどれですか？",
    choices: [
      "AIモデルのバージョンを最新にアップデートする",
      "settings.jsonのMCPサーバー設定（command、args、環境変数）が正しいか確認する",
      "パソコンを再起動する",
      "別のAIモデルに切り替える",
    ],
    answer: 1,
    explanation:
      "MCPサーバー接続失敗の最も一般的な原因は、設定ファイルの記述ミス（コマンドパス、引数、必要な環境変数の不足）です。まず設定内容を確認しましょう。",
  },
  {
    id: 20,
    question:
      "MCPサーバーが「認証エラー」を返す場合、原因として考えられないものはどれですか？",
    choices: [
      "APIキーや環境変数が正しく設定されていない",
      "OAuthトークンの有効期限が切れている",
      "MCPサーバーのnpmパッケージバージョンが古い",
      "AIモデルのコンテキストウィンドウが不足している",
    ],
    answer: 3,
    explanation:
      "認証エラーはAPIキーの未設定、トークン期限切れ、パッケージの非互換性が原因となりますが、AIモデルのコンテキストウィンドウサイズは認証とは無関係です。",
  },
];
