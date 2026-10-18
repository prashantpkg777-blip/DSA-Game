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
        chaos: {
          lime: '#C6FF00',
          blue: '#304FFE',
          pink: '#FF2DAA',
          orange: '#FF5C00',
          yellow: '#FFF200',
          black: '#111111',
          paper: '#F5F0E8',
          lavender: '#B9A0FF',
          darkgray: '#1e1e1e',
          midgray: '#2c2c2c',
        },
        brand: {
          electric: '#304FFE',
          royal: '#8B00FF',
          pink: '#FF2DAA',
          teal: '#C6FF00',
          deep: '#111111',
          lime: '#C6FF00',
          blue: '#304FFE',
          orange: '#FF5C00',
          yellow: '#FFF200',
          paper: '#F5F0E8',
        }
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Space Grotesk"', 'sans-serif'],
        heading: ['"Space Grotesk"', '"Archivo Black"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'brutal': '3px 3px 0px #111111',
        'brutal-md': '5px 5px 0px #111111',
        'brutal-lg': '8px 8px 0px #111111',
        'brutal-xl': '12px 12px 0px #111111',
        'brutal-lime': '5px 5px 0px #C6FF00',
        'brutal-pink': '5px 5px 0px #FF2DAA',
        'brutal-blue': '5px 5px 0px #304FFE',
        'brutal-yellow': '5px 5px 0px #FFF200',
        'brutal-white': '5px 5px 0px #F5F0E8',
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'marquee-reverse': 'marquee-reverse 22s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        }
      }
    },
  },
  plugins: [],
}
