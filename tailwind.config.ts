import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          hero: '#F4F6FA',
          card: '#F3F4F6',
          white: '#FFFFFF',
          dark: '#0D0D0D',
        },
        text: {
          primary: '#0A0A0A',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          inverse: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#C8920A',
          light: '#F5C842',
          pale: '#FEF3C7',
          hover: '#B07D08',
        },
        border: {
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB',
        },
      },
      fontFamily: {
        serif: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        syne: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
