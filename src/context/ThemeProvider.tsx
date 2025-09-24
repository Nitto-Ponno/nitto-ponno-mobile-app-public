// ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useColorScheme as useNWColorScheme, vars } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "@/components/global/Splash";

/** 1) Define colors ONCE and export (so others can import if needed) */
export const COLOR_TOKENS = {
  light: {
    primary: "#0635d0",
    secondary: "#F7F7F7",
    heading: "#252525",
    body: "#8E8E8E",
    line: "#ECECEC",
    border: "#E7E7E7",
    success: "#17b723",
    warning: "#F59E0B",
    error: "#EF4444",
    background: "#FFFFFF",
    foreground: "#f8f8f8",
  },
  dark: {
    primary: "#0635d0",
    secondary: "#1D1D1D",
    heading: "#FFFFFF",
    body: "#C8C8C8",
    line: "#2C2C2C",
    border: "#2A2A2A",
    success: "#17b723",
    warning: "#F59E0B",
    error: "#EF4444",
    background: "#0B0B0B",
    foreground: "#111111",
  },
} as const;

export type ThemeName = keyof typeof COLOR_TOKENS;
export type ColorsType = typeof COLOR_TOKENS;

/** 2) NativeWind CSS vars */
const themeVars: Record<ThemeName, ReturnType<typeof vars>> = {
  light: vars({
    "--color-primary": COLOR_TOKENS.light.primary,
    "--color-secondary": COLOR_TOKENS.light.secondary,
    "--color-heading": COLOR_TOKENS.light.heading,
    "--color-body": COLOR_TOKENS.light.body,
    "--color-line": COLOR_TOKENS.light.line,
    "--color-border": COLOR_TOKENS.light.border,
    "--color-success": COLOR_TOKENS.light.success,
    "--color-warning": COLOR_TOKENS.light.warning,
    "--color-error": COLOR_TOKENS.light.error,
    "--color-background": COLOR_TOKENS.light.background,
    "--color-foreground": COLOR_TOKENS.light.foreground,
  }),
  dark: vars({
    "--color-primary": COLOR_TOKENS.dark.primary,
    "--color-secondary": COLOR_TOKENS.dark.secondary,
    "--color-heading": COLOR_TOKENS.dark.heading,
    "--color-body": COLOR_TOKENS.dark.body,
    "--color-line": COLOR_TOKENS.dark.line,
    "--color-border": COLOR_TOKENS.dark.border,
    "--color-success": COLOR_TOKENS.dark.success,
    "--color-warning": COLOR_TOKENS.dark.warning,
    "--color-error": COLOR_TOKENS.dark.error,
    "--color-background": COLOR_TOKENS.dark.background,
    "--color-foreground": COLOR_TOKENS.dark.foreground,
  }),
};

/** 3) Context */
interface ThemeContextType {
  theme: ThemeName;
  toggleTheme: () => void;
  Colors: ColorsType; // full token map if you need it
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  Colors: COLOR_TOKENS,
});

/** 4) Global theme bridge (lets you use Colors.primary without hooks) */
let currentTheme: ThemeName = "light";
export const setGlobalTheme = (theme: ThemeName) => {
  currentTheme = theme;
};

/** Proxy that always reads from the CURRENT theme */
export const Colors = new Proxy({} as (typeof COLOR_TOKENS)["light"], {
  get(_target, prop: string) {
    // TypeScript: we trust keys match the palette
    return (COLOR_TOKENS as any)[currentTheme][prop];
  },
}) as (typeof COLOR_TOKENS)["light"];

/** 5) Provider */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorScheme } = useNWColorScheme(); // "light" | "dark" | undefined
  const [manualTheme, setManualTheme] = useState<ThemeName | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
          setManualTheme(saved);
          setGlobalTheme(saved);
        }
      } catch (e) {
        console.error("ThemeProvider: Failed to load theme", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const theme = (manualTheme || colorScheme || "light") as ThemeName;

  // useEffect(() => {
  //   // keep the global proxy in sync so Colors.primary stays dynamic
  //   setGlobalTheme(theme);
  // }, [theme]);

  const toggleTheme = () => {
    setManualTheme((prev) => {
      const next = (prev ?? theme) === "light" ? "dark" : "light";
      AsyncStorage.setItem("theme", next).catch((e) => console.error("ThemeProvider: Failed to save theme", e));
      setGlobalTheme(next);
      return next;
    });
  };

  const providerValue = useMemo<ThemeContextType>(() => ({ theme, toggleTheme, Colors: COLOR_TOKENS }), [theme]);

  if (isLoading) return <Splash />;

  return (
    <ThemeContext.Provider value={providerValue}>
      <View style={[themeVars[theme], { flex: 1 }]}>{children}</View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
