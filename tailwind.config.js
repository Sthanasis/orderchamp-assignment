const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    colors: {
      bordergrey: colors.gray[200],
      textgreay: colors.gray[500],
    },
  },
  plugins: [],
};
