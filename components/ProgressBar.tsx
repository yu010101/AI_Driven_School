interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="dojo-progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-dojo-text-muted whitespace-nowrap">
        {current}/{total}
      </span>
    </div>
  );
}
