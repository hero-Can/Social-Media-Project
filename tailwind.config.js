/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    fontFamily : {
      primary : 'Agbalumo',
      secondary : 'Roboto',
    },
    container: {
      // padding : {
      //   DEFAULT : '15px',
      // },
    },
    screens : {
      sm : '640px',
      md : '798px',
      lg : '960px',
      xl : '1200px'
    },
    extend: {},
  },
  plugins: [],
}

