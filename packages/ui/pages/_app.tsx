import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@material-ui/core";
import NextNProgress from "nextjs-progressbar";

const darkTheme = createTheme({
  // palette: {
  //   mode: "dark",
  // },
  palette: {
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NextNProgress color="#000" />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
