import { useCustomColor } from "@/hooks/useCustomColor";
import { useColorScheme } from "nativewind";

export function useButtonIconColor(params: { disabled?: boolean; primary?: boolean } = {}) {
  const { disabled, primary: isPrimary } = params;

  const { colorScheme } = useColorScheme();
  const { primary, secondary, textDark, "text-alt": textAlt, text } = useCustomColor();

  if (disabled) return textAlt;

  if (isPrimary) {
    return colorScheme === "light" ? textDark : text;
  }

  return colorScheme === "light" ? primary : text;
  // return primary;
}
