"use client";

import { useState } from "react";
import { playSuccess } from "@/lib/sound";

interface QuizQuestion {
  question: string;
  choices: string[];
  answer: number; // 0-indexed
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.answer;
    if (correct) {
      setScore((s) => s + 1);
      playSuccess();
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      onComplete(score + (selected === q.answer ? 1 : 0));
    }
  };

  if (finished) {
    const finalScore = score;
    const total = questions.length;
    return (
      <div className="p-6 text-center">
        <p className="text-lg font-bold text-dojo-text mb-2">
          {finalScore}/{total} 正解
        </p>
        <p className="text-sm text-dojo-text-muted">
          {finalScore === total ? "満点！完璧です" : finalScore >= total * 0.6 ? "合格ライン。復習すればさらに定着します" : "もう一度レッスンを確認してみましょう"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <p className="text-xs text-dojo-text-muted mb-3">
        理解度チェック {currentQ + 1}/{questions.length}
      </p>
      <p className="text-sm font-bold text-dojo-text mb-4 leading-relaxed">
        {q.question}
      </p>
      <div className="space-y-2 mb-4">
        {q.choices.map((choice, idx) => {
          let style = "border-dojo-border bg-white text-dojo-text";
          if (answered) {
            if (idx === q.answer) style = "border-[#2D8B6F] bg-[#2D8B6F]/5 text-[#2D8B6F]";
            else if (idx === selected) style = "border-[#525252] bg-[#525252]/5 text-[#525252]";
            else style = "border-dojo-border bg-white text-dojo-text-muted";
          } else if (idx === selected) {
            style = "border-dojo-ink bg-dojo-ink/5 text-dojo-text";
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${style}`}
            >
              {String.fromCharCode(65 + idx)}. {choice}
            </button>
          );
        })}
      </div>
      {answered && (
        <button
          onClick={handleNext}
          className="w-full py-2.5 text-sm font-bold text-white rounded-xl transition-opacity hover:opacity-85"
          style={{ backgroundColor: "var(--dojo-vermillion)" }}
        >
          {currentQ < questions.length - 1 ? "次の問題" : "結果を見る"}
        </button>
      )}
    </div>
  );
}
