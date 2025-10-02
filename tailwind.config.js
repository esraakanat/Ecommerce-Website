/** @type {import('tailwindcss').Config} */
export default {
  content: [

    "./index.html",

    "./src/**/*.{js,jsx}", // make sure it includes JS and JSX files

  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      amiri: ['Amiri', 'sans-serif'],
      bitcount: ['Bitcount Grid Double Ink', 'sans-serif'],
      boldonse: ['Boldonse', 'sans-serif'],
     
      ruwudu: ['Ruwudu', 'sans-serif'],
    },
  },
  plugins: [],
}

