/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'recappt-light-gray': '#c8dfdf',
        'recappt-gray': '#437272',
        'recappt-dark-gray': '#2f4f4f',
        'recappt-white': '#f5f5f5',
      },
      fontFamily: {
        header: ['"Amatic SC"', 'cursive'],
        body: ['Raleway', 'sans-serif']
      },
      scale: {
        '-flip': '-1'
      },
      backgroundImage: (theme) => ({
        'gradient-recappt-white': 'linear-gradient(to bottom right, #f5f5f5, #c8dfdf, #c8dfdf, #c8dfdf, #99c4c4)',
        'gradient-recappt-gray': 'linear-gradient(to bottom right, #5fa0a0, #437272)',
        'gradient-recappt-dark-gray': 'linear-gradient(to bottom right, #396060, #2f4f4f)',
        'gradient-recappt-dark-gray-to-transparent': 'linear-gradient(to bottom, rgba(47, 79, 79, 1), rgba(47, 79, 79, 1), rgba(47, 79, 79, 1), rgba(47, 79, 79, 1), rgba(0,0,0,0) 100%)'
      }),
    },
  },
  plugins: [],
}
