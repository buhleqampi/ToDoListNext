import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "public/index.html",
    flowbite.content(),
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
  plugins: [
    require('@tailwindcss/typography'),
    flowbite.plugin(),
  ],
} satisfies Config;
