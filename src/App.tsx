import "./global.css";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import NText from "./components/global/NText";

// Keep splash screen until we hide it manually
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Thin: require("./assets/fonts/Roboto-Thin.ttf"),
    Light: require("./assets/fonts/Roboto-Light.ttf"),
    Regular: require("./assets/fonts/Roboto-Regular.ttf"),
    Medium: require("./assets/fonts/Roboto-Medium.ttf"),
    SemiBold: require("./assets/fonts/Roboto-SemiBold.ttf"),
    Bold: require("./assets/fonts/Roboto-Bold.ttf"),
    ExtraBold: require("./assets/fonts/Roboto-ExtraBold.ttf"),
  });
  useEffect(() => {
    const prepare = async () => {
      // simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-blue-300">
      <NText className="text-xl font-FFRegular  text-blue-500">Welcome to Nitto Ponno!</NText>
    </View>
  );
}
