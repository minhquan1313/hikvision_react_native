import { CustomDarkTheme, CustomLightTheme } from "@/constants/nativeTheme";
import { useColorScheme } from "nativewind";

export function useCustomColor() {
  const { colorScheme } = useColorScheme();
  const schema = colorScheme === "light" ? CustomLightTheme : CustomDarkTheme;

  return schema.colors;
}
