// ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useColorScheme as useNWColorScheme, vars } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "@/components/global/Splash";

/** 1) Define colors ONCE and export (so others can import if needed) */
export const COLOR_TOKENS = {
  light: {
    background: "#F5F5F5",
    surface: "#FFFFFF",
    canvas: "#EAEAEA",
    heading: "#262626",
    body: "#6B6B6B",
    stroke: "#999999",
    outline: "#E7E7E7",
    primary: "#00a303",
    secondary: "#f0e800",
    danger: "#EF4444",
    warning: "#F59E0B",
    success: "#17b723",
    info: "#706D8C",
  },
  dark: {
    background: "#030303",
    surface: "#0B0B0B",
    canvas: "#151515",
    heading: "#F1F1F1",
    body: "#B0B0B0",
    stroke: "#474747",
    outline: "#2D2D2D",
    primary: "#00a303",
    secondary: "#f0e800",
    danger: "#EF4444",
    warning: "#F59E0B",
    success: "#17b723",
    info: "#706D8C",
  },
} as const;

export type ThemeName = keyof typeof COLOR_TOKENS;
export type ColorsType = typeof COLOR_TOKENS;

/** 2) NativeWind CSS vars */
const themeVars: Record<ThemeName, ReturnType<typeof vars>> = {
  light: vars({
    "--color-background": COLOR_TOKENS.light.background,
    "--color-surface": COLOR_TOKENS.light.surface,
    "--color-canvas": COLOR_TOKENS.light.canvas,
    "--color-heading": COLOR_TOKENS.light.heading,
    "--color-body": COLOR_TOKENS.light.body,
    "--color-stroke": COLOR_TOKENS.light.stroke,
    "--color-outline": COLOR_TOKENS.light.outline,
    "--color-primary": COLOR_TOKENS.light.primary,
    "--color-secondary": COLOR_TOKENS.light.secondary,
    "--color-danger": COLOR_TOKENS.light.danger,
    "--color-warning": COLOR_TOKENS.light.warning,
    "--color-success": COLOR_TOKENS.light.success,
    "--color-info": COLOR_TOKENS.light.info,
  }),
  dark: vars({
    "--color-background": COLOR_TOKENS.dark.background,
    "--color-surface": COLOR_TOKENS.dark.surface,
    "--color-canvas": COLOR_TOKENS.dark.canvas,
    "--color-heading": COLOR_TOKENS.dark.heading,
    "--color-body": COLOR_TOKENS.dark.body,
    "--color-stroke": COLOR_TOKENS.dark.stroke,
    "--color-outline": COLOR_TOKENS.dark.outline,
    "--color-primary": COLOR_TOKENS.dark.primary,
    "--color-secondary": COLOR_TOKENS.dark.secondary,
    "--color-danger": COLOR_TOKENS.dark.danger,
    "--color-warning": COLOR_TOKENS.dark.warning,
    "--color-success": COLOR_TOKENS.dark.success,
    "--color-info": COLOR_TOKENS.dark.info,
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
