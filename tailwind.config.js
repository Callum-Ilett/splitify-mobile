const colors = require("./src/theme/colors");
const fontSize = require("./src/theme/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    fontSize,
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"]
      },
      colors
    },

  },
  plugins: [],
}