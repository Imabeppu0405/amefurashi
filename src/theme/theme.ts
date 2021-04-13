import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#A1D8E8",
        color: "white"
      }
    }
  },
  colors: {
    brand: {
      100: "#02A0DD",
      200: "#A1D8E8",
      300: "#F8A805",
      400: "#0D6E84"
    }
  }
});

export default theme;