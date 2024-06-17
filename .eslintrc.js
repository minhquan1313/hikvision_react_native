// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  env: {
    node: true,
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    // "react-hooks/exhaustive-deps": "off", // <--- THIS IS THE NEW RULE
  },
};
