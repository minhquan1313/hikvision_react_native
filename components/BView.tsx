import { cn } from "@/utils/cn";
import { View, ViewProps } from "react-native";

export interface BViewProps extends ViewProps {
  //
  type?: "transparent";
  align?: "center" | "center-horizontal" | "center-vertical";
}

function BView(props: BViewProps) {
  const {
    //
    type = "transparent",
    align,
    ..._props
  } = props;

  return (
    <View
      className={cn({
        "": type === "transparent",

        "flex-1 items-center justify-center bg-red-300": align === "center",
        "items-center": align === "center-horizontal",
        "justify-center": align === "center-vertical",
      })}
      {..._props}
    />
  );
}

export default BView;
