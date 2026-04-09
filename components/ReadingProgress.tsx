'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      const clampedProgress = Math.min(100, Math.max(0, scrollPercent))
      setProgress(clampedProgress)
      setIsVisible(scrollTop > 100)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      {/* Main Progress Bar - Top */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gradient-to-r from-gray-100/50 via-gray-200/50 to-gray-100/50 backdrop-blur-sm">
        <div
          className="progress-bar h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Side Progress Indicator */}
      <div
        className={`fixed right-6 top-1/2 z-40 -translate-y-1/2 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        <div className="relative flex flex-col items-center gap-2">
          {/* Vertical Progress Track */}
          <div className="w-1.5 h-24 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-[#E5E5E5]/50 overflow-hidden">
            <div
              className="w-full bg-[#0A0A0A] rounded-full transition-all duration-300 ease-out"
              style={{ height: `${progress}%` }}
            />
          </div>

          {/* Percentage Badge */}
          <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg border border-[#E5E5E5]/50">
            <span className="text-xs font-bold text-[#0A0A0A] font-bold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button - Appears at 50%+ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-6 bottom-6 z-40 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-[#E5E5E5]/50 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-xl hover:border-[#0A0A0A]/30 group ${
          progress > 20 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="トップへ戻る"
      >
        <svg
          className="w-5 h-5 text-[#525252] group-hover:text-[#0A0A0A] transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  )
}
