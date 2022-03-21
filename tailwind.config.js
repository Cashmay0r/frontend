module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2b6777',

        secondary: '#c8d8e4',

        accent: '#52ab98',

        neutral: '#f2f2f2',
      },
      keyframes: {
        slideIn: {
          '0%': {
            transform: 'translateY(+25%)',
            opacity: '0%',
          },
          '100%': {
            transform: 'translateY(0%)',
            opacity: '100%',
          },
        },
      },
      animation: {
        'slide-in-bottom': 'slideIn ease-in-out 300ms',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#2b6777',

          secondary: '#c8d8e4',

          accent: '#52ab98',

          neutral: '#f2f2f2',

          'base-100': '#ffffff',

          info: '#6895D4',

          success: '#34D58D',

          warning: '#EEA33A',

          error: '#E14C62',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
