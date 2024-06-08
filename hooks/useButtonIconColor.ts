import { useCustomColor } from "@/hooks/useCustomColor";
import { useColorScheme } from "nativewind";

export function useButtonIconColor() {
  const { colorScheme } = useColorScheme();
  const { primary, textDark } = useCustomColor();

  return colorScheme === "light" ? textDark : primary;
}
