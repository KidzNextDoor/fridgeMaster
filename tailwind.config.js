/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  theme: {
    extend: {
      input: {
        '-webkit-autofill': {
          '-webkit-background-clip': 'text',
        },
      },
    },
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}