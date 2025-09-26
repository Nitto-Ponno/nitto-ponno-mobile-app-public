import "@/global.css";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navigation from "@/navigation/Navigation";
import { Provider } from "react-redux";
import store, { persistor } from "@/store/index";
import { PersistGate } from "redux-persist/integration/react";
import Splash from "@/components/global/Splash";
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
    <Provider store={store}>
      <PersistGate loading={<Splash />} persistor={persistor}>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
