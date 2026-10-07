/* ==========================================================================
   FILE: tailwind.config.js — Content paths, breakpoints, font families
   ========================================================================== */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: [
          '"Söhne Mono"',
          "Soehne Mono",
          "ui-monospace",
          "monospace",
          "ui-sans-serif",
          "sans-serif",
        ],
        mono: [
          '"Söhne Mono"',
          "Soehne Mono",
          "ui-monospace",
          "monospace",
        ],
        pixel: ['"Ark Pixel"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
