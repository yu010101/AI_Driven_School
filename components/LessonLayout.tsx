"use client";

import { useState, useEffect, useCallback } from "react";

interface LessonLayoutProps {
  slidePanel: React.ReactNode;
  terminalPanel: React.ReactNode;
  switchToTerminal?: boolean;
}

export default function LessonLayout({
  slidePanel,
  terminalPanel,
  switchToTerminal,
}: LessonLayoutProps) {
  const [activeTab, setActiveTab] = useState<"slide" | "terminal">("slide");

  // Auto-switch to terminal on mobile when slide reaches final step
  useEffect(() => {
    if (switchToTerminal) {
      setActiveTab("terminal");
    }
  }, [switchToTerminal]);

  return (
    <>
      {/* Desktop: side by side */}
      <div className="hidden md:flex h-full">
        <div className="w-1/2 border-r border-dojo-border overflow-hidden">
          {slidePanel}
        </div>
        <div className="w-1/2 overflow-hidden">{terminalPanel}</div>
      </div>

      {/* Mobile: tab switch */}
      <div className="md:hidden h-full flex flex-col">
        <div className="flex border-b border-dojo-border bg-white shrink-0">
          <button
            onClick={() => setActiveTab("slide")}
            className={`dojo-tab ${activeTab === "slide" ? "active" : ""}`}
          >
            スライド
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`dojo-tab ${activeTab === "terminal" ? "active" : ""}`}
          >
            ターミナル
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className={activeTab === "slide" ? "h-full" : "hidden h-0"}>
            {slidePanel}
          </div>
          <div className={activeTab === "terminal" ? "h-full" : "hidden h-0"}>
            {terminalPanel}
          </div>
        </div>
      </div>
    </>
  );
}
