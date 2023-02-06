const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    colors: {
      bordergrey: colors.gray[200],
      textgrey: colors.gray[500],
      success: colors.green[700],
      ...colors,
    },
  },
  plugins: [],
};
