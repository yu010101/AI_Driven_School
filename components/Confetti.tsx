"use client";

import { useEffect, useState } from "react";

const COLORS = ["#0A0A0A", "#525252", "#94A3B8", "#D4D4D8", "#A1A1AA", "#71717A"];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  size: number;
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const ps: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      ps.push({
        id: i,
        x: 20 + Math.random() * 60, // 20-80% horizontal spread
        y: 60 + Math.random() * 30, // start from bottom area
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        size: 4 + Math.random() * 6,
      });
    }
    setParticles(ps);
  }, []);

  return (
    <div className="dojo-confetti-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="dojo-confetti-particle"
          style={{
            left: `${p.x}%`,
            bottom: `${p.y}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
