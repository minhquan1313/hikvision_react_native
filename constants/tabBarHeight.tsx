import { Platform } from "react-native";

export const tabBarHeight: {
  [key in typeof Platform.OS]?: number;
} = {
  web: 56,
  ios: 84,
  android: 56,
};
