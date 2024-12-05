/** @type {import('tailwindcss').Config} */
const tailwindPreset=require("./tailwind-preset");
export default {
  presets:[tailwindPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}