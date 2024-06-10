import BButton, { BButtonProps } from "@/components/Base/BButton";
import { useButtonIconColor } from "@/hooks/useButtonIconColor";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export interface DarkLightToggleProps extends BButtonProps {
  //
}

function DarkLightToggle(props: DarkLightToggleProps) {
  const {
    //
    ..._props
  } = props;

  const { colorScheme, setColorScheme } = useColorScheme();
  const color = useButtonIconColor({ disabled: false, primary: true });

  return (
    <BButton
      primary
      size="2xl"
      onPress={() => {
        setColorScheme(colorScheme === "light" ? "dark" : "light");
      }}
      icon={
        colorScheme === "light" ? (
          <Feather
            name="sun"
            size={28}
            color={color}
          />
        ) : (
          <Feather
            name="moon"
            size={28}
            color={color}
          />
        )
      }
      {..._props}
    />
  );
}

export default DarkLightToggle;
