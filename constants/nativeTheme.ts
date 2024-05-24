import tailwindConfig from "@/tailwind.config.js";
import { Theme } from "@react-navigation/native";

const {
  colors: { dark, light },
} = tailwindConfig.theme.extend;

type BaseThemeColors = Theme["colors"];
type CustomTailwindColors = typeof dark;

interface IColors extends BaseThemeColors, CustomTailwindColors {}

export type TCustomTheme = Omit<Theme, "colors"> & {
  colors: IColors;
};
// type TCustomTheme = typeof dark & Theme["colors"];

export const CustomDarkTheme: TCustomTheme = {
  dark: true,
  colors: dark,
};

export const CustomLightTheme: TCustomTheme = {
  dark: false,
  colors: light,
};
