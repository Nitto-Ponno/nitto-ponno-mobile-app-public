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

/*

:root {
  --background: #ffffff;
  --foreground: #111827;
  --card: #ffffff;
  --card-foreground: #111827;
  --popover: #ffffff;
  --popover-foreground: #111827;
  --primary: #d87943;
  --primary-foreground: #ffffff;
  --secondary: #527575;
  --secondary-foreground: #ffffff;
  --muted: #f3f4f6;
  --muted-foreground: #6b7280;
  --accent: #eeeeee;
  --accent-foreground: #111827;
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;
  --border: #e5e7eb;
  --input: #e5e7eb;
  --ring: #d87943;
  --chart-1: #5f8787;
  --chart-2: #e78a53;
  --chart-3: #fbcb97;
  --chart-4: #888888;
  --chart-5: #999999;
  --sidebar: #f3f4f6;
  --sidebar-foreground: #111827;
  --sidebar-primary: #d87943;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #ffffff;
  --sidebar-accent-foreground: #111827;
  --sidebar-border: #e5e7eb;
  --sidebar-ring: #d87943;
  --font-sans: Geist Mono, ui-monospace, monospace;
  --font-serif: serif;
  --font-mono: JetBrains Mono, monospace;
  --radius: 0.75rem;
  --shadow-2xs: 0px 1px 4px 0px hsl(0 0% 0% / 0.03);
  --shadow-xs: 0px 1px 4px 0px hsl(0 0% 0% / 0.03);
  --shadow-sm: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 1px 2px -1px hsl(0 0% 0% / 0.05);
  --shadow: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 1px 2px -1px hsl(0 0% 0% / 0.05);
  --shadow-md: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 2px 4px -1px hsl(0 0% 0% / 0.05);
  --shadow-lg: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 4px 6px -1px hsl(0 0% 0% / 0.05);
  --shadow-xl: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 8px 10px -1px hsl(0 0% 0% / 0.05);
  --shadow-2xl: 0px 1px 4px 0px hsl(0 0% 0% / 0.13);
  --tracking-normal: 0rem;
  --spacing: 0.25rem;
}

.dark {
  --background: #121113;
  --foreground: #c1c1c1;
  --card: #121212;
  --card-foreground: #c1c1c1;
  --popover: #121113;
  --popover-foreground: #c1c1c1;
  --primary: #e78a53;
  --primary-foreground: #121113;
  --secondary: #5f8787;
  --secondary-foreground: #121113;
  --muted: #222222;
  --muted-foreground: #888888;
  --accent: #333333;
  --accent-foreground: #c1c1c1;
  --destructive: #5f8787;
  --destructive-foreground: #121113;
  --border: #222222;
  --input: #222222;
  --ring: #e78a53;
  --chart-1: #5f8787;
  --chart-2: #e78a53;
  --chart-3: #fbcb97;
  --chart-4: #888888;
  --chart-5: #999999;
  --sidebar: #121212;
  --sidebar-foreground: #c1c1c1;
  --sidebar-primary: #e78a53;
  --sidebar-primary-foreground: #121113;
  --sidebar-accent: #333333;
  --sidebar-accent-foreground: #c1c1c1;
  --sidebar-border: #222222;
  --sidebar-ring: #e78a53;
  --font-sans: Geist Mono, ui-monospace, monospace;
  --font-serif: serif;
  --font-mono: JetBrains Mono, monospace;
  --radius: 0.75rem;
  --shadow-2xs: 0px 1px 4px 0px hsl(0 0% 0% / 0.03);
  --shadow-xs: 0px 1px 4px 0px hsl(0 0% 0% / 0.03);
  --shadow-sm: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 1px 2px -1px hsl(0 0% 0% / 0.05);
  --shadow: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 1px 2px -1px hsl(0 0% 0% / 0.05);
  --shadow-md: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 2px 4px -1px hsl(0 0% 0% / 0.05);
  --shadow-lg: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 4px 6px -1px hsl(0 0% 0% / 0.05);
  --shadow-xl: 0px 1px 4px 0px hsl(0 0% 0% / 0.05), 0px 8px 10px -1px hsl(0 0% 0% / 0.05);
  --shadow-2xl: 0px 1px 4px 0px hsl(0 0% 0% / 0.13);
}

body {
  letter-spacing: var(--tracking-normal);
}

*/
