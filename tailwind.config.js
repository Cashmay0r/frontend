module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6E8573',
        secondary: '#EBF2E8',
        'gray-text': '#62625E',
      },
    },
  },
  plugins: [require('daisyui')],
};
