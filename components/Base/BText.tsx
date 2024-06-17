import { cn } from "@/utils/cn";
import { Link } from "expo-router";
import { ForwardedRef, forwardRef, memo } from "react";
import { Text, TextProps } from "react-native";
import { fontSize } from "tailwindcss/defaultTheme";

type LinkProps = Parameters<typeof Link>[0];

type BLinkType = "link";
interface BTextLink extends BTextCommon, LinkProps {
  type?: BLinkType;
}
type BTextNormalType =
  | "header title"
  | "title"
  | "subtitle"
  | "mini text"
  | "tab text"
  | "tab text highlight"
  | "button pri"
  | "button alt"
  | "error"
  //
  | "text"
  | "text alt";
interface BTextNormal extends BTextCommon, TextProps {
  type?: BTextNormalType;
}

interface BTextCommon {
  size?: keyof typeof fontSize;
}

export type BTextProps<T extends BLinkType | BTextNormalType> = T extends BLinkType ? BTextLink : BTextNormal;

export type BTextRef<T extends BLinkType | BTextNormalType> = T extends BLinkType ? never : Text;

const _ = <T extends BLinkType | BTextNormalType>(props: BTextProps<T>, ref: ForwardedRef<BTextRef<T>>) => {
  const {
    type = "text",
    size,

    ..._props
  } = props;

  const className = {
    t: cn(
      {
        // break at text-4xl: top of text is cut off
        "font-SVNPoppins400 text-base text-light-text dark:text-dark-text": type === "text",
        "font-SVNPoppins400 text-base text-light-text-alt dark:text-dark-text-alt ": type === "text alt",
        "font-SVNPoppins400 text-sm text-light-text dark:text-dark-text": type === "mini text",
        "font-SVNPoppins400 text-xs text-light-greyed dark:text-dark-greyed": type === "tab text",
        "font-SVNPoppins500 text-xs text-light-primary dark:text-dark-primary": type === "tab text highlight",

        "font-SVNPoppins400 text-lg text-light-text dark:text-dark-text": type === "header title",

        "font-SVNPoppins700 text-xl text-light-text dark:text-dark-text": type === "title",
        "font-SVNPoppins500 text-lg text-light-text dark:text-dark-text": type === "subtitle",

        "font-SVNPoppins400 text-base text-light-link dark:text-dark-link": type === "link",

        "text-center font-SVNPoppins500 text-lg text-white": type === "button pri",
        "text-center font-SVNPoppins400 text-lg text-light-text dark:text-dark-text": type === "button alt",

        "font-SVNPoppins400 text-base text-red-600 dark:text-red-600": type === "error",
      },
      size !== undefined && {
        "text-xs": size === "xs",
        "text-sm": size === "sm",
        "text-base": size === "base",
        "text-lg": size === "lg",
        "text-xl": size === "xl",

        "text-2xl": size === "2xl",
        "text-3xl": size === "3xl",
        "text-4xl": size === "4xl",
        "text-5xl leading-[52px]": size === "5xl",
        "text-6xl leading-[64px]": size === "6xl",
        "text-7xl leading-[76px]": size === "7xl",
        "text-8xl leading-[100px]": size === "8xl",
        "text-9xl leading-[100px]": size === "9xl",
      },

      size !== undefined && {
        "pt-0.5": size === "2xl",
        "pt-2": size === "3xl",
        "pt-3": size === "4xl",
        "pt-4": size === "5xl",
        "pt-5": size === "6xl",
        "pt-6": size === "7xl",
        "pt-7": size === "8xl",
        "pt-8": size === "9xl",
      },
      // "border border-red-400",
      // "bg-red-400",
    ),
  };

  if (type === "link")
    return (
      <Link
        className={className.t}
        {...(_props as BTextLink)}
      />
    );

  return (
    <Text
      className={className.t}
      ref={ref}
      {...(_props as BTextLink)}
    />
  );
};

const BText = memo(forwardRef(_)) as typeof _;

export default BText;
