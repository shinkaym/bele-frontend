/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    screens: {
      sm: '480px', // Regular Mobile (Small - S)
      md: '768px', // Tablet Portrait (Medium - M)
      lg: '1024px', // Laptop/Desktop nhỏ
      xl: '1280px' // Desktop lớn
    },
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
          primary: '#2335B8',
          'primary-light': '#4C5FE6'
        },
        gray: {
          primary: '#E3E3E3',
          text: '#c4c4c4'
        },
        underline: '#231f20'
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
        '3xs': '0.5rem', // 8px
        '4xs': '0.375rem', // 6px
        '5xs': '0.25rem', // 4px
        '6xs': '0.125rem' // 2px
      },
      inset: {
        0.75: '0.1875rem' // 12px
      },
      width: {
        7.5: '1.875rem', // 30px
        8.5: '2.125rem' // 34px
      },
      height: {
        3.5: '0.875rem', // 14px
        4.5: '1.125rem' // 18px
      }
    }
  },
  safelist: [
    'bg-blue-primary',
    'blue-primary-light',
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
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')]
}
