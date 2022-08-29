import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ThemeProvider,
  Typography,
  Box,
  Container,
  PaletteMode,
  useMediaQuery,
} from "@mui/material";
import { createTheme, CssBaseline } from "@material-ui/core";
import NextNProgress from "nextjs-progressbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import useAckee from "use-ackee";
import Header from "@/components/Header";
config.autoAddCss = false;

import { darkTheme, lightTheme } from "@/styles/theme";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () => createTheme(prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          p: 2,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Header />
        <NextNProgress color="#000" />
        <Component {...pageProps} />
        <Box>
          <Typography sx={{ marginTop: "10px", fontSize: "0.7rem" }}>
            {`LoR Analytics isn't endorsed by Riot Games and doesn't reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing Riot Games properties. Riot Games, and all
            associated properties are trademarks or registered trademarks of
            Riot Games, Inc.`}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;
