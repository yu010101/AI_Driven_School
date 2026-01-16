'use client'

import { useState } from 'react'
import Link from 'next/link'

const appTypes = [
  { id: 'web', label: 'Webアプリ', icon: '🌐' },
  { id: 'mobile', label: 'モバイルアプリ', icon: '📱' },
  { id: 'chrome', label: 'Chrome拡張', icon: '🧩' },
  { id: 'discord', label: 'Discord Bot', icon: '🤖' },
  { id: 'line', label: 'LINE Bot', icon: '💬' },
  { id: 'cli', label: 'CLIツール', icon: '⌨️' },
]

const features = [
  { id: 'auth', label: 'ログイン機能' },
  { id: 'database', label: 'データベース' },
  { id: 'payment', label: '決済機能' },
  { id: 'upload', label: 'ファイルアップロード' },
  { id: 'realtime', label: 'リアルタイム更新' },
  { id: 'ai', label: 'AI機能' },
  { id: 'email', label: 'メール送信' },
  { id: 'api', label: '外部API連携' },
]

const techStacks = [
  { id: 'nextjs', label: 'Next.js', recommended: true },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue.js' },
  { id: 'html', label: 'HTML/CSS/JS' },
  { id: 'python', label: 'Python' },
  { id: 'any', label: 'おまかせ' },
]

export default function PromptGeneratorPage() {
  const [step, setStep] = useState(1)
  const [appType, setAppType] = useState('')
  const [appName, setAppName] = useState('')
  const [appDescription, setAppDescription] = useState('')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [techStack, setTechStack] = useState('')
  const [additionalRequirements, setAdditionalRequirements] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    )
  }

  const generatePrompt = () => {
    const appTypeLabel = appTypes.find(t => t.id === appType)?.label || ''
    const techStackLabel = techStacks.find(t => t.id === techStack)?.label || ''
    const featureLabels = selectedFeatures
      .map(f => features.find(feat => feat.id === f)?.label)
      .filter(Boolean)

    let prompt = `# ${appName || 'アプリ'}を作成してください

## 概要
${appDescription || '（説明なし）'}

## アプリの種類
${appTypeLabel}

## 技術スタック
${techStack === 'any' ? 'おまかせ（最適なものを選んでください）' : techStackLabel}
`

    if (featureLabels.length > 0) {
      prompt += `
## 必要な機能
${featureLabels.map(f => `- ${f}`).join('\n')}
`
    }

    if (additionalRequirements) {
      prompt += `
## その他の要件
${additionalRequirements}
`
    }

    prompt += `
## 実装ルール
- コードにはコメントを適度に追加してください
- エラーハンドリングを適切に実装してください
- レスポンシブデザインに対応してください
- 日本語UIで作成してください
- 初心者でも理解できるシンプルな構成にしてください

まず全体の設計を説明してから、コードを生成してください。
`

    setGeneratedPrompt(prompt)
    setStep(5)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetForm = () => {
    setStep(1)
    setAppType('')
    setAppName('')
    setAppDescription('')
    setSelectedFeatures([])
    setTechStack('')
    setAdditionalRequirements('')
    setGeneratedPrompt('')
  }

  return (
    <div className="py-12 md:py-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <header className="text-center mb-12">
          <Link href="/tools" className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#6366F1] mb-4 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ツール一覧に戻る
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            プロンプト生成器
          </h1>
          <p className="text-[#525252]">
            質問に答えるだけで、AIへの最適なプロンプトを自動生成
          </p>
        </header>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 4 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step >= s
                      ? 'bg-[#6366F1] text-white'
                      : 'bg-[#E5E5E5] text-[#64748B]'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-colors ${
                      step > s ? 'bg-[#6366F1]' : 'bg-[#E5E5E5]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#64748B]">
            <span>種類</span>
            <span>詳細</span>
            <span>機能</span>
            <span>技術</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="card p-6 md:p-8">
          {/* Step 1: App Type */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">何を作りますか？</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {appTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setAppType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      appType === type.id
                        ? 'border-[#6366F1] bg-[#6366F1]/5'
                        : 'border-[#E5E5E5] hover:border-[#6366F1]/50'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!appType}
                  className="btn-cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  次へ
                </button>
              </div>
            </div>
          )}

          {/* Step 2: App Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">アプリの詳細を教えてください</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">アプリ名（任意）</label>
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="例: TaskMaster"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">どんなアプリですか？</label>
                  <textarea
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                    placeholder="例: タスクを管理できるアプリ。カテゴリ分け、期限設定、優先度の設定ができる。"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                >
                  戻る
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!appDescription}
                  className="btn-cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  次へ
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Features */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">必要な機能を選んでください</h2>
              <p className="text-sm text-[#64748B]">複数選択可能です</p>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedFeatures.includes(feature.id)
                        ? 'border-[#6366F1] bg-[#6366F1]/5'
                        : 'border-[#E5E5E5] hover:border-[#6366F1]/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                        selectedFeatures.includes(feature.id)
                          ? 'border-[#6366F1] bg-[#6366F1]'
                          : 'border-[#E5E5E5]'
                      }`}>
                        {selectedFeatures.includes(feature.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                      {feature.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary"
                >
                  戻る
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-cta"
                >
                  次へ
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Tech Stack */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">技術スタックを選んでください</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {techStacks.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => setTechStack(tech.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                      techStack === tech.id
                        ? 'border-[#6366F1] bg-[#6366F1]/5'
                        : 'border-[#E5E5E5] hover:border-[#6366F1]/50'
                    }`}
                  >
                    <span className="font-medium">{tech.label}</span>
                    {tech.recommended && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#10B981] text-white text-xs font-bold rounded-full">
                        推奨
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">その他の要件（任意）</label>
                <textarea
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="例: ダークモード対応、アニメーションを多用など"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition-all resize-none"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="btn-secondary"
                >
                  戻る
                </button>
                <button
                  onClick={generatePrompt}
                  disabled={!techStack}
                  className="btn-cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  プロンプトを生成
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Result */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">生成されたプロンプト</h2>
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    copied
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#F5F5F5] text-[#0A0A0A] hover:bg-[#E5E5E5]'
                  }`}
                >
                  {copied ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      コピーしました
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      コピー
                    </span>
                  )}
                </button>
              </div>
              <div className="bg-[#0A0A0A] rounded-xl p-4 overflow-auto max-h-96">
                <pre className="text-sm text-white whitespace-pre-wrap font-mono">
                  {generatedPrompt}
                </pre>
              </div>
              <div className="bg-[#6366F1]/5 border border-[#6366F1]/20 rounded-xl p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  使い方
                </h3>
                <ol className="text-sm text-[#525252] space-y-1">
                  <li>1. 上のプロンプトをコピー</li>
                  <li>2. CursorまたはClaude Codeに貼り付け</li>
                  <li>3. Enterを押して実行</li>
                </ol>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  最初からやり直す
                </button>
                <Link
                  href="/guide/vibe-coding"
                  className="btn-cta inline-flex items-center gap-2"
                >
                  バイブコーディングを学ぶ
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
