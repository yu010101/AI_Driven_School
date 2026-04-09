"use client";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available — silently skip
  }
}

export function playSuccess() {
  // Happy ascending two-note chime
  playTone(523, 0.15, "sine", 0.12); // C5
  setTimeout(() => playTone(659, 0.2, "sine", 0.12), 100); // E5
  setTimeout(() => playTone(784, 0.3, "sine", 0.1), 200); // G5
}

export function playLevelUp() {
  // Triumphant ascending arpeggio
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.25, "sine", 0.1), i * 120);
  });
}

export function playClick() {
  playTone(800, 0.05, "square", 0.05);
}
