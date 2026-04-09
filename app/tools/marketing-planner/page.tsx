'use client'

import { useState } from 'react'

type Answer = {
  productType?: string
  targetAudience?: string
  budget?: string
  timeframe?: string
}

const questions = [
  {
    id: 'productType',
    question: 'どんなプロダクトですか？',
    options: [
      { value: 'saas', label: 'SaaS/Webアプリ', icon: '' },
      { value: 'mobile', label: 'モバイルアプリ', icon: '' },
      { value: 'content', label: 'コンテンツ/教材', icon: '' },
      { value: 'service', label: 'サービス/コンサル', icon: '' },
    ],
  },
  {
    id: 'targetAudience',
    question: 'ターゲット層は？',
    options: [
      { value: 'developer', label: '開発者/エンジニア', icon: '' },
      { value: 'business', label: 'ビジネス/経営者', icon: '' },
      { value: 'creator', label: 'クリエイター', icon: '' },
      { value: 'general', label: '一般ユーザー', icon: '' },
    ],
  },
  {
    id: 'budget',
    question: 'マーケティング予算は？',
    options: [
      { value: 'zero', label: '0円', icon: '' },
      { value: 'low', label: '月1万円以下', icon: '' },
      { value: 'medium', label: '月1-5万円', icon: '' },
      { value: 'high', label: '月5万円以上', icon: '' },
    ],
  },
  {
    id: 'timeframe',
    question: 'いつまでに結果を出したい？',
    options: [
      { value: 'asap', label: '今すぐ', icon: '' },
      { value: 'month', label: '1ヶ月以内', icon: '' },
      { value: 'quarter', label: '3ヶ月以内', icon: '' },
      { value: 'longterm', label: '半年以上', icon: '' },
    ],
  },
]

const getMarketingPlan = (answers: Answer) => {
  const { productType, targetAudience, budget, timeframe } = answers

  // 開発者向け × 0円予算
  if (targetAudience === 'developer' && budget === 'zero') {
    return {
      title: '開発者向け0円マーケティングプラン',
      channels: [
        { name: 'X（Twitter）', priority: '高', description: '開発日記、Tips共有、進捗報告' },
        { name: 'Zenn/Qiita', priority: '高', description: '技術記事でSEO流入を狙う' },
        { name: 'GitHub', priority: '中', description: 'オープンソースで認知獲得' },
        { name: 'Product Hunt', priority: '中', description: '海外からのユーザー獲得' },
      ],
      actions: [
        { period: '1週目', tasks: ['Xアカウント整備', '開発日記開始', 'ハッシュタグ調査'] },
        { period: '2週目', tasks: ['技術記事1本目公開', 'コミュニティ参加', '競合分析'] },
        { period: '3-4週目', tasks: ['週1記事ペース確立', 'X投稿ルーティン化', 'フィードバック収集'] },
        { period: '2ヶ月目', tasks: ['Product Huntローンチ準備', 'ユーザーインタビュー', 'コンテンツ改善'] },
      ],
      tips: [
        '「作る過程」を発信することで、ローンチ前からファンを作る',
        '技術記事は「初心者が困るポイント」を狙うと読まれやすい',
        '他の開発者の投稿に積極的にコメントして関係構築',
      ],
    }
  }

  // 一般ユーザー向け
  if (targetAudience === 'general') {
    return {
      title: '一般ユーザー向けマーケティングプラン',
      channels: [
        { name: 'Instagram', priority: '高', description: 'ビジュアルで訴求' },
        { name: 'TikTok', priority: '高', description: '短尺動画でバイラル' },
        { name: 'SEO', priority: '中', description: 'ブログで検索流入' },
        { name: 'note', priority: '中', description: 'ストーリーで共感獲得' },
      ],
      actions: [
        { period: '1週目', tasks: ['SNSアカウント作成', 'コンテンツ方針決定', 'ベンチマーク選定'] },
        { period: '2週目', tasks: ['投稿テスト（5パターン）', 'エンゲージメント分析', '改善'] },
        { period: '3-4週目', tasks: ['勝ちパターンで継続', 'コラボ検討', 'UGC促進'] },
        { period: '2ヶ月目', tasks: ['インフルエンサー施策', 'キャンペーン実施', '効果測定'] },
      ],
      tips: [
        'ビジュアルの質が重要。Canvaでテンプレートを作っておく',
        '最初の3秒で惹きつける。TikTokは冒頭が命',
        'ユーザーの声を積極的にシェアしてUGCを増やす',
      ],
    }
  }

  // SaaS × 時間あり
  if (productType === 'saas' && (timeframe === 'quarter' || timeframe === 'longterm')) {
    return {
      title: 'SaaS向け長期マーケティングプラン',
      channels: [
        { name: 'SEO/ブログ', priority: '高', description: '検索流入でリード獲得' },
        { name: 'X（Twitter）', priority: '高', description: '創業者の発信で信頼構築' },
        { name: 'メール', priority: '中', description: 'リードナーチャリング' },
        { name: 'コミュニティ', priority: '中', description: 'ユーザー同士のつながり' },
      ],
      actions: [
        { period: '1ヶ月目', tasks: ['キーワード戦略策定', 'ブログ10記事公開', 'メルマガ開始'] },
        { period: '2ヶ月目', tasks: ['SEO分析・改善', 'ケーススタディ作成', 'ウェビナー企画'] },
        { period: '3ヶ月目', tasks: ['コミュニティ立ち上げ', '紹介プログラム開始', 'PR施策'] },
      ],
      tips: [
        'コンテンツは「課題解決型」を中心に。SEOとリード獲得を両立',
        '創業者の人間性を見せることで、SaaSに「顔」をつける',
        '既存ユーザーの成功事例は最強のマーケティング素材',
      ],
    }
  }

  // デフォルト
  return {
    title: 'スタンダードマーケティングプラン',
    channels: [
      { name: 'X（Twitter）', priority: '高', description: 'リアルタイムで情報発信' },
      { name: 'SEO', priority: '高', description: 'ブログで検索流入' },
      { name: 'note', priority: '中', description: 'ストーリーテリング' },
      { name: 'SNS広告', priority: budget === 'zero' ? '低' : '中', description: '認知拡大' },
    ],
    actions: [
      { period: '1週目', tasks: ['SNS整備', '競合分析', 'コンテンツ計画'] },
      { period: '2週目', tasks: ['発信開始', '反応分析', 'A/Bテスト'] },
      { period: '3-4週目', tasks: ['勝ちパターン特定', 'コンテンツ量産', 'コミュニティ参加'] },
    ],
    tips: [
      '一貫したメッセージで発信を続ける',
      'データを見て改善を繰り返す',
      '小さく始めて、効果があるものに集中する',
    ],
  }
}

