import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@material-ui/core";
import NextNProgress from "nextjs-progressbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import useAckee from "use-ackee";
import { useEffect } from "react";
config.autoAddCss = false;

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (process.env.ACKEE_SERVER && process.env.ACKEE_DOMAIN_ID) {
    useAckee(
      router.asPath,
      {
        server: process.env.ACKEE_SERVER,
        domainId: process.env.ACKEE_DOMAIN_ID,
      },
      {}
    );
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NextNProgress color="#000" />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
