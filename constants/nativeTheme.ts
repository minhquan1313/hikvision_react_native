import tailwindConfig from "@/tailwind.config.js";
import { Theme } from "@react-navigation/native";

const {
  colors: { dark, light },
} = tailwindConfig.theme.extend;

type BaseThemeColors = Theme["colors"];
type CustomTailwindColors = typeof dark;

export interface IColors extends BaseThemeColors, CustomTailwindColors {}

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

export type IColorsLightDarkMap<Colors extends IColors> = {
  [Property in keyof Colors as `${string & Property}Light` | `${string & Property}Dark`]: Colors[Property];
};
export const colorsDarkLight: IColorsLightDarkMap<IColors> = {} as any;

for (const key in CustomLightTheme.colors) {
  const lightKey = key + "Light";
  const darkKey = key + "Dark";
  (colorsDarkLight as any)[lightKey] = (CustomLightTheme.colors as any)[key];
  (colorsDarkLight as any)[darkKey] = (CustomDarkTheme.colors as any)[key];
}
