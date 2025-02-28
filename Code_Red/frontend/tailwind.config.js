/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust paths as needed
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],  // Set Poppins as the default sans-serif font
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {

    themes: ["dark"],

  },
};
