import BText, { BTextProps } from "@/components/Base/BText";
import { cn } from "@/utils/cn";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface BButtonProps extends TouchableOpacityProps {
  inline?: boolean;
  center?: boolean;
  block?: boolean;
  sharp?: boolean;
  icon?: JSX.Element;
  size?: BTextProps["size"];
  borderless?: boolean;
  circle?: boolean;

  primary?: boolean;
}

function BButton(props: BButtonProps) {
  const {
    children,
    inline,
    center,
    block,
    sharp,
    icon: Icon,
    size,
    circle,
    borderless,

    primary,

    //
    ..._props
  } = props;

  return (
    <TouchableOpacity
      className={cn("items-center justify-center", {
        "self-start": inline,
        "self-center": center,
        "flex-1": block,

        "border border-light-primary dark:border-dark-primary": !borderless && primary,
        "border border-light-card dark:border-dark-card": !borderless && !primary,
        "aspect-square rounded-full px-4 py-4": circle,
        "rounded-lg px-4 py-2": !circle && !sharp,
        "px-4 py-2": sharp,

        "bg-light-primary dark:bg-dark-primary": !_props.disabled && primary,
        "bg-light-card dark:bg-dark-card": !_props.disabled && !primary,
        "border-light-greyed bg-light-greyed dark:border-dark-greyed dark:bg-dark-greyed": _props.disabled,
      })}
      {..._props}
    >
      {/* <BView
        className={cn("items-center justify-center bg-light-primary dark:bg-transparent", {
          "border border-light-primary dark:border-dark-primary": !borderless,
          "aspect-square rounded-full px-4 py-4": circle,
          "rounded-lg px-4 py-2": !circle,
        })}
      > */}
      {Icon && Icon}

      {children && (
        <BText
          type={!primary ? "button alt" : "button pri"}
          size={size}
          className="leading-none"
        >
          {children}
        </BText>
      )}
      {/* </BView> */}
    </TouchableOpacity>
  );
}

export default BButton;
