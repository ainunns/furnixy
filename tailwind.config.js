import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.tsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#F8E9DF",
          //* Background
          100: "#E3CAB8",
          200: "#CFAB92",
          //* Complement
          300: "#BA8D6B",
          400: "#A66E45",
          //* Default
          500: "#914F1E",
          //* Hovered
          600: "#743F18",
          //* Active
          700: "#572F12",
          800: "#1D1006",
          900: "#0C0750",
        },
        secondary: {
          50: "#FDF8F1",
          //* Background
          100: "#FDF5EA",
          200: "#FCF1E3",
          //* Complement
          300: "#FAEAD5",
          400: "#F9E3C7",
          //* Default
          500: "#F7DCB9",
          //* Hovered
          600: "#DEBF97",
          //* Active
          700: "#C5A275",
          800: "#AC8552",
          900: "#936830",
        },
        typo: {
          DEFAULT: "#1F1F1F",
          secondary: "#707070",
          tertiary: "#999CA0",
          icons: "#999CA0",
          divider: "#EBEBEB",
          outline: "#D9D9D9",
        },
        dark: "#222222",
        light: "#F5F5F5",
      },
    },
  },

  plugins: [forms],
};
