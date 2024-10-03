// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: {
    base: "20em",     // Mobile Small (320px)
    sm: "23.4375em",  // Mobile Medium (375px)
    md: "26.5625em",  // Mobile Large (425px)
    lg: "48em",       // Tablet (768px)
    xl: "64em",       // Laptop (1024px)
    "2xl": "90em",    // Large Laptop (1440px)
    "3xl": "160em",   // 4K and larger screens (2560px)
  },
  // Add more custom theme configurations here (colors, fonts, etc.)
});

export default theme;
