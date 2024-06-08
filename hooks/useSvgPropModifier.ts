import { BSvgProps } from "@/types/BSvgProps";
import { RefObject } from "react";
import { Platform } from "react-native";
import { Svg, SvgProps } from "react-native-svg";

const isWeb = Platform.OS === "web";

export function useSvgPropModifier(
  props: SvgProps & BSvgProps,
  svgRef: RefObject<Svg>,
): {
  props: SvgProps & BSvgProps;
} {
  const {
    //
    size = 24,
    autoWidth = false,
    autoHeight = false,
    onLayout,
    ..._props
  } = props;

  return {
    props: {
      width: isWeb && autoWidth ? "auto" : Number(size),
      height: isWeb && autoHeight ? "auto" : Number(size),
      ...(isWeb
        ? {}
        : {
            onLayout: (e) => {
              if (!svgRef.current) return;

              const { target } = e;
              const { setNativeProps: set } = svgRef.current;

              target.measure((x, y, w, h) => {
                if (autoWidth) {
                  set({
                    width: h,
                  });
                }
                if (autoHeight) {
                  set({
                    height: w,
                  });
                }
              });

              onLayout?.(e);
            },
          }),
      ..._props,
    },
  };
}
