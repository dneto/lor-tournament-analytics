import { ThemeOptions } from "@material-ui/core";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";
import { orange, pink } from "@mui/material/colors";

const typographyOptions: TypographyOptions = {
  fontFamily: ['"Open Sans"', "sans-serif"].join(","),
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
};

export const lightTheme: ThemeOptions = {
  palette: {
    type: "light",
    primary: pink,
  },
  typography: { ...typographyOptions },
};

export const darkTheme: ThemeOptions = {
  palette: {
    type: "dark",
    primary: orange,
    background: {
      default: "#121212",
    },
  },
  typography: { ...typographyOptions },
};
