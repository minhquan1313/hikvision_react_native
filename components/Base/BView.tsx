import { cn } from "@/utils/cn";
import { ForwardedRef, forwardRef, memo } from "react";
import { View, ViewProps } from "react-native";

export interface BViewProps extends ViewProps {
  //
  type?: "transparent" | "background";
  align?: "center" | "center-horizontal" | "center-vertical" | "horizontal" | "vertical";
  block?: boolean;
}

export type BViewRef = View;

const _ = (props: BViewProps, ref: ForwardedRef<BViewRef>) => {
  const {
    type = "transparent",
    align,
    children,
    block,
    //
    ..._props
  } = props;

  return (
    <View
      className={cn({
        "": type === "transparent",
        "bg-light-background dark:bg-dark-background": type === "background",

        "items-center justify-center bg-red-300": align === "center",
        "items-center": align === "center-horizontal",
        "justify-center": align === "center-vertical",
        "flex-row": align === "horizontal",
        "flex-col": align === "vertical",
        "flex-1": block,
      })}
      ref={ref}
      {..._props}
    >
      {children}
    </View>
  );
};

const BView = memo(forwardRef(_));

export default BView;
