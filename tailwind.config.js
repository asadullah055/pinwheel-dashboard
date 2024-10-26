/** @type {import('tailwindcss').Config} */
// ---style.css---


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "raleway":["Raleway", "sans-serif"]
      },
  },
},
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui'),],
}

