import { TypographyOptions } from "@material-ui/core/styles/createTypography";
import { ThemeOptions } from "@mui/material";
import { orange, pink } from "@mui/material/colors";

const typographyOptions: TypographyOptions = {
  fontFamily: ['"Open Sans"', "sans-serif"].join(","),
  htmlFontSize: 15,
  h1: {
    fontFamily: `"Oswald" ,sans-serif`,
    textTransform: "uppercase",
    fontWeight: 600,
  },
  h5: {
    fontFamily: `"Oswald" ,sans-serif`,
    textTransform: "uppercase",
    fontWeight: 600,
  },
  h6: {
    fontFamily: `"Oswald" ,sans-serif`,
    textTransform: "uppercase",
    fontWeight: 700,
  },
  h4: {
    fontFamily: `"Oswald" ,sans-serif`,
    textTransform: "uppercase",
    fontWeight: 600,
  },
};

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: pink,
  },
  typography: { ...typographyOptions },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: orange,
    background: {
      default: "#121212",
    },
  },
  typography: { ...typographyOptions },
};
