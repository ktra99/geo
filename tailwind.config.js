/** @type {import('tailwindcss').Config} */

const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '300px',
      ...screens,
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
