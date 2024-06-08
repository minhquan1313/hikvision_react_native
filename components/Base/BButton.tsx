import BText, { BTextProps } from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import { cn } from "@/utils/cn";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface BButtonProps extends TouchableOpacityProps {
  inline?: boolean;
  center?: boolean;
  alt?: boolean;
  icon?: JSX.Element;
  size?: BTextProps["size"];
  borderless?: boolean;
  circle?: boolean;
}

function BButton(props: BButtonProps) {
  const {
    children,
    inline,
    center,
    alt,
    icon: Icon,
    size,
    circle,
    borderless,
    //
    ..._props
  } = props;

  return (
    <TouchableOpacity
      className={cn({
        "self-start": inline,
        "self-center": center,
      })}
      {..._props}
    >
      <BView
        className={cn("items-center justify-center bg-light-primary dark:bg-transparent", {
          "border border-light-primary dark:border-dark-primary": !borderless,
          "aspect-square rounded-full px-4 py-4": circle,
          "rounded-lg px-4 py-2": !circle,
        })}
      >
        {Icon && Icon}

        {children && (
          <BText
            type={alt ? "button alt" : "button pri"}
            size={size}
            className="leading-none"
          >
            {children}
          </BText>
        )}
      </BView>
    </TouchableOpacity>
  );
}

export default BButton;
