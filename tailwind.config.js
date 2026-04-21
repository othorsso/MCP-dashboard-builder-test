/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warehouse': {
          'dark': '#111827',
          'darker': '#0f172a',
          'panel': '#1a1a1a',
          'border': '#2e303a',
        }
      }
    },
  },
  plugins: [],
}
