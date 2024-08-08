/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        typing: {
          "0%": { width: "0%", visibility: "hidden" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        fade: "fade 1s ease-in-out 1",
        typing: "typing 2s linear 1",
      },
    },
  },
  plugins: [],
};
