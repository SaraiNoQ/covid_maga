const colors = require('tailwindcss/colors')


module.exports = {
  mode:'jit',
  purge: ['./index.css', './src/**/*.{vue,js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#5865f2',
        gray: colors.trueGray,
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f'
        }
      }
    },
    fontFamily: {
      'go': ['Google Sans','Noto Sans Myanmar UI']
    }
  },
  variants: {},
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
