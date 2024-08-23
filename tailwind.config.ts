import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        siemreap: ['Siemreap', 'sans-serif'],
        satoshi: ["Satoshi", "sans-serif"],
      },
      backgroundColor: {
        "base-main": "rgb(246, 248, 252)",
      },
      colors: {
        "title": "#323338",
        "title_gray": "#6A707C",
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        primary: "#5750F1",
        stroke: "#E6EBF1",
        "stroke-dark": "#27303E",
        dark: {
          DEFAULT: "#111928",
          2: "#1F2A37",
          3: "#374151",
          4: "#4B5563",
          5: "#6B7280",
          6: "#9CA3AF",
          7: "#D1D5DB",
          8: "#E5E7EB",
        },
        gray: {
          DEFAULT: "#EFF4FB",
          dark: "#122031",
          1: "#F9FAFB",
          2: "#F3F4F6",
          3: "#E5E7EB",
          4: "#D1D5DB",
          5: "#9CA3AF",
          6: "#6B7280",
          7: "#374151",
        },
        green: {
          DEFAULT: "#22AD5C",
          dark: "#1A8245",
          light: {
            DEFAULT: "#2CD673",
            1: "#10B981",
            2: "#57DE8F",
            3: "#82E6AC",
            4: "#ACEFC8",
            5: "#C2F3D6",
            6: "#DAF8E6",
            7: "#E9FBF0",
          },
        },
        red: {
          DEFAULT: "#F23030",
          dark: "#E10E0E",
          light: {
            DEFAULT: "#F56060",
            2: "#F89090",
            3: "#FBC0C0",
            4: "#FDD8D8",
            5: "#FEEBEB",
            6: "#FEF3F3",
          },
        },
        blue: {
          DEFAULT: "#3C50E0",
          dark: "#1C3FB7",
          light: {
            DEFAULT: "#5475E5",
            2: "#8099EC",
            3: "#ADBCF2",
            4: "#C3CEF6",
            5: "#E1E8FF",
          },
        },
        orange: {
          light: {
            DEFAULT: "#F59460",
          },
        },
        yellow: {
          dark: {
            DEFAULT: "#F59E0B",
            2: "#D97706",
          },
          light: {
            DEFAULT: "#FCD34D",
            4: "#FFFBEB",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;