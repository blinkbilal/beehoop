import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        foreground: "hsl(var(--foreground))",
        border: {
          DEFAULT: "hsl(var(--border))",
          subtle: "hsl(var(--border-subtle))",
          strong: "hsl(var(--border-strong))"
        },
        input: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          card: "hsl(var(--background-card))",
          cream: "hsl(var(--background-cream))",
          white: "hsl(var(--background-white))",
          alt: "hsl(var(--background-alt))",
        },
        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          muted: "hsl(var(--text-muted))",
          inverse: "hsl(var(--text-inverse))",
          accent: "hsl(var(--accent))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          light: "hsl(var(--accent) / 0.8)",
          hover: "hsl(var(--accent) / 0.9)",
          pale: "hsl(var(--accent) / 0.15)",
          glow: "hsla(var(--accent) / 0.15)",
        },
        muted: {
          foreground: "hsl(var(--muted-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--background-alt))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--text-primary))",
        },
        card: {
          DEFAULT: "hsl(var(--background-card))",
          foreground: "hsl(var(--text-primary))",
        },
      },
      fontFamily: {
        serif: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        syne: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space)', 'monospace'],
      },
      fontSize: {
        'xs': ['13px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.6' }],
        'base': ['16px', { lineHeight: '1.7' }],
        'lg': ['18px', { lineHeight: '1.5' }],
        'xl': ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['30px', { lineHeight: '1.2' }],
        '4xl': ['36px', { lineHeight: '1.15' }],
        '5xl': ['42px', { lineHeight: '1.1' }],
        '6xl': ['56px', { lineHeight: '1.05' }],
        '7xl': ['72px', { lineHeight: '1.05' }],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      letterSpacing: {
        'heading': '-0.02em',
        'label': '0.15em',
      },
    },
  },
  plugins: [],
}

export default config
