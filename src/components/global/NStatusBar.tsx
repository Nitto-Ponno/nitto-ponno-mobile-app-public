import { StatusBar } from "expo-status-bar";
import React from "react";
import { Colors, useTheme } from "@/context/ThemeProvider";

type StatusBarProps = {
  barStyle?: "light" | "dark" | "auto";
  backgroundColor?: string;
  translucent?: boolean;
};

interface NStatusBarProps {
  statusBar?: StatusBarProps;
}

const NStatusBar: React.FC<NStatusBarProps> = () => {
  const { theme } = useTheme();

  return <StatusBar style={theme === "dark" ? "light" : "dark"} backgroundColor={Colors.background ?? "transparent"} translucent={true} />;
};

export default NStatusBar;
