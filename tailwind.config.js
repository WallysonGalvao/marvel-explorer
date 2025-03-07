/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        marvel: {
          red: "#ED1D24",
          dark: "#202020",
          light: "#F5F5F5",
        },
        primary: "#ED1D24",
        background: "#FFFFFF",
        card: "#F5F5F5",
        text: "#202020",
        border: "#E5E5E5",
        notification: "#ED1D24",
      },
    },
  },
  plugins: [],
};
