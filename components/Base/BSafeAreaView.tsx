import BView from "@/components/Base/BView";
import { useMemo } from "react";
import { KeyboardAvoidingView, Platform, ViewProps } from "react-native";
import { Edge, useSafeAreaInsets } from "react-native-safe-area-context";

export interface BSafeAreaViewProps extends ViewProps {
  mode?: "padding" | "margin";
  edges?: Edge[];
  excludeEdges?: Edge[];
  withKeyboard?: boolean;
  withKeyboardOnly?: boolean;
}

function BSafeAreaView(props: BSafeAreaViewProps) {
  const {
    edges = ["top", "bottom", "left", "right"],
    mode = "padding",
    excludeEdges = [],
    withKeyboard,
    withKeyboardOnly,

    style: additionStyle,
    children,
    ..._props
  } = props;

  // const { keyBoardHeight } = useKeyboardVisible();

  const insets = useSafeAreaInsets();

  const styles: BSafeAreaViewProps["style"] = useMemo(() => {
    // const keyBottom = (mode + "Bottom") as `${typeof mode}Bottom`;

    // if (withKeyboardOnly) {
    //   // animationKeyboard();
    //   return {
    //     [keyBottom]: Platform.OS === "ios" ? keyBoardHeight : 0,
    //   };
    // }

    const edgesBase: BSafeAreaViewProps["style"] = edges
      .reduce<Edge[]>((total, edge) => {
        if (excludeEdges.includes(edge)) return total;
        return [...total, edge];
      }, [])
      .map((edge) => {
        const key = mode + edge[0].toUpperCase() + edge.slice(1);
        return { [key]: insets[edge] };
      })
      .reduce((total, edge) => ({ ...total, ...edge }), {});

    // if (withKeyboard) {
    //   animationKeyboard();
    //   edgesBase[keyBottom] = Platform.OS === "ios" ? keyBoardHeight : edgesBase[keyBottom];
    // }
    // console.log(`safearea m`);

    return edgesBase;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify([edges, excludeEdges]), mode, insets]);

  // useEffect(() => {
  //   console.log(`safearea`, t, edges);
  // });

  // function animationKeyboard(ms = 300) {
  // Keyboard.scheduleLayoutAnimation({
  //   duration: ms,
  //   easing: "easeOut",
  //   endCoordinates: {
  //     width: 0,
  //     screenX: 0,
  //     screenY: 0,
  //     height: 0,
  //   },
  // });
  // }

  // useEffect(() => {
  //   if (!withKeyboardOnly && !withKeyboard) return;

  //   console.log({ styles, withKeyboardOnly });
  // }, [keyBoardHeight]);

  if (withKeyboard || withKeyboardOnly)
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[!withKeyboardOnly && styles, additionStyle]}
        ignoreIOSKeyboardWillChangeEvents
        {..._props}
      >
        {children}
      </KeyboardAvoidingView>
    );

  return (
    <BView
      style={[styles, additionStyle]}
      {..._props}
    >
      {children}
    </BView>
  );
}

export default BSafeAreaView;
