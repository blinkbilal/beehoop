import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          hero: '#F4F6FA',
          card: '#F8F9FB',
          white: '#FFFFFF',
          dark: '#0D0D0D',
          navy: '#0A1628',
          cream: '#FFF9F0',
        },
        text: {
          primary: '#0A0A0A',
          secondary: '#4B5563',
          muted: '#9CA3AF',
          inverse: '#FFFFFF',
          accent: '#C8920A',
        },
        accent: {
          DEFAULT: '#C8920A',
          light: '#F5C842',
          pale: '#FEF3C7',
          hover: '#B07D08',
          glow: 'rgba(245, 200, 66, 0.15)',
        },
        border: {
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB',
          subtle: '#F3F4F6',
        },
      },
      fontFamily: {
        serif: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        syne: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space)', 'monospace'],
      },
      fontSize: {
        'xs': ['13px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.6' }],
        'base': ['16px', { lineHeight: '1.7' }],
        'md': ['20px', { lineHeight: '1.6' }],
        'lg': ['36px', { lineHeight: '1.1' }],
        'xl': ['42px', { lineHeight: '1.1' }],
        '2xl': ['56px', { lineHeight: '1.05' }],
        '3xl': ['72px', { lineHeight: '1.05' }],
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
