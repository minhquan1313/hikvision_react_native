import { getBottomBarHeight } from "@/utils/getBottomBarHeight";
import { useCallback } from "react";
import { LayoutChangeEvent, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useImmer } from "use-immer";

interface IParams {
  //
  value?: unknown;
}

export function useBottomSheetSnaps(value: IParams = {}) {
  const { bottom } = useSafeAreaInsets();
  const [snaps, setSnapsImmer] = useImmer<(string | number)[]>(["33%", "100%"]);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const barHeight = getBottomBarHeight();

      switch (Platform.OS) {
        case "web":
          setSnapsImmer((d) => {
            const height = e.nativeEvent.layout.height + barHeight;
            console.log({ height, barHeight });

            d[0] = height + bottom;
          });
          console.log({ e: e });
          break;
        case "ios":
        case "android":
        case "windows":
        case "macos":
          // e.target.measure((x, y, w, h) => {
          //   setSnapsImmer((d) => {
          //     const height = h + barHeight;
          //     d[0] = height + bottom;
          //   });
          // });
          setSnapsImmer((d) => {
            const height = e.nativeEvent.layout.height + barHeight;
            console.log({ height, barHeight });

            d[0] = height + bottom;
          });
          break;
      }

      // e.target.measure((x, y, w, h) => {
      //   const height = h + getBottomBarHeight();
      //   setSnapsImmer((d) => {
      //     d[0] = height + bottom;
      //   });
      // });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bottom],
  );

  return { snapPoints: snaps, onLayoutRenderTarget: onLayout };
}
