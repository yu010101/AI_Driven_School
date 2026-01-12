'use client'

import { useState } from 'react'

interface EmailFormProps {
  resourceName: string
  resourceId: string
}

export function EmailForm({ resourceName, resourceId }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setErrorMessage('有効なメールアドレスを入力してください')
      return
    }

    try {
      // Store in localStorage for now (can be replaced with API call)
      const subscribers = JSON.parse(localStorage.getItem('email_subscribers') || '[]')
      const newEntry = {
        email,
        resourceId,
        resourceName,
        subscribedAt: new Date().toISOString(),
      }
      subscribers.push(newEntry)
      localStorage.setItem('email_subscribers', JSON.stringify(subscribers))

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setErrorMessage('エラーが発生しました。もう一度お試しください。')
    }
  }

  if (status === 'success') {
    return (
      <div className="card-strong p-8 text-center corner-marks">
        <div className="text-primary font-mono text-4xl mb-4">[OK]</div>
        <h3 className="font-bold text-xl mb-4 text-foreground">登録完了</h3>
        <p className="text-foreground/60 mb-4">
          {resourceName}のダウンロードリンクをメールでお送りしました。
        </p>
        <p className="text-foreground/40 text-sm font-mono">
          ※ 現在準備中のため、公開次第お知らせします
        </p>
      </div>
    )
  }

  return (
    <div className="card-strong p-8 text-center corner-marks">
      <h3 className="font-bold text-xl mb-4 font-mono">DOWNLOAD</h3>
      <p className="text-foreground/60 mb-6">
        メールアドレスを入力して無料でダウンロード
      </p>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor={`email-${resourceId}`} className="sr-only">
            メールアドレス
          </label>
          <input
            id={`email-${resourceId}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-describedby={errorMessage ? `error-${resourceId}` : undefined}
            className="w-full px-4 py-3 bg-background border border-border text-foreground font-mono placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        {status === 'error' && (
          <p id={`error-${resourceId}`} className="text-red-500 text-sm mb-4 font-mono" role="alert">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'SENDING...' : 'GET_FREE_ACCESS'}
        </button>
      </form>
      <p className="text-foreground/40 text-xs mt-4">
        スパムは送りません。いつでも解除できます。
      </p>
    </div>
  )
}
