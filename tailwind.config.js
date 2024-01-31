/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'custom': '0 0 5px rgba(255, 255, 255, 1)'
      }
    },
  },
  plugins: [],
}