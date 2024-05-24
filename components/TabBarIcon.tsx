import BText from "@/components/BText";
import BView from "@/components/BView";

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  icon: JSX.Element;
  title: string;
}

function TabBarIcon(props: TabBarIconProps) {
  const { focused, color, icon: Icon, title: name } = props;

  return (
    <BView className="items-center gap-1">
      {Icon}

      <BText
        type={focused ? "tab text highlight" : "tab text"}
        numberOfLines={1}
        style={{
          color,
        }}
        children={name}
      ></BText>
    </BView>
  );
}

export default TabBarIcon;
