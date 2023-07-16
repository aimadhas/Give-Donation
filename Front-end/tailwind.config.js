/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        '400px': '400px',
        'sma': '350px',
        '600px':'600px',
        'mda': '700px',
        'lga': '900px',
        '1024px':'1024px'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('flowbite/plugin')
  ],
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
};

