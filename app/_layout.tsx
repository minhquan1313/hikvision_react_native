import "@/assets/styles/tailwind.css";
import "react-native-reanimated";

import BStack from "@/components/BStack";
import { CustomDarkTheme, CustomLightTheme } from "@/constants/nativeTheme";
import { useFontLoader } from "@/hooks/useFontLoader";
import { ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded] = useFontLoader();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme}>
      <BStack screenOptions={{}}>
        <BStack.Screen
          name="index"
          options={{
            headerShown: true,
            title: "MTB Hikvision",
          }}
        />

        <BStack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: "Trang chủ",
          }}
        />

        <BStack.Screen name="+not-found" />
      </BStack>

      <StatusBar
        animated
        style={colorScheme === "light" ? "dark" : "light"}
      />
    </ThemeProvider>
  );
}
