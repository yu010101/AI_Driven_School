"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import LessonLayout from "@/components/LessonLayout";
import SlideViewer from "@/components/SlideViewer";
import { markLessonComplete, getProgress, saveProgress } from "@/lib/progress";
import Confetti from "@/components/Confetti";
import Mascot from "@/components/Mascot";
import Onboarding from "@/components/Onboarding";
import XPBar from "@/components/XPBar";
import Quiz from "@/components/Quiz";
import { playSuccess, playLevelUp } from "@/lib/sound";

const Terminal = dynamic(() => import("@/components/Terminal"), { ssr: false });

interface RelatedArticle {
  title: string;
  path: string;
}

interface LessonData {
  title: string;
  step: number;
  totalSteps: number;
  expectedCommand: string;
  acceptableCommands?: string[];
  simulatedOutput: string;
  hint: string;
  content: string;
  slug: string;
  quiz?: { question: string; choices: string[]; answer: number }[];
  relatedArticles?: RelatedArticle[];
}

interface Props {
  courseId: string;
  courseTitle: string;
  lesson: LessonData;
  nextLessonSlug: string | null;
  isLastLessonOfCourse: boolean;
}

const COURSE_COMPLETE_MESSAGES: Record<string, { rank: string; message: string }> = {
  "level0-setup": { rank: "初級", message: "セットアップ完了。AIアシスタントが使えるようになりました" },
  "level1-tips10": { rank: "初級", message: "10個の実務レシピをマスター。明日から業務が変わります" },
  "level2-automation": { rank: "中級", message: "自動化をマスター。手動作業が減ります" },
  "level3-dx-design": { rank: "中級", message: "DX設計完了。自社のAI基盤を構築できます" },
  "level4-skills": { rank: "中級", message: "Skills習得。AIに専門スキルを持たせられます" },
  "level5-openclaw": { rank: "上級", message: "AI経営OS構築完了。24時間AIが動きます" },
  "level6-antigravity": { rank: "上級", message: "マルチIDE対応。どの環境でも通用します" },
  "level7-exam": { rank: "上級", message: "模擬テストクリア。公式認定の準備ができました" },
  "level8-essential": { rank: "上級", message: "Hooks/Permission/Context/Costをマスター" },
  "level9-enterprise": { rank: "認定", message: "全51レッスン完走。Anthropic公式認定に挑戦できます" },
};

const NEXT_COURSE: Record<string, { courseId: string; firstLesson: string }> = {
  "level0-setup": { courseId: "level1-tips10", firstLesson: "01-meeting-to-slack" },
  "level1-tips10": { courseId: "level2-automation", firstLesson: "01-meeting-pipeline" },
  "level2-automation": { courseId: "level3-dx-design", firstLesson: "01-what-is-mcp" },
  "level3-dx-design": { courseId: "level4-skills", firstLesson: "01-what-are-skills" },
  "level4-skills": { courseId: "level5-openclaw", firstLesson: "01-overview" },
  "level5-openclaw": { courseId: "level6-antigravity", firstLesson: "01-what-is-antigravity" },
  "level6-antigravity": { courseId: "level7-exam", firstLesson: "01-claude101" },
  "level7-exam": { courseId: "level8-essential", firstLesson: "01-hooks" },
  "level8-essential": { courseId: "level9-enterprise", firstLesson: "01-github-actions" },
};

// XP multiplier for recall challenge
const RECALL_XP_BONUS = 15;

