import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { TamaguiProvider } from "tamagui";
import "@tamagui/core/reset.css";
import tamaguiConfig from "@/tamagui.config";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(main)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const customFonts = {
    JostRegular: require("../../assets/fonts/jost/Jost-Regular.ttf"),
    JostMedium: require("../../assets/fonts/jost/Jost-Medium.ttf"),
    JostSemiBold: require("../../assets/fonts/jost//Jost-SemiBold.ttf"),
    JostBold: require("../../assets/fonts/jost/Jost-Regular.ttf"),
  };

  const [fontsLoaded, fontError] = useFonts(customFonts);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <TamaguiProvider config={tamaguiConfig}>
      <Slot />
    </TamaguiProvider>
    // </ThemeProvider>
  );
}
