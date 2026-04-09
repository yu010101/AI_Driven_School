import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        foreground: 'var(--foreground)',
        'foreground-muted': 'var(--foreground-muted)',
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        border: 'var(--border)',
        surface: 'var(--surface)',
        dojo: {
          ink: 'var(--dojo-ink)',
          vermillion: 'var(--dojo-vermillion)',
          'vermillion-dark': 'var(--dojo-vermillion-dark)',
          'vermillion-light': 'var(--dojo-vermillion-light)',
          surface: 'var(--dojo-surface)',
          'surface-warm': 'var(--dojo-surface-warm)',
          text: 'var(--dojo-text)',
          'text-muted': 'var(--dojo-text-muted)',
          'terminal-bg': 'var(--dojo-terminal-bg)',
          'terminal-fg': 'var(--dojo-terminal-fg)',
          success: 'var(--dojo-success)',
          hint: 'var(--dojo-hint)',
          border: 'var(--dojo-border)',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
