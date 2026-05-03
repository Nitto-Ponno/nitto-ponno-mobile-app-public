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
        foreground: "var(--color-foreground)",
        accent: "var(--color-accent)",
        heading: "var(--color-heading)",
        body: "var(--color-body)",
        line: "var(--color-line)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        info: "var(--color-info)",
      },
    },
  },
  plugins: [],
};
