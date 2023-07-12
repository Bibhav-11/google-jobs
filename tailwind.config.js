/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      "Roboto": ["Roboto", "ui-sans-serif"],
      "Poppins": ["Poppins", "ui-sans-serif"]
    },
    extend: {
      colors: {
        "backgroundColor": "#F6F7FB",
        "dark": "#282538",
        "light": "#B9BDCF",
        "skyblue": "#1E86FF",
        "primary": "#334680",
        

      },
      backgroundImage: {
        "background": "url('assets/images/backgroundImg.png')",
      },
      boxShadow: {
        "default": "0px 2px 8px rgba(0, 0, 0, 0.1)"
      }
    },
    
  },
  plugins: [],
}