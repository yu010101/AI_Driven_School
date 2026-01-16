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
    { href: '/guide', label: '完全ガイド' },
    { href: '/knowledge', label: '記事一覧' },
    { href: '/tools', label: 'ツール' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-[#E2E8F0]/50" role="navigation" aria-label="メインナビゲーション">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent" />

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced animation */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="AI駆動塾 ホーム">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:shadow-black/20 transition-all duration-300 group-hover:scale-105">
                <span className="font-bold text-white text-sm">AI</span>
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#06B6D4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#0A0A0A] text-lg leading-tight group-hover:text-[#6366F1] transition-colors">駆動塾</span>
              <span className="text-[10px] text-[#94A3B8] font-medium tracking-wider">AI DRIVEN SCHOOL</span>
            </div>
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
                  className={`nav-link px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-[#6366F1] bg-[#6366F1]/5'
                      : 'text-[#64748B] hover:text-[#0A0A0A] hover:bg-[#F5F5F5]'
                  } ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="ml-3 pl-3 border-l border-[#E2E8F0]">
              <Search />
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden relative p-2.5 text-[#64748B] hover:text-[#0A0A0A] transition-colors rounded-xl hover:bg-[#F5F5F5] group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            <div className="w-5 h-5 relative">
              <span
                className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-2.5 rotate-45' : 'top-1'
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span
                className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-2.5 -rotate-45' : 'top-4'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-3 pt-3 border-t border-[#E2E8F0]' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 pb-2">
            <div className="px-2 py-3">
              <Search />
            </div>
            {links.map((link, index) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#6366F1]/10 to-[#06B6D4]/5 text-[#6366F1]'
                      : 'text-[#64748B] hover:text-[#0A0A0A] hover:bg-[#F5F5F5]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Icon for each link */}
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-[#6366F1]/10' : 'bg-[#F5F5F5]'
                  }`}>
                    {link.href === '/' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    {link.href === '/about' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {link.href === '/free' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    {link.href === '/knowledge' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    )}
                  </span>
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
