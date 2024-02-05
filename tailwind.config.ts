import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-100": "#D2B48C",
        "primary-200": "#B49770",
        "primary-300": "#705834",
        "accent-100": "#A0522D",
        "accent-200": "#FFE2B5",
        "text-100": "#000000",
        "text-200": "#2C2C2C",
        "bg-100": "#F5F5DC",
        "bg-200": "#EBEBD2",
        "bg-300": "#C2C2AA",
      }
    },
  },
  plugins: [],
};
export default config;
