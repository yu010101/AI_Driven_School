'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Search from '@/components/Search'

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    { href: '/', label: 'ホーム' },
    { href: '/about', label: 'About' },
    { href: '/free', label: '無料で学ぶ' },
    { href: '/knowledge', label: '記事一覧' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200" role="navigation" aria-label="メインナビゲーション">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="AI駆動塾 ホーム">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-xs">AI</span>
            </div>
            <span className="font-bold text-gray-900">駆動塾</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="ml-2">
              <Search />
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors rounded-lg hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-3 pt-3 border-t border-gray-200"
          >
            <div className="flex flex-col gap-1">
              <div className="px-4 py-2">
                <Search />
              </div>
              {links.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
