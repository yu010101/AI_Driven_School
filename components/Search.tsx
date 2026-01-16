'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface SearchResult {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
}

const categoryNames: Record<string, string> = {
  'vibe-coding': 'バイブコーディング',
  'build': '実装パターン',
  'marketing': '0円マーケティング',
}

const categoryColors: Record<string, string> = {
  'vibe-coding': 'bg-[#EEF2FF] text-[#6366F1]',
  'build': 'bg-[#ECFEFF] text-[#06B6D4]',
  'marketing': 'bg-[#FFF7ED] text-[#F97316]',
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 検索実行
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      }
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // キーボードショートカット (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // モーダルが開いたらinputにフォーカス
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // モーダル外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  return (
    <>
      {/* 検索ボタン */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#525252] bg-[#F5F5F5] hover:bg-[#E5E5E5] hover:text-[#0A0A0A] rounded-lg transition-colors"
        aria-label="検索"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">検索</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono bg-white rounded border border-[#E5E5E5]">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* 検索モーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-[#0F172A]/50 backdrop-blur-sm">
          <div
            ref={containerRef}
            className="w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E5E5E5]"
          >
            {/* 検索入力 */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-[#E5E5E5]">
              <svg
                className="w-5 h-5 text-[#0A0A0A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="記事を検索..."
                className="flex-1 text-lg outline-none placeholder:text-[#94A3B8] text-[#0F172A]"
              />
              {isLoading && (
                <div className="w-5 h-5 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" />
              )}
              <button
                onClick={handleClose}
                className="px-2 py-1 text-sm text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] rounded transition-colors"
              >
                ESC
              </button>
            </div>

            {/* 検索結果 */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.length >= 2 && results.length === 0 && !isLoading && (
                <div className="px-4 py-8 text-center text-[#64748B]">
                  「{query}」に一致する記事が見つかりませんでした
                </div>
              )}

              {results.length > 0 && (
                <ul className="py-2">
                  {results.map((result) => (
                    <li key={`${result.category}-${result.slug}`}>
                      <Link
                        href={`/knowledge/${result.category}/${result.slug}`}
                        onClick={handleClose}
                        className="flex flex-col gap-1 px-4 py-3 hover:bg-[#F5F5F5] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[result.category] || 'bg-gray-100 text-gray-600'}`}>
                            {categoryNames[result.category] || result.category}
                          </span>
                          <span className="font-medium text-[#0F172A]">
                            {result.title}
                          </span>
                        </div>
                        <p className="text-sm text-[#64748B] line-clamp-1">
                          {result.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {query.length < 2 && (
                <div className="px-4 py-8 text-center text-[#94A3B8] text-sm">
                  2文字以上入力してください
                </div>
              )}
            </div>

            {/* フッター */}
            <div className="px-4 py-3 border-t border-[#E5E5E5] bg-[#FAFAFA] text-xs text-[#525252] flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#E5E5E5] text-[#0A0A0A]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#E5E5E5] text-[#0A0A0A]">↓</kbd>
                で移動
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#E5E5E5] text-[#0A0A0A]">Enter</kbd>
                で開く
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
