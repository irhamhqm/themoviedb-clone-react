/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs3': '320px',
      'xs2': '375px',
      'xs': '425px',
      ...defaultTheme.screens
    },
    extend: {
      minHeight: {
        'container': 'calc(100vh - 5rem)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
