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
          bg: 'rgba(255, 255, 255, 0.07)',
          'bg-hover': 'rgba(255, 255, 255, 0.12)',
          'bg-active': 'rgba(255, 255, 255, 0.18)',
          panel: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(255, 255, 255, 0.18)',
          'border-highlight': 'rgba(255, 255, 255, 0.35)',
        },
        brand: {
          blue: '#4F7CFF',
          violet: '#8B5CF6',
          cyan: '#22D3EE',
          magenta: '#E879F9',
          pink: '#F43F5E',
          navy: '#070B18',
          deep: '#030712',
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
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        'glass-hover': '0 14px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 2px 0 rgba(255, 255, 255, 0.25)',
        'glass-cyan': '0 0 25px -4px rgba(34, 211, 238, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-violet': '0 0 25px -4px rgba(139, 92, 246, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-magenta': '0 0 25px -4px rgba(232, 121, 249, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-amber': '0 0 25px -4px rgba(245, 158, 11, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        'glass-heavy': '32px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(20px, -25px) scale(1.05)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-25px, 20px) scale(0.95)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
