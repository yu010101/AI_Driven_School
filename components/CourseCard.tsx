import Link from "next/link";
import ProgressBar from "./ProgressBar";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  level: number;
  totalLessons: number;
  estimatedMinutes: number;
  completedLessons: number;
  firstLessonSlug: string;
  basePath?: string;
  certification?: string;
}

export default function CourseCard({
  id,
  title,
  description,
  level,
  totalLessons,
  estimatedMinutes,
  completedLessons,
  firstLessonSlug,
  basePath = "/dojo",
  certification,
}: CourseCardProps) {
  const isCompleted = completedLessons >= totalLessons;

  return (
    <Link href={`${basePath}/${id}/${firstLessonSlug}`} className="block group">
      <div className={`dojo-card ${isCompleted ? "completed" : ""}`}>
        {/* Level badge + certification */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="dojo-badge">Level {level}</span>
            {certification && (
              <span className="text-[10px] font-medium text-[#6B6B7B] bg-[#F5F5F5] px-2 py-0.5 rounded-full">
                {certification}
              </span>
            )}
          </div>
          <span className="text-xs text-dojo-text-muted">{estimatedMinutes}分</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-dojo-text mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-dojo-text-muted mb-4 leading-relaxed">
          {description}
        </p>

        {/* Progress */}
        <ProgressBar current={completedLessons} total={totalLessons} />

        {/* Status label */}
        <div className="mt-3 text-right">
          {isCompleted ? (
            <span className="text-xs font-medium text-dojo-success">完了</span>
          ) : completedLessons > 0 ? (
            <span className="text-xs font-medium text-dojo-vermillion">続きから始める</span>
          ) : (
            <span className="text-xs font-medium text-dojo-text-muted group-hover:text-dojo-vermillion transition-colors">
              始める
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
