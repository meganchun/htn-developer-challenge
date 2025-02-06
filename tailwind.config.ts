import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        white: "var(--foreground)",
        "text-secondary": "var(--text-secondary)",
        "background-secondary": "var(--background-secondary)",
        blue: "var(--blue)",
        pink: "var(--pink)",
        teal: "var(--teal)",
      },
    },
  },
  plugins: [],
} satisfies Config;
