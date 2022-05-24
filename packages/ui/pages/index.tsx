import * as React from "react";
import type { NextPage } from "next";
import { Container, Typography, Box } from "@mui/material";
import FileUploader from "../components/FileUploader";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import _ from "lodash";
import { useRouter } from "next/router";
import lzString from "lz-string";
import Header from "../components/Header";

const Home: NextPage = () => {
  let reader: FileReader;
  const router = useRouter();
  function onFileSelect(fileFrom: File) {
    reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result!.toString();
      const lzstring = lzString.compressToEncodedURIComponent(result);

      router.push(`/csv/${lzstring}?filename=${fileFrom.name}`);
    };
    reader.readAsText(fileFrom);
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: `"Open Sans", sans-serif`,
      h1: {
        fontFamily: `"Montserrat" ,sans-serif`,
        textTransform: "uppercase",
      },
      h6: {
        fontFamily: `"Montserrat" ,sans-serif`,
        textTransform: "uppercase",
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        maxWidth="lg"
        sx={{
          p: 2,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <Header />
        <Typography variant="h1">Welcome to </Typography>
        <Typography variant="h1" color={"secondary"}>
          LoR Analytics
        </Typography>
        A place where you can extract data for your tournaments, like:
        <ul>
          <li>Archetypes</li>
          <li>Number of decks containing a champion</li>
          <li>Number of decks containing a region combination</li>
          <li>Number of decks containing a singular region</li>
        </ul>
        <Typography>
          All you need is a CSV file containing the <b>deck codes</b> (URL from
          other sites are not supported by now).
        </Typography>
        <FileUploader onFileSelect={onFileSelect} />
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
};

export default Home;
