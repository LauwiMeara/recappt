/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "recappt-gray": "#778899",
        "recappt-dark-gray": "#2f4f4f",
        "recappt-white": "#f5f5f5"
      },
      fontFamily: {
        header: ['"Amatic SC"', "cursive"],
        body: ["Raleway", "sans-serif"]
      },
      scale: {
        "-flip": "-1"
      },
      backgroundImage: (theme) => ({
        "gradient-recappt-white": "linear-gradient(to bottom right, #f5f5f5, #f1f5f9, #cbd5e1)",
        "gradient-amber-100": "linear-gradient(to bottom right, #fffbeb, #fef3c7)",
        "gradient-amber-300": "linear-gradient(to bottom right, #fde68a, #fcd34d)",
        "gradient-recappt-gray-to-transparent":
          "linear-gradient(to bottom, rgba(119,136,153, 1), rgba(119,136,153, 1), rgba(119,136,153, 1), rgba(119,136,153, 1), rgba(0,0,0,0) 100%)"
      })
    }
  },
  plugins: []
};