export default function LessonClient({
  courseId,
  courseTitle,
  lesson,
  nextLessonSlug,
  isLastLessonOfCourse,
}: Props) {
  const [completed, setCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [xpKey, setXpKey] = useState(0);
  const [reachedFinalSlide, setReachedFinalSlide] = useState(false);

  // Recall challenge mode
  const [recallMode, setRecallMode] = useState(false);
  const [recallCompleted, setRecallCompleted] = useState(false);
  const [terminalKey, setTerminalKey] = useState(0);

  const handleSuccess = useCallback(() => {
    markLessonComplete(courseId, lesson.slug);
    setCompleted(true);
    setXpKey((k) => k + 1);
    playSuccess();
    if (isLastLessonOfCourse) {
      setTimeout(() => {
        setShowCelebration(true);
        playLevelUp();
      }, 800);
    }
  }, [courseId, lesson.slug, isLastLessonOfCourse]);

  const handleRecallSuccess = useCallback(() => {
    // Award bonus XP
    const progress = getProgress();
    progress.xp += RECALL_XP_BONUS;
    saveProgress(progress);
    setRecallCompleted(true);
    setXpKey((k) => k + 1);
    playLevelUp();
  }, []);

  const startRecallChallenge = useCallback(() => {
    setRecallMode(true);
    setTerminalKey((k) => k + 1); // remount terminal
  }, []);

  const courseComplete = COURSE_COMPLETE_MESSAGES[courseId];
  const nextCourse = NEXT_COURSE[courseId];

  // Recall mode slide content
  const recallSlideContent = `## 再現チャレンジ

スライドを見ずに、さっき学んだコマンドを**記憶だけで**もう一度入力してください。

ヒントはありません。思い出せなくても大丈夫 — 挑戦すること自体が記憶を強化します。

成功すると **+${RECALL_XP_BONUS} XP** ボーナス！`;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white">
      {/* First-time onboarding */}
      <Onboarding />

      {/* Confetti on lesson complete */}
      {(completed || recallCompleted) && <Confetti />}

      {/* Course completion celebration overlay */}
      {showCelebration && courseComplete && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-dojo-ink/90 backdrop-blur-sm dojo-success-enter">
          <div className="text-center max-w-md mx-4">
            <div className="mb-4 dojo-float">
              <Mascot mood="happy" size={80} />
            </div>
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white bg-dojo-vermillion mb-4">
              {courseComplete.rank}
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 font-heading" style={{ letterSpacing: '-0.02em' }}>
              {courseTitle} 完了！
            </h2>
            <p className="text-dojo-terminal-fg mb-8 text-sm leading-relaxed">
              {courseComplete.message}
            </p>
            <div className="flex flex-col gap-3">
              {nextCourse && (
                <Link
                  href={`/dojo/${nextCourse.courseId}/${nextCourse.firstLesson}`}
                  className="dojo-btn-primary"
                >
                  次のコースへ
                </Link>
              )}
              <Link
                href="/dojo"
                className="text-sm text-dojo-terminal-fg hover:text-white transition-colors"
              >
                コース一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-dojo-border shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dojo"
            className="text-dojo-text-muted hover:text-dojo-text transition-colors text-sm"
          >
            ← 戻る
          </Link>
          <span className="text-dojo-border hidden sm:inline">|</span>
          <span className="text-sm font-medium text-dojo-text hidden sm:inline">
            {courseTitle}
          </span>
          {recallMode && (
            <span className="text-xs font-bold text-[#525252] bg-[#525252]/10 px-2 py-0.5 rounded-full ml-2">
              再現チャレンジ
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: lesson.totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`dojo-step ${
                  i < lesson.step ? "done" : i === lesson.step ? "current" : ""
                }`}
              />
            ))}
          </div>
          <XPBar refreshKey={xpKey} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-0">
        <LessonLayout
          switchToTerminal={reachedFinalSlide || recallMode}
          slidePanel={
            recallMode ? (
              // Recall mode: minimal slide with just the challenge prompt
              <div className="h-full flex flex-col bg-white">
                <div className="px-6 py-4 border-b border-dojo-border bg-[#F5F5F5]">
                  <span className="text-xs font-bold text-[#525252] bg-[#525252]/10 px-2 py-1 rounded-full">
                    再現チャレンジ
                  </span>
                  <h1 className="text-xl font-bold text-dojo-text font-heading mt-2" style={{ letterSpacing: '-0.02em' }}>
                    {lesson.title}
                  </h1>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="dojo-slide-content">
                    <h2>再現チャレンジ</h2>
                    <p>スライドを見ずに、さっき学んだコマンドを<strong>記憶だけで</strong>もう一度入力してください。</p>
                    <p>ヒントはありません。思い出せなくても大丈夫 — 挑戦すること自体が記憶を強化します。</p>
                    <p>成功すると <strong>+{RECALL_XP_BONUS} XP</strong> ボーナス！</p>
                  </div>
                  <div className="mt-8 flex items-center gap-3">
                    <Mascot mood="thinking" size={48} />
                    <p className="text-sm text-dojo-text-muted">思い出して...</p>
                  </div>
                </div>
                <div className="px-6 py-3 border-t border-dojo-border bg-dojo-surface">
                  <p className="text-sm text-[#525252] flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-[#525252] rounded-full dojo-pulse" />
                    ヒントなし。記憶だけでコマンドを入力してください
                  </p>
                </div>
              </div>
            ) : (
              <SlideViewer
                content={lesson.content}
                title={lesson.title}
                step={lesson.step}
                totalSteps={lesson.totalSteps}
                relatedArticles={lesson.relatedArticles}
                onReachFinal={() => setReachedFinalSlide(true)}
              />
            )
          }
          terminalPanel={
            <div className="h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <Terminal
                  key={terminalKey}
                  expectedCommand={lesson.expectedCommand}
                  acceptableCommands={lesson.acceptableCommands}
                  simulatedOutput={lesson.simulatedOutput}
                  hint={recallMode ? "ヒントなし。記憶で挑戦してください" : lesson.hint}
                  onSuccess={recallMode ? handleRecallSuccess : handleSuccess}
                  disabled={recallMode ? recallCompleted : false}
                />
              </div>

              {/* Success action — normal mode */}
              {completed && !showCelebration && !recallMode && (
                <div className="border-t border-[#2a2b3d] bg-dojo-terminal-bg dojo-success-enter">
                  {/* Quiz if available */}
                  {lesson.quiz && lesson.quiz.length > 0 && !recallCompleted && (
                    <div className="border-b border-[#2a2b3d] bg-white">
                      <Quiz
                        questions={lesson.quiz}
                        onComplete={(score) => {
                          const progress = getProgress();
                          progress.xp += score * 5;
                          saveProgress(progress);
                          setXpKey((k) => k + 1);
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex gap-2">
                        <button
                          onClick={startRecallChallenge}
                          className="flex-1 text-center py-3 text-sm font-semibold rounded-xl border border-[#525252] text-[#525252] hover:bg-[#525252]/5 transition-colors"
                        >
                          ノーヒントで再挑戦（+{RECALL_XP_BONUS}XP）
                        </button>
                        {nextLessonSlug ? (
                          <Link
                            href={`/dojo/${courseId}/${nextLessonSlug}`}
                            className="flex-1 dojo-btn-primary text-center"
                          >
                            次へ
                          </Link>
                        ) : (
                          <Link href="/dojo" className="flex-1 dojo-btn-success text-center">
                            完了
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Success action — recall mode */}
              {recallCompleted && (
                <div className="p-4 border-t border-[#2a2b3d] bg-dojo-terminal-bg dojo-success-enter">
                  <div className="flex items-center gap-3">
                    <Mascot mood="happy" size={36} />
                    <div className="flex-1">
                      <p className="text-[#525252] text-xs font-bold mb-2">+{RECALL_XP_BONUS} XP ボーナス獲得</p>
                      {nextLessonSlug ? (
                        <Link
                          href={`/dojo/${courseId}/${nextLessonSlug}`}
                          className="dojo-btn-primary"
                        >
                          次のレッスンへ
                        </Link>
                      ) : (
                        <Link href="/dojo" className="dojo-btn-success">
                          コース完了！
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}
