import { Primary, Secondary, White } from "@/public/constants/color.constant";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Kanit",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "48px",
    },
    h2: {
      fontSize: "38px",
    },
    h3: {
      fontSize: "24px",
    },
    body1: {
      fontSize: "18px",
    },
    body2: {
      fontSize: "16px",
    },
    caption: {
      fontSize: "16px",
    },
  },
  spacing: 8,
  palette: {
    background: {
      default: White,
    },
    primary: {
      main: Primary,
    },
    secondary: {
      main: Secondary,
    },
  },
});
