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
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono bg-white rounded border border-gray-300">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* 検索モーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/50 backdrop-blur-sm">
          <div
            ref={containerRef}
            className="w-full max-w-xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            {/* 検索入力 */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <svg
                className="w-5 h-5 text-gray-400"
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
                className="flex-1 text-lg outline-none placeholder:text-gray-400"
              />
              {isLoading && (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              )}
              <button
                onClick={handleClose}
                className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700"
              >
                ESC
              </button>
            </div>

            {/* 検索結果 */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.length >= 2 && results.length === 0 && !isLoading && (
                <div className="px-4 py-8 text-center text-gray-500">
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
                        className="flex flex-col gap-1 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {categoryNames[result.category] || result.category}
                          </span>
                          <span className="font-medium text-gray-900">
                            {result.title}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {result.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {query.length < 2 && (
                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  2文字以上入力してください
                </div>
              )}
            </div>

            {/* フッター */}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↓</kbd>
                で移動
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">Enter</kbd>
                で開く
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
