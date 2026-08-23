import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        petrol: {
          950: '#030c0e', // Primary deepest black/teal void
          900: '#06171b', // Deep elevated surface
          850: '#0a2228', // Elevated card / border subtle
          800: '#0f2f37', // Hover state / container border
          700: '#144652', // Interactive subtle
          600: '#155d6e', // Deep petrol mid
          500: '#147287', // Primary signature petrol teal
          400: '#1fb4d4', // Bright teal accent / glow
          300: '#67d5eb', // Soft teal highlight
          200: '#b2edfa', // Pale teal flash
        },
        flesh: {
          950: '#1e0c0b', // Deep bruised shadow
          900: '#2d1413', // Subdued flesh background
          800: '#48201e', // Muted flesh border
          700: '#692f2b', // Flesh lowlight
          600: '#9b4843', // Deep flesh coral
          500: '#d97e78', // Primary signature flesh pink / dirty coral
          400: '#f09f9a', // Tender flesh highlight
          300: '#fabeb9', // Pale exposed flesh
          200: '#fde0dd', // Soft tender wash
        },
        void: {
          black: '#020708',
          card: 'rgba(6, 23, 27, 0.75)',
          overlay: 'rgba(2, 7, 8, 0.85)',
          border: 'rgba(20, 114, 135, 0.18)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        'widest-artist': '0.3em',
        'subtle-expand': '0.15em',
      },
      animation: {
        'ouroboros-spin': 'ouroboros 24s linear infinite',
        'pulse-subtle': 'pulseSlow 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        ouroboros: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config
