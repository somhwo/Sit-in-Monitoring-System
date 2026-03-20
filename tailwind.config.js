/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#2E236C',
          light:   '#433D8B',
          dark:    '#1B1A55',
        },
        teal: {
          brand:  '#3a9cbf',
          light:  '#5bbdd6',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
      keyframes: {
        cardIn: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        floatIcon: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        boxIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideOutPanel: {
          to: { transform: 'translateX(160%)' },
        },
      },
      animation: {
        'card-in':    'cardIn 0.45s cubic-bezier(.22,.8,.45,1) both',
        'float-icon': 'floatIcon 3s ease-in-out infinite',
        'box-in':     'boxIn 0.5s cubic-bezier(.22,.8,.45,1) both',
      },
    },
  },
  plugins: [],
};
