/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        FFThin: ["Thin"],
        FFLight: ["Light"],
        FFRegular: ["Regular"],
        FFMedium: ["Medium"],
        FFSemibold: ["SemiBold"],
        FFBold: ["Bold"],
        FFExtrabold: ["ExtraBold"],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        heading: "var(--color-heading)",
        body: "var(--color-body)",
        line: "var(--color-line)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
      },
    },
  },
  plugins: [],
};
