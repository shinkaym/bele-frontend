/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    screens: {
      sm: '480px', // Regular Mobile (Small - S)
      md: '768px', // Tablet Portrait (Medium - M)
      lg: '1024px', // Laptop/Desktop nhỏ
      xl: '1280px', // Desktop lớn
      '2xl': '1536px' // Desktop siu lớn
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
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
        hover: '#444',
        active: '#333',
        bgSearch: '#E8E8E8',
        gray: '#3c3c3c',
        blue: {
          primary: '#2335B8',
          'primary-light': '#4C5FE6'
        },
        gray: {
          primary: '#E3E3E3',
          text: '#c4c4c4',
          bg: '#525252'
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
        0.5: '0.125rem',
        3.5: '0.875rem', // 14px
        4.5: '1.125rem', // 18px
        18: '4.5rem' // 72px
      },
      spacing: {
        21: '5.25rem', // 84px
        22: '5.5rem', // 22 = 5.5rem
        23: '5.75rem', // 23 = 5.75rem
        25: '6.25rem', // 100px
        26: '6.5rem', // 104px
        27: '6.75rem', // 108px
        '1/5': '20%'
      },
      animation: {
        'spin-once': 'spin 1s linear alternate',
        'rotate-90': 'rotate-90 0.5s ease-in-out forwards' // Tên animation
      },
      keyframes: {
        'rotate-90': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(90deg)' }
        }
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
    'grid-cols-4',
    'grid-cols-3'
  ],
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')]
}
