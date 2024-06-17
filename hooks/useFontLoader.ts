import { useFonts } from "expo-font";

export function useFontLoader() {
  return useFonts({
    SVNPoppins900: require("@/assets/fonts/SVN-Poppins-Black.ttf"),
    SVNPoppins900Italic: require("@/assets/fonts/SVN-Poppins-BlackItalic.ttf"),
    SVNPoppins800: require("@/assets/fonts/SVN-Poppins-ExtraBold.ttf"),
    SVNPoppins800Italic: require("@/assets/fonts/SVN-Poppins-ExtraBoldItalic.ttf"),
    SVNPoppins700: require("@/assets/fonts/SVN-Poppins-Bold.ttf"),
    SVNPoppins700Italic: require("@/assets/fonts/SVN-Poppins-BoldItalic.ttf"),
    SVNPoppins600: require("@/assets/fonts/SVN-Poppins-SemiBold.ttf"),
    SVNPoppins600Italic: require("@/assets/fonts/SVN-Poppins-SemiBoldItalic.ttf"),
    SVNPoppins500: require("@/assets/fonts/SVN-Poppins-Medium.ttf"),
    SVNPoppins500Italic: require("@/assets/fonts/SVN-Poppins-MediumItalic.ttf"),
    SVNPoppins400: require("@/assets/fonts/SVN-Poppins-Regular.ttf"),
    SVNPoppins400Italic: require("@/assets/fonts/SVN-Poppins-Italic.ttf"),
    SVNPoppins300: require("@/assets/fonts/SVN-Poppins-Light.ttf"),
    SVNPoppins300Italic: require("@/assets/fonts/SVN-Poppins-LightItalic.ttf"),
    SVNPoppins200: require("@/assets/fonts/SVN-Poppins-ExtraLight.ttf"),
    SVNPoppins200Italic: require("@/assets/fonts/SVN-Poppins-ExtraLightItalic.ttf"),
    SVNPoppins100: require("@/assets/fonts/SVN-Poppins-Thin.ttf"),
    SVNPoppins100Italic: require("@/assets/fonts/SVN-Poppins-ThinItalic.ttf"),
  });
}
