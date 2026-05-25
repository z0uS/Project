/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn:    { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        fadeDown:  { "0%": { opacity: 0, transform: "translateY(-20px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeLeft:  { "0%": { opacity: 0, transform: "translateX(-30px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
        fadeRight: { "0%": { opacity: 0, transform: "translateX(30px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
      },
      animation: {
        fadeIn:    "fadeIn 0.6s ease both",
        fadeDown:  "fadeDown 0.6s ease both",
        fadeLeft:  "fadeLeft 0.6s ease both",
        fadeRight: "fadeRight 0.6s ease both",
      },
    },
  },
  plugins: [],
};
