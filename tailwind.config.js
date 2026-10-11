/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        love: {
          50: '#fff0f5',
          100: '#ffe4e1',
          200: '#fbcfe8',
          300: '#f472b6',
          400: '#e8998d',
          500: '#ec4899',
          600: '#db2777',
          700: '#c06c84',
          800: '#9f1239',
          900: '#881337',
        },
        lavender: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        apricot: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
        },
        mint: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
        },
        sunset: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c084fc',
        },
        cream: {
          50: '#fffdf9',
          100: '#faf0e6',
          200: '#f5e6d3',
          300: '#e8d4be',
        },
        roseGold: {
          light: '#f7d6c8',
          DEFAULT: '#b76e79',
          dark: '#8b4a53',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        script: ['Dancing Script', 'cursive'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatMedium 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
        'sparkle-rotate': 'sparkleRotate 8s linear infinite',
        'wiggle': 'wiggle 0.6s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.03)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(236, 72, 153, 0.4), 0 0 30px rgba(236, 72, 153, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(236, 72, 153, 0.8), 0 0 50px rgba(236, 72, 153, 0.4)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        sparkleRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      boxShadow: {
        'polaroid': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(232, 153, 141, 0.15)',
        'romantic': '0 20px 40px -15px rgba(192, 108, 132, 0.25)',
        'glow-pink': '0 0 25px rgba(236, 72, 153, 0.5)',
      }
    },
  },
  plugins: [],
}
