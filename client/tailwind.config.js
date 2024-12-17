/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
      colors: {
        // 'black': '#212121'
        'gray': '#3c3c3c'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
