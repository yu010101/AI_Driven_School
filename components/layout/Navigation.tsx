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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0]" role="navigation" aria-label="メインナビゲーション">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="AI駆動塾 ホーム">
            <div className="w-9 h-9 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-xl flex items-center justify-center shadow-lg shadow-[#6366F1]/20 group-hover:shadow-[#6366F1]/40 transition-shadow">
              <span className="font-bold text-white text-xs">AI</span>
            </div>
            <span className="font-bold text-[#0F172A] text-lg">駆動塾</span>
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
                      ? 'bg-[#EEF2FF] text-[#6366F1]'
                      : 'text-[#64748B] hover:text-[#6366F1] hover:bg-[#EEF2FF]'
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
            className="md:hidden p-2 text-[#64748B] hover:text-[#6366F1] transition-colors rounded-lg hover:bg-[#EEF2FF]"
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
            className="md:hidden mt-3 pt-3 border-t border-[#E2E8F0]"
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
                        ? 'bg-[#EEF2FF] text-[#6366F1]'
                        : 'text-[#64748B] hover:text-[#6366F1] hover:bg-[#EEF2FF]'
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
