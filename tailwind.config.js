/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#A4D72A',
        'brand-yellow': '#FFF9E1',
        'brand-red': '#E53E3E',
        'text-primary': '#2D3748',
        'background-main': '#FFFFFF',
        'background-secondary': '#F9F9F9',
      },
    },
  },
  plugins: [],
} 