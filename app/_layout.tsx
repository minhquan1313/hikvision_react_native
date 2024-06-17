import "@/assets/styles/tailwind.css";
import "react-native-reanimated";

import BKeyboardDisPress from "@/components/Base/BKeyboardDisPress";
import BStack from "@/components/Base/BStack";
import { CustomDarkTheme, CustomLightTheme } from "@/constants/nativeTheme";
import CameraListProvider from "@/contexts/CameraListProvider";
import UserListProvider from "@/contexts/UserListProvider";
import { useBottomBarAndroid } from "@/hooks/useBottomBarAndroid";
import { useCustomColor } from "@/hooks/useCustomColor";
import { useFontLoader } from "@/hooks/useFontLoader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, enableLegacyWebImplementation } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
enableLegacyWebImplementation(true);
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded] = useFontLoader();

  const { background } = useCustomColor();

  useBottomBarAndroid({
    themeColor: "background",
  });

  useEffect(() => {
    if (!loaded) return;

    SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    setBackgroundColorAsync(background);
  }, [background]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={styles.f}>
      <UserListProvider>
        <CameraListProvider>
          <SafeAreaProvider>
            <ThemeProvider value={colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme}>
              <BKeyboardDisPress>
                <BottomSheetModalProvider>
                  <BStack>
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
                </BottomSheetModalProvider>
              </BKeyboardDisPress>
            </ThemeProvider>
          </SafeAreaProvider>
        </CameraListProvider>
      </UserListProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  f: {
    flex: 1,
  },
});
