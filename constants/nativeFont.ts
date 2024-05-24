import tailwindConfig from "@/tailwind.config.js";

const { fontFamily } = tailwindConfig.theme.extend;

type TFontName = keyof typeof fontFamily;
type TCustomFont = { [key in TFontName]: string };

export const CustomFonts: TCustomFont = (() => {
  const obj: TCustomFont = {} as any;
  Object.keys(fontFamily).forEach((v) => {
    const key = v as TFontName;

    obj[key] = key;
  });

  return obj;
})();
