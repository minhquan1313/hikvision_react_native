import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import DarkLightToggle from "@/components/Base/DarkLightToggle";

export default function Index() {
  return (
    <BView className="flex-1 items-center justify-center gap-5">
      <BText type="text">Bình nè cục cưng ơi :{">"}</BText>

      <BText
        type="link"
        href="(tabs)/user"
        size="6xl"
      >
        Home nè
      </BText>

      <DarkLightToggle
        circle
        // size="7xl"
        // borderless
      />
    </BView>
  );
}
