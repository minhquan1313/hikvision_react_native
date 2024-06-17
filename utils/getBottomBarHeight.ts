import { Dimensions, Platform } from "react-native";

export function getBottomBarHeight() {
  if (Platform.OS === "web") return 0;

  let deviceH = Dimensions.get("screen").height;
  // the value returned does not include the bottom navigation bar, I am not sure why yours does.
  let windowH = Dimensions.get("window").height;
  let bottomNavBarH = deviceH - windowH;

  console.log(`~🤖 getBottomBarHeight 🤖~ `, { deviceH, windowH });

  return Math.ceil(bottomNavBarH);
}
