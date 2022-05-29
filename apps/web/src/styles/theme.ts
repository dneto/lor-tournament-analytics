import { createTheme, Theme } from "@mui/material";
import { pink } from "@mui/material/colors";

export const theme: Theme = createTheme({
  palette: {
    primary: pink,
  },
  typography: {
    fontFamily: `"Open Sans", sans-serif`,
    htmlFontSize: 15,
    h1: {
      fontFamily: `"Montserrat" ,sans-serif`,
      textTransform: "uppercase",
    },
    h5: {
      fontFamily: `"Montserrat" ,sans-serif`,
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: `"Montserrat" ,sans-serif`,
      textTransform: "uppercase",
    },
    h4: {
      fontFamily: `"Montserrat" ,sans-serif`,
      textTransform: "uppercase",
    },
  },
});
