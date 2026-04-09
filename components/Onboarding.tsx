"use client";

import { useState, useEffect } from "react";
import Mascot from "./Mascot";

const STORAGE_KEY = "dojo-onboarding-done";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleDone = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  const steps = [
    {
      text: "左のスライドでやることを確認します",
      arrow: "left" as const,
    },
    {
      text: "「次へ」を押してコマンドを確認します",
      arrow: "bottom" as const,
    },
    {
      text: "右のターミナルにコピペして Enter！",
      arrow: "right" as const,
    },
  ];

  const current = steps[step];

  return (
    <div className="absolute inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dojo-ink/60 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 dojo-success-enter">
        <div className="flex items-start gap-3 mb-4">
          <Mascot mood="happy" size={48} />
          <div>
            <h3 className="font-bold text-dojo-text text-sm mb-1">
              使い方ガイド（{step + 1}/3）
            </h3>
            <p className="text-dojo-text-muted text-sm leading-relaxed">
              {current.text}
            </p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-1.5 mb-4 justify-center">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? "bg-dojo-vermillion scale-125" : i < step ? "bg-dojo-vermillion/40" : "bg-dojo-border"
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleDone}
            className="text-xs text-dojo-text-muted hover:text-dojo-text transition-colors"
          >
            スキップ
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all"
              style={{ backgroundColor: "var(--dojo-vermillion)" }}
            >
              次へ
            </button>
          ) : (
            <button
              onClick={handleDone}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all"
              style={{ backgroundColor: "var(--dojo-vermillion)" }}
            >
              OK、始める！
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
