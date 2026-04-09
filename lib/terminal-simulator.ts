export interface ValidationResult {
  isCorrect: boolean;
  output: string;
  hint?: string;
}

function normalizeCommand(cmd: string): string {
  return cmd.trim().replace(/\s+/g, " ").replace(/[""]/g, '"');
}

export function validateCommand(
  input: string,
  expectedCommand: string,
  acceptableCommands: string[] | undefined,
  simulatedOutput: string,
  hint: string
): ValidationResult {
  const normalized = normalizeCommand(input);
  const expected = normalizeCommand(expectedCommand);

  // Check exact match or acceptable alternatives
  const allAcceptable = [expected, ...(acceptableCommands ?? []).map(normalizeCommand)];

  if (allAcceptable.some((cmd) => normalized === cmd)) {
    return { isCorrect: true, output: simulatedOutput };
  }

  // Common system commands - provide helpful responses
  if (normalized === "ls") {
    return {
      isCorrect: false,
      output: "Documents  Downloads  Desktop  projects",
    };
  }
  if (normalized === "pwd") {
    return { isCorrect: false, output: "/Users/you" };
  }
  if (normalized === "clear") {
    return { isCorrect: false, output: "__CLEAR__" };
  }
  if (normalized === "help" || normalized === "claude --help") {
    return {
      isCorrect: false,
      output:
        "Claude Code - AIペアプログラミングツール\n\n使い方: claude [options] [prompt]\n\nスライドの指示に従ってコマンドを入力してください。",
    };
  }

  // Partial match hints
  if (normalized.startsWith("claude") && expected.startsWith("claude")) {
    return {
      isCorrect: false,
      output: `zsh: command not recognized as expected\n\n💡 ヒント: ${hint}`,
    };
  }

  return {
    isCorrect: false,
    output: `zsh: command not found: ${normalized.split(" ")[0]}\n\n💡 ヒント: ${hint}`,
  };
}
