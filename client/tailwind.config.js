/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem', // Padding x mặc định
          sm: '1rem', // Padding x cho breakpoint sm
          md: '1.5rem', // Padding x cho breakpoint md
          lg: '2rem', // Padding x cho breakpoint lg
          xl: '2.5rem', // Padding x cho breakpoint xl
          '2xl': '3rem' // Padding x cho breakpoint 2xl
        }
      },
      margin: {
        '-4': '-1rem',
        '-8': '-2rem',
        '-12': '-3rem'
      },
      colors: {
        // 'black': '#212121'
        gray: '#3c3c3c',
        blue: {
          primary: '#2335B8'
        },
        gray: {
          primary: '#E3E3E3'
        },
        underline: '#231f20'
      },
      
    }
  },
  safelist: [
    'bg-blue-primary',
    'border-black',
    'bg-white',
    'bg-black',
    'text-white',
    'text-black',
    'text-primary',
    'bg-secondary',
    'text-secondary',
    'hover:bg-opacity-90',
    'hover:bg-opacity-10'
  ],
  plugins: [
    require('tailwindcss-animate'),
  ]
}
