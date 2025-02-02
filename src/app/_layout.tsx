import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, Stack, SplashScreen } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { TamaguiProvider } from "tamagui";
import { PortalProvider } from "@tamagui/portal";

import "@tamagui/core/reset.css";
import tamaguiConfig from "@/tamagui.config";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "../store";
import { RootSiblingParent } from "react-native-root-siblings";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(main)"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const customFonts = {
    JostRegular: require("../../assets/fonts/jost/Jost-Regular.ttf"),
    JostMedium: require("../../assets/fonts/jost/Jost-Medium.ttf"),
    JostSemiBold: require("../../assets/fonts/jost//Jost-SemiBold.ttf"),
    JostBold: require("../../assets/fonts/jost/Jost-Bold.ttf"),
    JostItalic: require("../../assets/fonts/jost/Jost-Italic.ttf")
  };

  const [fontsLoaded, fontError] = useFonts(customFonts);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Provider store={store}>
      <PortalProvider shouldAddRootHost>
        <RootSiblingParent>
          <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
            <PaperProvider>
              <Stack>
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
                <Stack.Screen name="category" />
                <Stack.Screen name="subCategory" />
              </Stack>
            </PaperProvider>
          </TamaguiProvider>
        </RootSiblingParent>
      </PortalProvider>
    </Provider>
    // </ThemeProvider>
  );
}
