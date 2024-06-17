import { IColors, IColorsLightDarkMap } from "@/constants/nativeTheme";
import { useCustomColor } from "@/hooks/useCustomColor";
import { sleep } from "@/utils/sleep";
import { getBackgroundColorAsync, setBackgroundColorAsync } from "expo-navigation-bar";
import { useSegments } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export function useBottomBarAndroid(
  params: {
    autoUpdate?: boolean;
    color?:
      | string
      | {
          light: string;
          dark: string;
        };
    themeColor?: keyof (IColors & IColorsLightDarkMap<IColors>);
  } = {},
) {
  const { color, themeColor, autoUpdate = true } = params;

  const route = useSegments();
  const [routeInit] = useState<string>(String(route));
  const { colorScheme } = useColorScheme();
  const revertColor = useRef("");

  const colors = useCustomColor();

  async function updateColor() {
    // console.log(`🚀 ~ route:`, { route, routeInit });
    if (routeInit === undefined || String(route) !== routeInit) return;

    const c = getColorToUpdate();

    if (c) {
      await setBottomBarColor(c);
    }
  }

  function getColorToUpdate() {
    if (color) {
      if (typeof color === "string") {
        return color;
      } else {
        return color[colorScheme];
      }
    }

    if (themeColor) {
      return colors[themeColor];
    }
  }

  async function setBottomBarColor(color: string | "transparent") {
    if (!isAndroid) return Promise.resolve();
    await setBackgroundColorAsync(color !== "transparent" ? color : "#ffffff00");

    return Promise.resolve();
  }

  async function revert() {
    if (!isAndroid || revertColor.current === "") return Promise.resolve();
    await setBackgroundColorAsync(revertColor.current);
  }

  async function getColor() {
    if (!isAndroid) return "";
    return (await getBackgroundColorAsync()).toString();
  }

  async function forceUpdate(maxTry = 3) {
    let i = 0;
    while (i < maxTry) {
      await updateColor();

      await sleep(100);

      const currentColor = await getColor();
      const cToUpdate = getColorToUpdate();

      if (cToUpdate === undefined || currentColor === cToUpdate) {
        return;
      }
      i++;
    }
  }

  async function forceSetBottomBarColor(color: string | "transparent", maxTry = 3) {
    let i = 0;
    while (i < maxTry) {
      await setBottomBarColor(color);

      await sleep(100);

      const currentColor = await getColor();
      const cToUpdate = getColorToUpdate();

      if (cToUpdate === undefined || currentColor === cToUpdate) {
        return;
      }
      i++;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (isAndroid) {
          revertColor.current = (await getBackgroundColorAsync()).toString();
        }
      } catch (error) {}

      if (autoUpdate) {
        updateColor();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, colorScheme]);

  const result = {
    forceUpdate,
    forceSetBottomBarColor,

    revert,
    setBottomBarColor,
  };
  return result;
}
