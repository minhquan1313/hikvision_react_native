import { IColors, IColorsLightDarkMap } from "@/constants/nativeTheme";
import { useCustomColor } from "@/hooks/useCustomColor";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { useSegments } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export function useBottomBarAndroid(
  params: {
    color?:
      | string
      | {
          light: string;
          dark: string;
        };
    themeColor?: keyof (IColors & IColorsLightDarkMap<IColors>);
  } = {},
) {
  const { color, themeColor } = params;

  const route = useSegments();
  const [routeInit, setRouteInit] = useState<string>(String(route));
  const { colorScheme } = useColorScheme();

  const colors = useCustomColor();

  async function updateColor() {
    // console.log(`🚀 ~ route:`, { route, routeInit });
    if (routeInit === undefined || String(route) !== routeInit) return;

    if (color) {
      if (typeof color === "string") {
        await setBottomBarColor(color);
      } else {
        await setBottomBarColor(color[colorScheme]);
      }
      return;
    }

    if (themeColor) {
      await setBottomBarColor(colors[themeColor]);
      return;
    }
  }
  useEffect(() => {
    updateColor();
  }, [route, colorScheme]);

  // useEffect(() => {
  //   setRouteInit(String(route));
  // }, []);

  // async function setBottomBarColor(color: keyof IColors | "transparent") {
  //   if (!isAndroid) return Promise.resolve();
  //   await setBackgroundColorAsync(color !== "transparent" ? colors[color] : "#ffffff00");

  //   return Promise.resolve();
  // }
  async function setBottomBarColor(color: string | "transparent") {
    if (!isAndroid) return Promise.resolve();
    await setBackgroundColorAsync(color !== "transparent" ? color : "#ffffff00");

    return Promise.resolve();
  }

  //   async function revert() {
  //     if (!isAndroid) return Promise.resolve();

  //     try {
  //       await setBackgroundColorAsync(backgroundColor.current);
  //     } catch (error) {
  //       alert(error);
  //     }

  //     return Promise.resolve();
  //   }

  return { forceUpdate: updateColor, setBottomBarColor };
  // return { setBottomBarColor };
}
