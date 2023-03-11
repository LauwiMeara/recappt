/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'recappt-gray': '#778899',
        'recappt-dark-gray': '#2f4f4f',
        'recappt-white': '#f5f5f5',
      },
      fontFamily: {
        header: ['"Amatic SC"', 'cursive'],
        body: ['Raleway', 'sans-serif']
      },
      scale: {
        '-flip': '-1'
      }
    },
  },
  plugins: [],
}
