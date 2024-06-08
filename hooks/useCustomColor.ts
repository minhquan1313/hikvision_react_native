import { CustomDarkTheme, CustomLightTheme, IColors, IColorsLightDarkMap, colorsDarkLight } from "@/constants/nativeTheme";
import { useColorScheme } from "nativewind";

export function useCustomColor() {
  const { colorScheme } = useColorScheme();
  const schema = colorScheme === "light" ? CustomLightTheme : CustomDarkTheme;

  const colors = { ...schema.colors, ...colorsDarkLight } as IColors & IColorsLightDarkMap<IColors>;

  return colors;
}
