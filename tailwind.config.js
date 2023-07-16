/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'skyblue': '#E3F7FF',
        'turquoise': '#1ABCFE'
      },
      textColor: {        
        'turquoise': '#1ABCFE'
      },
      borderColor: {
        'strong-skyblue': '#9AD6F0',
        'skyblue': '#E3F7FF',
        'turquoise': '#1ABCFE'
      }
    },
  },
  plugins: []
}

