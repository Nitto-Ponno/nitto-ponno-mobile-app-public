import { StatusBar } from "expo-status-bar";
import React from "react";
import { useTheme } from "@/context/ThemeProvider";

type StatusBarProps = {
  barStyle?: "light" | "dark" | "auto";
  backgroundColor?: string;
  translucent?: boolean;
};

interface NStatusBarProps {
  statusBar?: StatusBarProps;
}

const NStatusBar: React.FC<NStatusBarProps> = ({ statusBar = {} }) => {
  const { theme } = useTheme();

  const { barStyle, backgroundColor, translucent = false } = statusBar;

  return (
    <StatusBar
      style={barStyle ?? (theme === "dark" ? "light" : "dark")}
      backgroundColor={backgroundColor ?? "transparent"}
      translucent={translucent}
    />
  );
};

export default NStatusBar;
