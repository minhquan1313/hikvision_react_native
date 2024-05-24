import BText from "@/components/BText";
import BView from "@/components/BView";
import DarkLightToggle from "@/components/DarkLightToggle";

export default function Index() {
  return (
    <BView className="flex-1 items-center justify-center gap-5">
      <BText type="text">Bình nè cục cưng ơi :{">"}</BText>

      <BText
        type="link"
        href={"(tabs)"}
        size="6xl"
      >
        Home nè
      </BText>

      <DarkLightToggle />
    </BView>
  );
}
