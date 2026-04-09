"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { playSuccess, playLevelUp } from "@/lib/sound";
import { syncQuizResult } from "@/lib/progress";

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

interface CertQuizProps {
  title: string;
  description: string;
  questions: Question[];
  isMockExam?: boolean;
}

export default function CertQuiz({ title, description, questions, isMockExam }: CertQuizProps) {
  const shuffled = useMemo(
    () => (isMockExam ? [...questions].sort(() => Math.random() - 0.5).slice(0, 30) : questions),
    [questions, isMockExam]
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<{ qId: number; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);
  const [showWrongOnly, setShowWrongOnly] = useState(false);
  const [retryQuestions, setRetryQuestions] = useState<Question[] | null>(null);

  const activeQuestions = retryQuestions || shuffled;
  const q = activeQuestions[currentIdx];
  const score = results.filter((r) => r.correct).length;
  const total = activeQuestions.length;

  const handleSelect = useCallback(
    (idx: number) => {
      if (answered) return;
      setSelected(idx);
      setAnswered(true);
      const correct = idx === q.answer;
      setResults((prev) => [...prev, { qId: q.id, correct }]);
      if (correct) playSuccess();
    },
    [answered, q]
  );

  const handleNext = useCallback(() => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalScore = score + (selected === q.answer ? 1 : 0);
      setFinished(true);
      playLevelUp();
      syncQuizResult(title, finalScore, total);
    }
  }, [currentIdx, activeQuestions.length, score, selected, q, title, total]);

  const handleRetryWrong = useCallback(() => {
    const wrongIds = results.filter((r) => !r.correct).map((r) => r.qId);
    const wrongQs = shuffled.filter((q) => wrongIds.includes(q.id));
    if (wrongQs.length === 0) return;
    setRetryQuestions(wrongQs);
    setCurrentIdx(0);
    setSelected(null);
    setAnswered(false);
    setResults([]);
    setFinished(false);
  }, [results, shuffled]);

  const handleRetryAll = useCallback(() => {
    setRetryQuestions(null);
    setCurrentIdx(0);
    setSelected(null);
    setAnswered(false);
    setResults([]);
    setFinished(false);
  }, []);

  // Result screen
  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 80;
    const wrongIds = results.filter((r) => !r.correct).map((r) => r.qId);
    const wrongQs = activeQuestions.filter((q) => wrongIds.includes(q.id));

    return (
      <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Link href="/dojo/cert" className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-8 block">
            ← 認定対策一覧
          </Link>

          <div className="text-center mb-12">
            <p className="text-6xl font-bold text-[#0A0A0A] mb-2">{pct}%</p>
            <p className="text-lg font-bold text-[#0A0A0A] mb-1">
              {score}/{total} 正解
            </p>
            <p className="text-sm text-[#525252]">
              {passed ? "合格ライン（80%）をクリア" : "合格ラインは80%。もう少し"}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center mb-12">
            {wrongQs.length > 0 && (
              <button
                onClick={handleRetryWrong}
                className="px-6 py-3 text-sm font-bold text-white rounded-xl"
                style={{ backgroundColor: "#0A0A0A" }}
              >
                間違えた{wrongQs.length}問だけ再挑戦
              </button>
            )}
            <button
              onClick={handleRetryAll}
              className="px-6 py-3 text-sm font-bold text-[#0A0A0A] rounded-xl border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
            >
              最初からやり直す
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-[#E5E5E5] text-center">
            <Link href="/dojo" className="text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors">
              道場のレッスンで学び直す
            </Link>
          </div>

          {/* Wrong answers review */}
          {wrongQs.length > 0 && (
            <div>
              <button
                onClick={() => setShowWrongOnly(!showWrongOnly)}
                className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-4 block"
              >
                {showWrongOnly ? "閉じる" : `間違えた問題を確認（${wrongQs.length}問）`}
              </button>
              {showWrongOnly && (
                <div className="space-y-6">
                  {wrongQs.map((wq) => (
                    <div key={wq.id} className="border border-[#E5E5E5] rounded-xl p-5">
                      <p className="font-bold text-[#0A0A0A] text-sm mb-3">{wq.question}</p>
                      <p className="text-sm text-[#525252] mb-1">
                        正解: {String.fromCharCode(65 + wq.answer)}. {wq.choices[wq.answer]}
                      </p>
                      <p className="text-sm text-[#94A3B8]">{wq.explanation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dojo/cert" className="text-sm text-[#525252] hover:text-[#0A0A0A]">
            ← 戻る
          </Link>
          <span className="text-sm font-bold text-[#0A0A0A]">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0A0A0A] rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            />
          </div>
          <span className="text-xs text-[#525252]">
            {currentIdx + 1}/{total}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-12">
          <p className="text-lg font-bold text-[#0A0A0A] mb-8 leading-relaxed">
            {q.question}
          </p>

          <div className="space-y-3 mb-8">
            {q.choices.map((choice, idx) => {
              let borderColor = "#E5E5E5";
              let bgColor = "white";
              let textColor = "#0A0A0A";

              if (answered) {
                if (idx === q.answer) {
                  borderColor = "#0A0A0A";
                  bgColor = "#0A0A0A";
                  textColor = "white";
                } else if (idx === selected) {
                  borderColor = "#94A3B8";
                  bgColor = "#F5F5F5";
                  textColor = "#94A3B8";
                } else {
                  textColor = "#94A3B8";
                }
              } else if (idx === selected) {
                borderColor = "#0A0A0A";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  className="w-full text-left px-5 py-4 rounded-xl border text-sm transition-colors flex items-start gap-3"
                  style={{ borderColor, backgroundColor: bgColor, color: textColor }}
                >
                  <span className="font-bold shrink-0">{String.fromCharCode(65 + idx)}.</span>
                  <span>{choice}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation after answering */}
          {answered && (
            <div className="mb-8 p-4 bg-[#F5F5F5] rounded-xl">
              <p className="text-sm text-[#525252] leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {answered && (
            <button
              onClick={handleNext}
              className="w-full py-3 text-sm font-bold text-white rounded-xl"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              {currentIdx < activeQuestions.length - 1 ? "次の問題" : "結果を見る"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
