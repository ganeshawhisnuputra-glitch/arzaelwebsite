import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canonical Campaign Palette
        petrol: {
          950: '#041D1E', // Deep blue-black void
          900: '#072C2E', // Deep ambient background
          850: '#0A3B3E', // Elevated panel / subtle depth
          800: '#0D5659', // Signature Campaign Petrol Teal
          700: '#116C70', // Interactive teal highlight
          600: '#168A8F', // Medium teal
          500: '#1FA6AC', // Vibrant teal accent
          400: '#38C2C8', // Glow teal
        },
        flesh: {
          950: '#1F0F11', // Deep bruised shadow
          900: '#381A1C', // Subdued flesh background
          800: '#5C2B2F', // Muted flesh border
          700: '#8A3E44', // Dark flesh coral
          500: '#D9878D', // Signature Muted Flesh Pink Accent
          400: '#E8A5A9', // Tender highlight
          300: '#F2C2C5', // Pale exposed flesh
          200: '#F9DFE1', // Soft tender wash
        },
        beige: {
          50: '#FAF6EE',
          100: '#F3EBD7', // Signature Dirty Warm Beige / Aged Paper
          200: '#E8DCBF',
          300: '#DACBA3',
          400: '#C5B383',
          500: '#A9945F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Knewave', 'cursive'],
      },
      letterSpacing: {
        'widest-artist': '0.25em',
        'subtle-expand': '0.12em',
        'editorial': '0.04em',
      },
      animation: {
        'ouroboros-spin': 'ouroboros 24s linear infinite',
        'pulse-subtle': 'pulseSlow 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ambient-drift': 'ambientDrift 20s ease-in-out infinite alternate',
      },
      keyframes: {
        ouroboros: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ambientDrift: {
          '0%': { transform: 'scale(1.02) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.06) translate(-8px, -5px)' },
          '100%': { transform: 'scale(1.02) translate(6px, 3px)' },
        },
      }
    },
  },
  plugins: [],
} satisfies Config
