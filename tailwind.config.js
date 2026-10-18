/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glass: {
          surface: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.2)',
          highlight: 'rgba(255, 255, 255, 0.35)',
          bg: 'rgba(255, 255, 255, 0.08)',
          'bg-hover': 'rgba(255, 255, 255, 0.16)',
          panel: 'rgba(8, 11, 24, 0.75)',
        },
        brand: {
          electric: '#0080FF',
          royal: '#8B00FF',
          pink: '#FF1493',
          teal: '#20B2AA',
          deep: '#080B18',
          blue: '#0080FF',
          violet: '#8B00FF',
          cyan: '#20B2AA',
          magenta: '#FF1493',
          navy: '#080B18',
          emerald: '#10B981',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'glass-hover': '0 16px 48px 0 rgba(0, 0, 0, 0.35), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)',
        'glass-electric': '0 0 30px -4px rgba(0, 128, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-royal': '0 0 30px -4px rgba(139, 0, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-pink': '0 0 30px -4px rgba(255, 20, 147, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-teal': '0 0 30px -4px rgba(32, 178, 170, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-cyan': '0 0 25px -4px rgba(32, 178, 170, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-violet': '0 0 25px -4px rgba(139, 0, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-amber': '0 0 25px -4px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '15px',
        'glass-heavy': '28px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'float-slow': 'float 12s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'float-reverse': 'float-reverse 16s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'ambient-pulse': 'ambientPulse 8s ease-in-out infinite',
        'fade-up': 'fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scaleIn 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'shimmer': 'shimmer 2.5s infinite linear',
        'light-sweep': 'lightSweep 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(20px, -24px, 0) scale(1.06)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-24px, 20px, 0) scale(0.95)' },
        },
        ambientPulse: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.08)' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          'to': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        lightSweep: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '20%, 100%': { transform: 'translateX(200%) rotate(45deg)' },
        }
      }
    },
  },
  plugins: [],
}
