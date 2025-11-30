/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 4s infinite",
      },
    },
  },
  plugins: [],
};

