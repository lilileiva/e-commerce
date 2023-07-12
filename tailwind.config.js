/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'skyblue': '#1ABCFE'
      },
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

