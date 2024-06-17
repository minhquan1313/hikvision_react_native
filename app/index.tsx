import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import DarkLightToggle from "@/components/Base/DarkLightToggle";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    //
    const sto = setTimeout(() => {
      router.push("/(tabs)");
    }, 500);

    return () => {
      clearTimeout(sto);
    };
  }, []);

  return (
    <BView className="flex-1 items-center justify-center gap-5">
      <BText type="text">Bình nè cục cưng ơi :{">"}</BText>

      <BText
        type="link"
        // href="(tabs)/user"
        href="(tabs)"
        size="6xl"
      >
        Home nè
      </BText>

      <DarkLightToggle circle />
    </BView>
  );
}
