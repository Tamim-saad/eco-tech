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
        primary: {
          50: '#e6f7f5',
          100: '#b3e9e0',
          200: '#80dccb',
          300: '#4dcfb6',
          400: '#1ac2a1',
          500: '#00b58c',
          600: '#009170',
          700: '#006d54',
          800: '#004938',
          900: '#00251c',
        },
        teal: {
          DEFAULT: '#06d6a0',
          light: '#88f2d6',
          dark: '#028a5e',
        },
        red: {
          DEFAULT: '#ef476f',
          light: '#ff6b8a',
          dark: '#d42855',
        },
        yellow: {
          DEFAULT: '#ffd166',
          light: '#ffe499',
          dark: '#f4b843',
        },
        blue: {
          DEFAULT: '#118ab2',
          light: '#47a8c7',
          dark: '#0a5f7d',
        },
        purple: {
          DEFAULT: '#7b2ff7',
          light: '#9d5eff',
          dark: '#5714c7',
        },
      },
    },
  },
  plugins: [],
}
export default config
