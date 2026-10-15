import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            DEFAULT: "#880208",
            dark: "#5E0105",
            hover: "#A3030A",
            subtle: "rgba(136, 2, 8, 0.08)",
          },
          yellow: {
            DEFAULT: "#E7B717",
            light: "#FCE9A8",
            badge: "#FDECA7",
            hover: "#F3C223",
          },
          cream: {
            DEFAULT: "#FBF3E4",
            dark: "#E8D7BC",
            border: "#E8D7BC",
          },
          card: {
            light: "#FFFDF8",
            border: "#E8D7BC",
          },
          text: {
            primary: "#23130F",
            secondary: "#6E5A50",
            muted: "#968378",
          },
          dark: {
            bg: "#17100D",
            surface: "#241612",
            card: "#2A1A15",
            border: "#3A251E",
            text: "#FBF3E4",
            secondary: "#C2AFA3",
            muted: "#8C7B73",
          },
          green: {
            DEFAULT: "#1A8045",
            badge: "#E4F6EB",
            hover: "#146938",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0px 2px 4px 0px rgba(36, 18, 15, 0.06), 0px 12px 28px -4px rgba(36, 18, 15, 0.08)",
        floating: "0px 8px 24px -4px rgba(36, 18, 15, 0.18), 0px 2px 6px 0px rgba(36, 18, 15, 0.08)",
        price: "0px 2px 0px 0px rgba(74, 3, 5, 0.18)",
        btn: "0px 4px 12px 0px rgba(135, 3, 8, 0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
