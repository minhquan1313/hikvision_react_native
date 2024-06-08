import BText from "@/components/Base/BText";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack } from "expo-router";

type TOriginProps = Parameters<typeof Stack>[0];
type TStackProps = Omit<TOriginProps, "screenOptions">;
type TStackOptions = Omit<NativeStackNavigationOptions, "headerTitle">;

type TOverride = TStackProps & {
  screenOptions?: TStackOptions;
};

export interface BStackProps extends TOverride {}

function BStack(props: BStackProps) {
  const { screenOptions, ..._props } = props;

  return (
    <Stack
      screenOptions={{
        headerTitle(props) {
          return <BText type="header title">{props.children}</BText>;
        },
        ...screenOptions,
      }}
      {..._props}
    />
  );
}

BStack.Screen = Stack.Screen;

export default BStack;
