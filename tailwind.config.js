import forms from "@tailwindcss/forms";

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
          50: "#F2F2FA",
          //* Background
          100: "#E9E8F6",
          200: "#E6E4FC",
          //* Complement
          300: "#DCD9FF",
          400: "#C2BEFA",
          //* Default
          500: "#4E46B4",
          //* Hovered
          600: "#342BA8",
          //* Active
          700: "#20188A",
          800: "#150E6D",
          900: "#0C0750",
        },
        secondary: {
          50: "#EFF9F8",
          //* Background
          100: "#E8F4F3",
          200: "#E0F3F1",
          //* Complement
          300: "#D0EDEB",
          400: "#A2DBD7",
          //* Default
          500: "#40A69F",
          //* Hovered
          600: "#3B9993",
          //* Active
          700: "#2F7A75",
          800: "#235C58",
          900: "#173D3A",
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
