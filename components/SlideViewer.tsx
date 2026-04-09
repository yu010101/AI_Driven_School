"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface RelatedArticle {
  title: string;
  path: string;
}

interface SlideViewerProps {
  content: string;
  title: string;
  step: number;
  totalSteps: number;
  relatedArticles?: RelatedArticle[];
  onReachFinal?: () => void;
}

function renderMarkdown(md: string): string {
  return md
    // Before/After block: :::before-after{before="手作業30分" after="10秒"}
    .replace(
      /:::before-after\{before="([^"]+)"\s+after="([^"]+)"\}/g,
      `<div class="dojo-before-after">
        <div class="dojo-ba-before"><div class="dojo-ba-label">Before</div><div class="dojo-ba-value">$1</div></div>
        <div class="dojo-ba-arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="dojo-ba-after"><div class="dojo-ba-label">After</div><div class="dojo-ba-value">$2</div></div>
      </div>`
    )
    // Flow block: :::flow{steps="📄 議事録 → 🤖 AI要約 → 💬 Slack投稿"}
    .replace(
      /:::flow\{steps="([^"]+)"\}/g,
      (_, stepsStr: string) => {
        const steps = stepsStr.split("→").map((s: string) => s.trim());
        const html = steps.map((s: string, i: number) => {
          const arrow = i < steps.length - 1
            ? '<div class="dojo-flow-arrow"><svg width="16" height="20" viewBox="0 0 16 20"><path d="M8 0v14m-4-4l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>'
            : '';
          return `<div class="dojo-flow-step">${s}</div>${arrow}`;
        }).join('');
        return `<div class="dojo-flow">${html}</div>`;
      }
    )
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre><code>$2</code></pre>'
    )
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(
      /^- (.+)$/gm,
      '<li><span class="dojo-list-bullet">●</span><span>$1</span></li>'
    )
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, "<br/>");
}

export default function SlideViewer({
  content,
  title,
  step,
  totalSteps,
  relatedArticles,
  onReachFinal,
}: SlideViewerProps) {
  // Split content by ---step--- delimiter
  const slides = useMemo(() => {
    const parts = content.split(/^---step---$/m).map((s) => s.trim()).filter(Boolean);
    return parts.length > 0 ? parts : [content];
  }, [content]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === slides.length - 1;
  const isSingleSlide = slides.length === 1;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      if (currentSlide + 1 === slides.length - 1) {
        onReachFinal?.();
      }
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const html = renderMarkdown(slides[currentSlide]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-dojo-border bg-dojo-vermillion-light">
        <div className="flex items-center justify-between mb-2">
          <span className="dojo-badge">
            {step} / {totalSteps}
          </span>
          {!isSingleSlide && (
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentSlide(i); if (i === slides.length - 1) onReachFinal?.(); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide
                      ? "bg-dojo-vermillion scale-125"
                      : i < currentSlide
                      ? "bg-dojo-vermillion/40"
                      : "bg-dojo-border"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <h1 className="text-xl font-bold text-dojo-text font-heading" style={{ letterSpacing: '-0.02em' }}>
          {title}
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div
          key={currentSlide}
          className="dojo-slide-content dojo-slide-enter"
          dangerouslySetInnerHTML={{
            __html: `<p>${html}</p>`,
          }}
        />

        {/* Related Articles — show on last slide */}
        {isLastSlide && relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-8 pt-6 border-t border-dojo-border animate-fadeIn">
            <h3 className="text-xs font-bold text-dojo-text-muted uppercase tracking-wider mb-3">
              関連記事
            </h3>
            <div className="space-y-2">
              {relatedArticles.map((article) => (
                <Link
                  key={article.path}
                  href={article.path}
                  target="_blank"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dojo-border hover:border-dojo-vermillion hover:bg-dojo-vermillion-light/50 transition-all group"
                >
                  <span className="text-sm text-dojo-text group-hover:text-dojo-vermillion transition-colors">
                    {article.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="px-6 py-3 border-t border-dojo-border bg-dojo-surface">
        {isSingleSlide || isLastSlide ? (
          <p className="text-sm text-dojo-text-muted flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-dojo-vermillion rounded-full dojo-pulse" />
            右のターミナルにコマンドを入力してください
          </p>
        ) : (
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="text-sm text-dojo-text-muted hover:text-dojo-text disabled:opacity-30 transition-colors px-3 py-1"
            >
              ← 前へ
            </button>
            <span className="text-xs text-dojo-text-muted">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={handleNext}
              className="text-sm font-medium text-white px-4 py-1.5 rounded-lg transition-all hover:shadow-md"
              style={{ backgroundColor: "var(--dojo-vermillion)" }}
            >
              次へ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
