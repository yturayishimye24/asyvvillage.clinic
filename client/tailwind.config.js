
import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fonts: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [flowbite.plugin()],
};
