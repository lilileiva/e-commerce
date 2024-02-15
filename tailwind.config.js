/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {    
    extend: {
      backgroundColor: {
        'skyblue': '#edf9ff',
        'turquoise': '#1ABCFE'
      },
      textColor: {
        'turquoise': '#1ABCFE'
      },
      borderColor: {
        'strong-skyblue': '#9AD6F0',
        'skyblue': '#edf9ff',
        'turquoise': '#1ABCFE'
      },
      screens: {
        '2sm': '5px',
      },   
      keyframes: {
        cardFlip: {
          '0%': {transform: 'rotateY(-180deg)'},
          '100%': {transform: 'rotateY(0deg)'}          
        }
      },
      animation: {
        cardFlip: 'cardFlip 0.2s ease-out',
        pulseFast: 'pulse 1s linear infinite',
      }
    },
    plugins: []
  }
}
