import BView from "@/components/BView";
import { useCustomColor } from "@/hooks/useCustomColor";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Pressable } from "react-native";

export interface DarkLightToggleProps {
  //
}

function DarkLightToggle(props: DarkLightToggleProps) {
  const {
    //

    ..._props
  } = props;

  const { colorScheme, setColorScheme } = useColorScheme();
  const { text } = useCustomColor();

  return (
    <BView {..._props}>
      <Pressable
        onPress={() => {
          setColorScheme(colorScheme === "light" ? "dark" : "light");
        }}
      >
        {colorScheme === "light" ? (
          <Feather
            name="sun"
            size={48}
            color={text}
          />
        ) : (
          <Feather
            name="moon"
            size={48}
            color={text}
          />
        )}
      </Pressable>
    </BView>
  );
}

export default DarkLightToggle;
