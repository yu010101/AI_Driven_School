"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { validateCommand } from "@/lib/terminal-simulator";

interface TerminalProps {
  expectedCommand: string;
  acceptableCommands?: string[];
  simulatedOutput: string;
  hint: string;
  onSuccess: () => void;
  disabled?: boolean;
}

const PROMPT = "\x1b[38;5;75myou@mac\x1b[0m:\x1b[38;5;78m~\x1b[0m$ ";

const PROGRESSIVE_HINTS = [
  () => `\x1b[38;5;208m  もう少し！スライドのコマンドを確認してみてください\x1b[0m`,
  (hint: string) => `\x1b[38;5;208m  ヒント: ${hint}\x1b[0m`,
  (hint: string) => `\x1b[38;5;208m  ヒント: ${hint}\n\x1b[38;5;245m  ※ 下の「答えを見る」ボタンも使えます\x1b[0m`,
];

export default function Terminal({
  expectedCommand,
  acceptableCommands,
  simulatedOutput,
  hint,
  onSuccess,
  disabled,
}: TerminalProps) {
  const termRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const inputRef = useRef("");
  const attemptRef = useRef(0);
  const completedRef = useRef(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Keep refs in sync with props so the onData handler always sees latest values
  const propsRef = useRef({ expectedCommand, acceptableCommands, simulatedOutput, hint, onSuccess, disabled });
  propsRef.current = { expectedCommand, acceptableCommands, simulatedOutput, hint, onSuccess, disabled };

  const typeOutput = useCallback(
    async (term: XTerminal, text: string) => {
      const lines = text.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (i > 0) term.write("\r\n");
        for (const char of lines[i]) {
          term.write(char);
          await new Promise((r) => setTimeout(r, 8 + Math.random() * 12));
        }
      }
    },
    []
  );

  const handleRevealAnswer = useCallback(() => {
    const term = xtermRef.current;
    if (!term || completedRef.current) return;

    const cmd = propsRef.current.expectedCommand;
    term.write("\r\n");
    term.write(PROMPT);
    const chars = cmd.split("");
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < chars.length) {
        term.write(chars[i]);
        i++;
      } else {
        clearInterval(typeInterval);
        term.writeln("");
        term.writeln(
          "\x1b[38;5;245m  ↑ このコマンドをコピーして Enter で実行してください\x1b[0m"
        );
        term.write(PROMPT);
        inputRef.current = "";
      }
    }, 30);
  }, []);

  // Initialize terminal ONCE — never re-run
  useEffect(() => {
    if (!termRef.current || xtermRef.current) return;

    const term = new XTerminal({
      theme: {
        background: "#1a1b26",
        foreground: "#a9b1d6",
        cursor: "#c0caf5",
        cursorAccent: "#1a1b26",
        selectionBackground: "#33467c",
        black: "#15161e",
        red: "#f7768e",
        green: "#9ece6a",
        yellow: "#e0af68",
        blue: "#7aa2f7",
        magenta: "#bb9af7",
        cyan: "#7dcfff",
        white: "#a9b1d6",
      },
      fontSize: 14,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      cursorBlink: true,
      cursorStyle: "block",
      scrollback: 1000,
      convertEol: true,
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(termRef.current);

    xtermRef.current = term;
    fitRef.current = fit;

    const initialFit = () => {
      fit.fit();
      term.writeln("\x1b[38;5;167m  AI道場 — インタラクティブターミナル\x1b[0m");
      term.writeln("\x1b[38;5;245m  スライドの指示に従ってコマンドを入力してください\x1b[0m");
      term.writeln("");
      term.write(PROMPT);
    };
    requestAnimationFrame(() => requestAnimationFrame(initialFit));

    term.onData((data) => {
      const props = propsRef.current;
      if (props.disabled || completedRef.current) return;

      if (data === "\r") {
        const cmd = inputRef.current;
        inputRef.current = "";
        term.write("\r\n");

        if (cmd.trim() === "") {
          term.write(PROMPT);
          return;
        }

        const result = validateCommand(
          cmd,
          props.expectedCommand,
          props.acceptableCommands,
          props.simulatedOutput,
          props.hint
        );

        if (result.output === "__CLEAR__") {
          term.clear();
          term.write(PROMPT);
          return;
        }

        if (result.isCorrect) {
          typeOutput(term, result.output).then(() => {
            term.write("\r\n");
            term.writeln("");
            term.writeln(
              "\x1b[38;5;71m  ✓ 正解！次のステップに進みましょう\x1b[0m"
            );
            completedRef.current = true;
            setTimeout(() => propsRef.current.onSuccess(), 1200);
          });
        } else {
          const attempt = attemptRef.current;
          const hintFn = PROGRESSIVE_HINTS[Math.min(attempt, PROGRESSIVE_HINTS.length - 1)];
          const hintMsg = hintFn(props.hint);

          typeOutput(term, result.output).then(() => {
            term.write("\r\n");
            term.writeln(hintMsg);
            term.writeln("");
            term.write(PROMPT);
          });

          attemptRef.current = attempt + 1;
          if (attempt >= 2) {
            setShowAnswer(true);
          }
        }
      } else if (data === "\x7f") {
        if (inputRef.current.length > 0) {
          inputRef.current = inputRef.current.slice(0, -1);
          term.write("\b \b");
        }
      } else if (data >= " ") {
        inputRef.current += data;
        term.write(data);
      }
    });

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => fit.fit());
    });
    ro.observe(termRef.current);

    return () => {
      ro.disconnect();
      term.dispose();
      xtermRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initialize once only — props accessed via propsRef

  return (
    <div className="dojo-terminal h-full flex flex-col bg-dojo-terminal-bg rounded-xl overflow-hidden">
      <div className="dojo-terminal-header">
        <div className="flex gap-1.5">
          <div className="dojo-terminal-dot bg-[#ff5f57]" />
          <div className="dojo-terminal-dot bg-[#febc2e]" />
          <div className="dojo-terminal-dot bg-[#28c840]" />
        </div>
        <span className="text-xs text-[#565f89] font-mono ml-2">Terminal</span>
        {showAnswer && !completedRef.current && (
          <button
            onClick={handleRevealAnswer}
            className="ml-auto text-xs px-3 py-1 rounded-md bg-[#2a2b3d] text-[#a9b1d6] hover:bg-[#33344d] transition-colors"
          >
            答えを見る
          </button>
        )}
      </div>
      <div className="flex-1 min-h-0 dojo-terminal-inner">
        <div ref={termRef} className="h-full" />
      </div>
    </div>
  );
}
