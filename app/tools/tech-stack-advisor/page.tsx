'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

type Answer = {
  appType?: string
  experience?: string
  priority?: string
  scale?: string
}

const questions = [
  {
    id: 'appType',
    question: 'どんなアプリを作りたいですか？',
    options: [
      { value: 'web', label: 'Webアプリ', icon: '🌐' },
      { value: 'mobile', label: 'モバイルアプリ', icon: '📱' },
      { value: 'api', label: 'API/バックエンド', icon: '⚙️' },
      { value: 'landing', label: 'LP/サイト', icon: '📄' },
    ],
  },
  {
    id: 'experience',
    question: 'プログラミング経験は？',
    options: [
      { value: 'none', label: '未経験', icon: '🌱' },
      { value: 'beginner', label: '初心者', icon: '📚' },
      { value: 'intermediate', label: '中級者', icon: '💪' },
      { value: 'advanced', label: '上級者', icon: '🚀' },
    ],
  },
  {
    id: 'priority',
    question: '何を重視しますか？',
    options: [
      { value: 'speed', label: '開発速度', icon: '⚡' },
      { value: 'cost', label: 'コスト', icon: '💰' },
      { value: 'scalability', label: '拡張性', icon: '📈' },
      { value: 'learning', label: '学習', icon: '🎓' },
    ],
  },
  {
    id: 'scale',
    question: '想定ユーザー数は？',
    options: [
      { value: 'personal', label: '個人/少人数', icon: '👤' },
      { value: 'small', label: '〜100人', icon: '👥' },
      { value: 'medium', label: '〜1000人', icon: '🏢' },
      { value: 'large', label: '1000人以上', icon: '🌍' },
    ],
  },
]

const getRecommendation = (answers: Answer) => {
  const { appType, experience, priority } = answers

  // 基本的なロジック
  if (appType === 'landing') {
    return {
      title: 'LP/サイト向けスタック',
      frontend: ['Next.js', 'Tailwind CSS'],
      backend: ['不要（静的サイト）'],
      database: ['不要'],
      hosting: ['Vercel', 'Cloudflare Pages'],
      reason: 'LPは静的サイトとして構築するのがベスト。Next.jsの静的エクスポートでSEOも最適化できます。',
    }
  }

  if (experience === 'none' || experience === 'beginner') {
    if (priority === 'speed') {
      return {
        title: '初心者×スピード重視スタック',
        frontend: ['Next.js', 'Tailwind CSS', 'shadcn/ui'],
        backend: ['Supabase（BaaS）'],
        database: ['Supabase（PostgreSQL）'],
        hosting: ['Vercel'],
        reason: 'バックエンドをSupabaseに任せることで、フロントエンドに集中できます。Cursorと組み合わせて最速開発。',
      }
    }
    return {
      title: '初心者向け学習スタック',
      frontend: ['Next.js', 'Tailwind CSS'],
      backend: ['Next.js API Routes'],
      database: ['Supabase'],
      hosting: ['Vercel'],
      reason: '最もドキュメントが充実したスタック。学習リソースも豊富です。',
    }
  }

  if (appType === 'mobile') {
    return {
      title: 'モバイルアプリスタック',
      frontend: ['React Native', 'Expo'],
      backend: ['Supabase'],
      database: ['Supabase（PostgreSQL）'],
      hosting: ['EAS（Expo）'],
      reason: 'Expoを使えばiOS/Androidを同時開発。Supabaseでバックエンドも効率化。',
    }
  }

  if (appType === 'api') {
    return {
      title: 'API/バックエンドスタック',
      frontend: ['不要'],
      backend: ['Node.js', 'Hono/Fastify'],
      database: ['PostgreSQL', 'Prisma'],
      hosting: ['Railway', 'Fly.io'],
      reason: '軽量で高速なAPIサーバーを構築。Prismaで型安全なDB操作。',
    }
  }

  // デフォルト（Webアプリ、中級以上）
  return {
    title: '本格Webアプリスタック',
    frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
    backend: ['Next.js API Routes', 'tRPC'],
    database: ['PostgreSQL', 'Prisma'],
    hosting: ['Vercel', 'Supabase'],
    reason: 'スケーラブルで型安全な構成。チーム開発にも対応できます。',
  }
}

export default function TechStackAdvisorPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answer>({})
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null)

  const handleSelect = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setResult(getRecommendation(newAnswers))
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
          <span className="inline-block px-4 py-1.5 bg-[#06B6D4] text-white text-xs font-bold rounded-full mb-4">
            TECH STACK ADVISOR
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            技術スタック診断
          </h1>
          <p className="text-[#525252] max-w-xl mx-auto">
            4つの質問に答えるだけで、あなたに最適な技術構成を提案します。
          </p>
        </header>

        {!result ? (
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-[#525252] mb-2">
                <span>質問 {step + 1} / {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#06B6D4] to-[#6366F1] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="card p-8">
              <h2 className="text-xl font-bold mb-6 text-center">
                {currentQuestion.question}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(currentQuestion.id, option.value)}
                    className="p-6 border-2 border-[#E5E7EB] rounded-xl hover:border-[#6366F1] hover:bg-[#6366F1]/5 transition-all text-center group"
                  >
                    <span className="text-4xl mb-3 block">{option.icon}</span>
                    <span className="font-medium group-hover:text-[#6366F1]">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 md:p-12">
              <div className="text-center mb-8">
                <span className="text-5xl mb-4 block">🎯</span>
                <h2 className="text-2xl font-bold mb-2">診断結果</h2>
                <p className="text-xl text-[#6366F1] font-bold">{result.title}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#6366F1] mb-2">💻 フロントエンド</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.frontend.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-[#6366F1]/10 text-[#6366F1] rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-[#06B6D4] mb-2">⚙️ バックエンド</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.backend.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-[#06B6D4]/10 text-[#06B6D4] rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-[#F97316] mb-2">🗄️ データベース</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.database.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-[#F97316]/10 text-[#F97316] rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-[#10B981] mb-2">🚀 ホスティング</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.hosting.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB]">
                  <h3 className="font-bold mb-2">💡 この構成をおすすめする理由</h3>
                  <p className="text-[#525252]">{result.reason}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-[#E5E7EB] rounded-xl hover:border-[#6366F1] transition-colors"
                >
                  もう一度診断する
                </button>
                <a
                  href="/guide/vibe-coding"
                  className="btn-cta"
                >
                  開発を始める →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
