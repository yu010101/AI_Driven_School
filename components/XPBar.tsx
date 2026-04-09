"use client";

import { useEffect, useState } from "react";
import { getTotalXP, MAX_XP } from "@/lib/progress";

interface XPBarProps {
  refreshKey?: number;
}

export default function XPBar({ refreshKey }: XPBarProps) {
  const [xp, setXp] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const newXp = getTotalXP();
    if (newXp > xp && xp > 0) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }
    setXp(newXp);
  }, [refreshKey]);

  const pct = Math.min((xp / MAX_XP) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: "#0A0A0A",
          }}
        />
      </div>
      <span className={`text-xs font-mono font-bold transition-all ${animating ? "text-[#0A0A0A] scale-110" : "text-dojo-text-muted"}`}>
        {xp} XP
      </span>
    </div>
  );
}
