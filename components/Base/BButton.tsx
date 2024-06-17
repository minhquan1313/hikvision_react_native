import BText, { BTextProps } from "@/components/Base/BText";
import { cn } from "@/utils/cn";
import { ForwardedRef, forwardRef, memo } from "react";
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
  noBg?: boolean;
  noStyle?: boolean;
}

export type BButtonRef = null;

const _ = (props: BButtonProps, ref: ForwardedRef<BButtonRef>) => {
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
    noBg,
    noStyle,

    //
    ..._props
  } = props;

  return (
    <TouchableOpacity
      className={cn(
        "items-center justify-center",
        {
          "self-start": inline,
          "self-center": center,
          "flex-1": block,
        },
        !noStyle && {
          "aspect-square rounded-full px-4 py-4": circle,
          "rounded-lg px-4 py-2": !circle && !sharp,
          "px-4 py-2": sharp,

          "border border-light-primary dark:border-dark-primary": !borderless && primary,
          "border border-light-border/30 dark:border-dark-secondary": !borderless && !primary,

          "bg-light-primary dark:bg-dark-primary": !_props.disabled && primary,
          "bg-light-secondary dark:bg-dark-secondary": !_props.disabled && !primary,

          "border-light-greyed bg-light-greyed dark:border-dark-greyed dark:bg-dark-greyed": _props.disabled,
          "border-transparent bg-transparent": noBg,
        },
      )}
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

      {typeof children === "string" ? (
        <BText
          type={!primary ? "button alt" : "button pri"}
          size={size}
          className="leading-none"
        >
          {children}
        </BText>
      ) : (
        children
      )}
      {/* </BView> */}
    </TouchableOpacity>
  );
};

const BButton = memo(forwardRef(_));

export default BButton;
