"use client";

interface MascotProps {
  mood?: "neutral" | "happy" | "thinking";
  size?: number;
  className?: string;
}

export default function Mascot({ mood = "neutral", size = 64, className = "" }: MascotProps) {
  const eyeY = mood === "happy" ? 18 : 16;
  const mouthD = mood === "happy"
    ? "M14 22 Q18 27 22 22"  // smile
    : mood === "thinking"
    ? "M15 23 L21 23"         // flat
    : "M14 23 Q18 25 22 23"; // slight smile

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body - terminal shape */}
      <rect x="4" y="4" width="28" height="22" rx="6" fill="#1a1b26" />
      <rect x="4" y="4" width="28" height="22" rx="6" stroke="#2a2b3d" strokeWidth="1" />

      {/* Screen glow */}
      <rect x="6" y="6" width="24" height="18" rx="4" fill="#1a1b26" />

      {/* Terminal dots */}
      <circle cx="10" cy="9" r="1.2" fill="#ff5f57" />
      <circle cx="14" cy="9" r="1.2" fill="#febc2e" />
      <circle cx="18" cy="9" r="1.2" fill="#28c840" />

      {/* Eyes */}
      <circle cx="13" cy={eyeY} r="2" fill="#7aa2f7" />
      <circle cx="23" cy={eyeY} r="2" fill="#7aa2f7" />

      {/* Eye shine */}
      <circle cx="14" cy={eyeY - 0.5} r="0.7" fill="white" />
      <circle cx="24" cy={eyeY - 0.5} r="0.7" fill="white" />

      {/* Mouth */}
      <path d={mouthD} stroke="#9ece6a" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Antenna */}
      <line x1="18" y1="4" x2="18" y2="1" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="0.5" r="1.5" fill="#0A0A0A" />

      {/* Legs */}
      <rect x="11" y="26" width="4" height="4" rx="2" fill="#2a2b3d" />
      <rect x="21" y="26" width="4" height="4" rx="2" fill="#2a2b3d" />

      {/* Keyboard base */}
      <rect x="8" y="30" width="20" height="3" rx="1.5" fill="#1a1a2e" />
      <rect x="10" y="31" width="3" height="1" rx="0.5" fill="#2a2b3d" />
      <rect x="14" y="31" width="3" height="1" rx="0.5" fill="#2a2b3d" />
      <rect x="18" y="31" width="6" height="1" rx="0.5" fill="#2a2b3d" />

      {/* Thinking bubbles */}
      {mood === "thinking" && (
        <>
          <circle cx="30" cy="8" r="1" fill="#565f89" opacity="0.6" />
          <circle cx="32" cy="5" r="1.5" fill="#565f89" opacity="0.4" />
          <circle cx="34" cy="2" r="2" fill="#565f89" opacity="0.3" />
        </>
      )}
    </svg>
  );
}
