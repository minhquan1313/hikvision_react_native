import { useCustomColor } from "@/hooks/useCustomColor";
import { useColorScheme } from "nativewind";

export function useButtonIconColor(params: { disabled: boolean | undefined; primary?: boolean }) {
  const { disabled, primary: isPrimary } = params;

  const { colorScheme } = useColorScheme();
  const { primary, textDark, greyed, "text-alt": textAlt, text } = useCustomColor();

  if (disabled) return text;

  if (isPrimary) {
    return colorScheme === "light" ? textDark : text;
  }

  return colorScheme === "light" ? textDark : primary;
}
