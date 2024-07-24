/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f3f2f0",
        secondary: "#253840",
        navBg0: "rgba(51, 217, 114, 0.4112)",
        // "navBg0": "rgba(32, 137, 72, 1)",
        navBg: "rgba(0, 195, 151, 1)",
        navBg2: "rgba(50, 212, 111, 0.4514)",
        text1: "#0D141C",
        text2: "rgba(255, 255, 255, 0.75)",
        text3: "rgba(13, 20, 28, 0.75)",
        forth: "#faf7f7",
        fifth: "#edecea",
        sixth: "#9dbe89",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
    screens: {
      lg: { max: "2023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "1200px" },
      slg: { max: "1080px" },
      // => @media (max-width: 767px) { ... }
      pdsm: { max: "940px" },

      smd: { max: "900px" },

      sm: { max: "720px" },

      pdusm: { max: "580px" },

      usm: { max: "530px" },
      // => @media (max-width: 639px) { ... }
      vsm: { max: "460px" },
      // => @media (max-width: 400px) { ... }
    },
  },
  plugins: [],
};
