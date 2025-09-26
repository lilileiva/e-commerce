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
        'turquoise': '#66bfe2ff'
      },
      textColor: {
        'turquoise': '#66bfe2ff'
      },
      borderColor: {
        'strong-skyblue': '#66bfe2ff',
        'skyblue': '#edf9ff',
        'turquoise': '#66bfe2ff'
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
