/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",  // ← Important for .dark to work
  theme: {
    extend: {},
  },
  plugins: [],
}