export default function MarketingPlannerPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answer>({})
  const [result, setResult] = useState<ReturnType<typeof getMarketingPlan> | null>(null)

  const handleSelect = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setResult(getMarketingPlan(newAnswers))
    }
  }

  const handleReset = () => {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  const currentQuestion = questions[step]
  const progress = ((step + 1) / questions.length) * 100

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#0A0A0A] text-white text-xs font-bold rounded-full mb-4">
            MARKETING PLANNER
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            マーケティング計画生成
          </h1>
          <p className="text-[#525252] max-w-xl mx-auto">
            4つの質問に答えるだけで、0円で始められるマーケティング施策を自動提案。
          </p>
        </header>

        {!result ? (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-[#525252] mb-2">
                <span>質問 {step + 1} / {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A0A0A] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="card p-8">
              <h2 className="text-xl font-bold mb-6 text-center">
                {currentQuestion.question}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(currentQuestion.id, option.value)}
                    className="p-6 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0A0A0A] hover:bg-[#0A0A0A]/5 transition-all text-center group"
                  >
                    <span className="text-4xl mb-3 block">{option.icon}</span>
                    <span className="font-medium group-hover:text-[#0A0A0A]">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">あなたのマーケティング計画</h2>
                <p className="text-xl text-[#0A0A0A] font-bold">{result.title}</p>
              </div>

              {/* チャネル */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">推奨チャネル</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.channels.map((channel) => (
                    <div key={channel.name} className="p-4 bg-[#F5F5F5] rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{channel.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          channel.priority === '高' ? 'bg-[#0A0A0A] text-white' :
                          channel.priority === '中' ? 'bg-[#525252] text-white' :
                          'bg-[#94A3B8] text-white'
                        }`}>
                          優先度: {channel.priority}
                        </span>
                      </div>
                      <p className="text-sm text-[#525252]">{channel.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* アクション */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">アクションプラン</h3>
                <div className="space-y-4">
                  {result.actions.map((action, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-24 shrink-0">
                        <span className="inline-block px-3 py-1 bg-[#0A0A0A]/10 text-[#0A0A0A] text-sm font-bold rounded-lg">
                          {action.period}
                        </span>
                      </div>
                      <ul className="flex-1 space-y-1">
                        {action.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-[#525252]">
                            <span className="text-[#0A0A0A]">✓</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="p-6 bg-[#0A0A0A]/5 rounded-xl">
                <h3 className="font-bold text-lg mb-4">成功のコツ</h3>
                <ul className="space-y-2">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-[#525252]">
                      <span className="text-[#0A0A0A]">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0A0A0A] transition-colors"
                >
                  もう一度診断する
                </button>
                <a
                  href="/guide/zero-marketing"
                  className="btn-cta"
                >
                  0円マーケティングを学ぶ →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
