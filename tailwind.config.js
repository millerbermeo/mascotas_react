/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      pastelBlue: '#AEC6CF',
      pastelPink: '#FFD1DC',
      navy: '#2C3E50',
    },},
  },
  plugins: [],
}