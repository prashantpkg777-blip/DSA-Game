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
        game: {
          bg: '#080C16',
          panel: '#0E172A',
          card: '#131F37',
          hover: '#1E2D4E',
          border: '#1E2D4E',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
          neon: '#00F0FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.4)',
        'glow-violet': '0 0 20px -3px rgba(139, 92, 246, 0.4)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.4)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
