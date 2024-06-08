// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  env: {
    node: true,
  },
  rules: {
    "react-hooks/exhaustive-deps": "off", // <--- THIS IS THE NEW RULE
  },
};
