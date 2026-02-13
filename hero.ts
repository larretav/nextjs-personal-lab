import { heroui } from "@heroui/react";
export default heroui({
  themes: {
    "valentines-light": {
      extend: "light",
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(0 0% 3.9%)",

        primary: {
          DEFAULT: "hsl(0 0% 9%)",
          foreground: "hsl(0 0% 98%)",
        },

        secondary: {
          DEFAULT: "hsl(0 0% 96.1%)",
          foreground: "hsl(0 0% 9%)",
        },

        danger: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
        },

        content1: "hsl(0 0% 100%)",
        content2: "hsl(0 0% 96.1%)",
      },

      layout: {
        radius: {
          small: "0.5rem",
          medium: "0.5rem",
          large: "0.5rem",
        },
      },
    },
    "valentines-dark": {
      extend: "dark",
      colors: {
        background: "hsl(0 0% 3.9%)",
        foreground: "hsl(0 0% 98%)",

        primary: {
          DEFAULT: "hsl(0 0% 98%)",
          foreground: "hsl(0 0% 9%)",
        },

        secondary: {
          DEFAULT: "hsl(0 0% 14.9%)",
          foreground: "hsl(0 0% 98%)",
        },

        danger: {
          DEFAULT: "hsl(0 62.8% 30.6%)",
          foreground: "hsl(0 0% 98%)",
        },

        content1: "hsl(0 0% 3.9%)",
        content2: "hsl(0 0% 14.9%)",
      },
    }
  }
});
