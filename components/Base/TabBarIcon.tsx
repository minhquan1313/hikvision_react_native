import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import { cn } from "@/utils/cn";
import { ReactElement } from "react";
import { Platform } from "react-native";
import { SvgProps } from "react-native-svg";

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  icon: ReactElement<SvgProps>;
  title: string;
}

function TabBarIcon(props: TabBarIconProps) {
  const { focused, color, icon: Icon, title: name } = props;

  Icon.props.color = color;

  return (
    <BView
      className={cn("items-center", {
        "gap-1": Platform.OS !== "web",
      })}
    >
      <BText
        style={{
          color,
        }}
      >
        {Icon}
      </BText>

      <BText
        type={focused ? "tab text highlight" : "tab text"}
        numberOfLines={1}
        style={{
          color,
        }}
        children={name}
      />
    </BView>
  );
}

export default TabBarIcon;
