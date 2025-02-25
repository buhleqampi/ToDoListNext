import type { Config } from "tailwindcss";
import plugin from "flowbite/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "public/index.html",
    "node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'patrick-hand': [ '"Patrick Hand"', 'cursive'],
      },
      backgroundImage:{
        'login-register': "url('/Assets/LoginRegister.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), plugin]
} satisfies Config;
