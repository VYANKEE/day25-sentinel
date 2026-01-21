/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0a0a0a',
        'brand-gray': '#171717',
        'brand-accent': '#3b82f6', // Professional Blue
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'], // Developer aesthetic
      }
    },
  },
  plugins: [],
}