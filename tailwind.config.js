// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "20px",
    },

    extend: {
      fontFamily: {
        SVNPoppins900: ["SVNPoppins900"],
        SVNPoppins900Italic: ["SVNPoppins900Italic"],

        SVNPoppins800: ["SVNPoppins800"],
        SVNPoppins800Italic: ["SVNPoppins800Italic"],

        SVNPoppins700: ["SVNPoppins700"],
        SVNPoppins700Italic: ["SVNPoppins700Italic"],

        SVNPoppins600: ["SVNPoppins600"],
        SVNPoppins600Italic: ["SVNPoppins600Italic"],

        SVNPoppins500: ["SVNPoppins500"],
        SVNPoppins500Italic: ["SVNPoppins500Italic"],

        SVNPoppins400: ["SVNPoppins400"],
        SVNPoppins400Italic: ["SVNPoppins400Italic"],

        SVNPoppins300: ["SVNPoppins300"],
        SVNPoppins300Italic: ["SVNPoppins300Italic"],

        SVNPoppins200: ["SVNPoppins200"],
        SVNPoppins200Italic: ["SVNPoppins200Italic"],

        SVNPoppins100: ["SVNPoppins100"],
        SVNPoppins100Italic: ["SVNPoppins100Italic"],
      },
      colors: {
        light: {
          primary: "#ff6b81",
          secondary: "#F6F6F6",
          background: "#f2f2f2",
          card: "rgb(255, 255, 255)",
          text: "#2f3542",
          "text-alt": "#57606f",
          greyed: "#a4b0be",
          link: "#1e90ff",
          border: "rgb(216, 216, 216)",
          notification: "rgb(255, 59, 48)",
        },
        dark: {
          primary: "#D4596C",
          secondary: "#2F2F42",
          background: "rgb(1, 1, 1)",
          card: "rgb(18, 18, 18)",
          text: "#f1f2f6",
          "text-alt": "#B6BBC0",
          greyed: "#a4b0be",
          link: "#1e90ff",
          border: "rgb(39, 39, 41)",
          notification: "rgb(255, 69, 58)",
        },
      },
    },
  },

  // this mustn't be included when dev with react native and nativewind
  // darkMode: "class",
  plugins: [],
};
