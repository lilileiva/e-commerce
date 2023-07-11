/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      textColor: {
        'skyblue': '#1ABCFE'
      },
      borderColor: {
        'skyblue': '#1ABCFE'
      }
    },
  },
  plugins: []
}

