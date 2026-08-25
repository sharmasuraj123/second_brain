/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#14120f",
          bgAlt: "#1f1c17",
          surface: "#1c1a16",
          surfaceAlt: "#262319",
          border: "#38332a",
          borderHover: "#4a4335",
        },
        accent: {
          DEFAULT: "#d98e4e",
          hover: "#e6a466",
          dark: "#b8703a",
          muted: "#8f5a2e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
