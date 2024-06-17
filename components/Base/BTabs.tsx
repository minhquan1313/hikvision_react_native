import BText from "@/components/Base/BText";
import { tabBarHeight } from "@/constants/tabBarHeight";
import { useCustomColor } from "@/hooks/useCustomColor";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

type TOriginProps = Parameters<typeof Tabs>[0];
type TTabsProps = Omit<TOriginProps, "screenOptions">;
type TTabsOptions = Omit<BottomTabNavigationOptions, "headerTitle">;

type TOverride = TTabsProps & {
  screenOptions?: TTabsOptions;
};

export interface BTabsProps extends TOverride {}

function BTabs(props: BTabsProps) {
  const { screenOptions, ..._props } = props;
  const { greyed, primary } = useCustomColor();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: greyed,
        tabBarActiveTintColor: primary,
        tabBarStyle: {
          ...(typeof tabBarHeight[Platform.OS] === "number"
            ? {
                height: tabBarHeight[Platform.OS],
              }
            : {}),
        },
        headerTitle(props) {
          return <BText type="header title">{props.children}</BText>;
        },
        ...screenOptions,
      }}
      {..._props}
    />
  );
}
BTabs.Screen = Tabs.Screen;

export default BTabs;
