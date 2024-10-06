/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nav_bg: "#2196f3",
        nav_bg_selected: "#1e88e5",
      },
    },
  },
  plugins: [],
};
