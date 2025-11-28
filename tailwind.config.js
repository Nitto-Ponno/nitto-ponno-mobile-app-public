/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto-Thin", "Roboto-Regular", "Roboto-Light", "Roboto-Medium", "Roboto-SemiBold", "Roboto-Bold", "Roboto-ExtraBold"],
      },
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        canvas: "var(--color-canvas)",
        heading: "var(--color-heading)",
        body: "var(--color-body)",
        stroke: "var(--color-stroke)",
        outline: "var(--color-outline)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        info: "var(--color-info)",
      },
    },
  },
  plugins: [],
};
