import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ThemeProvider,
  Typography,
  Box,
  Container,
  createTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import NextNProgress from "nextjs-progressbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Header";
import * as React from "react";

import { darkTheme, lightTheme } from "@/styles/theme";
import { useLocalStorage } from "usehooks-ts";

config.autoAddCss = false;

export const ThemeContext = React.createContext({ toggleTheme: () => {} });

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const isDarkOS = useMediaQuery("(prefers-color-scheme: dark)");
  const [colorMode, setColorMode] = useLocalStorage<"light" | "dark">(
    "themeMode",
    isDarkOS ? "dark" : "light"
  );

  const themeMode = {
    toggleTheme: () => {
      setColorMode(colorMode === "light" ? "dark" : "light");
      setMode(mode === "light" ? "dark" : "light");
    },
  };

  React.useEffect(() => {
    setMode(colorMode);
  });

  const theme = createTheme(mode === "light" ? lightTheme : darkTheme);

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="xl"
          sx={{
            p: 2,
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Header />
          <NextNProgress color={theme.palette.text.primary} />
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
    </ThemeContext.Provider>
  );
}

export default MyApp;
