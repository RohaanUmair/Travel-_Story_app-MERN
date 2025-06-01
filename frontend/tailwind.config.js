/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#05b6d3',
        secondary: '#ef863e'
      }
    },
  },
  plugins: [],
}

