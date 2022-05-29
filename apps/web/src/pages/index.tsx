import * as React from "react";
import type { GetStaticProps, NextPage } from "next";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Table,
  TableRow,
  TableCell,
  Paper,
  NoSsr,
  TableBody,
} from "@mui/material";
import FileUploader from "@/components/FileUploader";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import _ from "lodash";
import { useRouter } from "next/router";
import lzString from "lz-string";
import Header from "../components/Header";
import { getRecentTournaments, Tournament } from "lib/google_sheets";
import Link from "next/link";
import moment from "moment";
import "moment/locale/pt-br";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import locales, { ILocale } from "@/locales";
import htmlParse from "html-react-parser";

type Props = {
  tournaments: Tournament[];
  locale: ILocale;
  localeLang: string;
};

const Home: NextPage<Props> = (props: Props) => {
  let reader: FileReader;
  const router = useRouter();
  const localizedCalendar = (n: number): string => {
    return moment(n).locale(props.localeLang).calendar();
  };
  function onFileSelect(fileFrom: File) {
    reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result!.toString();
      const lzstring = lzString.compressToEncodedURIComponent(result);
      fetch("/api/csv/create", { method: "POST", body: lzstring }).then(
        (result) => {
          result.text().then((uuid) => router.push(`/csv/${uuid}`));
        }
      );
    };
    reader.readAsText(fileFrom);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          p: 2,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <Header />
        <Box>
          <Typography variant="h1">{props.locale.welcome} </Typography>
          <Typography variant="h1" color={"primary"}>
            LoR Analytics
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs>
            <Paper sx={{ padding: "15px 0px", height: "100%" }}>
              <Container>
                <Typography variant="h6" color={"primary"}>
                  {props.locale.latestTournaments}
                </Typography>
                {props.tournaments.map((t: Tournament) => (
                  <Table key={t.title}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Link href={t.url}>{t.title}</Link>
                        </TableCell>
                        <TableCell align="right">
                          <NoSsr>
                            <span>{localizedCalendar(t.timestamp)}</span>
                          </NoSsr>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ))}
              </Container>
            </Paper>
          </Grid>
          <Divider orientation="vertical" flexItem>
            {props.locale.or}
          </Divider>
          <Grid item xs={6}>
            <Paper sx={{ padding: "15px 0px", height: "100%" }}>
              <Container>
                <Grid item>
                  <Typography variant="h6" color={"primary"}>
                    {props.locale.upload}
                  </Typography>
                  <p>{htmlParse(props.locale.csvMustHave)}</p>
                  <p>{props.locale.nonCodeWillBeDiscarded}</p>
                  {htmlParse(props.locale.fileContentShouldBe)}
                  <Box width="100%">
                    <SyntaxHighlighter style={materialLight} language="csv">
                      {[
                        [
                          "player#tag",
                          "CIDQCAYABYAQIAACAECQMAICAIDBMPQCAIAAMCQCAUAAUDADAEAAMCI5AEAQEAAHAIAQCABTAECQAF",
                          "CMBQCBIEBQCAIBABAICAOBQEA4ARYJ2NJ5JQCAYEA45W3CQBAEAQIB2S",
                          "CECQCAIDCQAQGBASAECAIEACAUBQSDIEAECCMJZNGQCACAIDAIAQCBABAEBAICABAUBQMAYBAMBQ6AIDAQBQGAIDBMXDG",
                        ].join(","),
                        [
                          "player#tag",
                          "CIDQCAYABYAQIAACAECQMAICAIDBMPQCAIAAMCQCAUAAUDADAEAAMCI5AEAQEAAHAIAQCABTAECQAF",
                          "CMBQCBIEBQCAIBABAICAOBQEA4ARYJ2NJ5JQCAYEA45W3CQBAEAQIB2S",
                          "CECQCAIDCQAQGBASAECAIEACAUBQSDIEAECCMJZNGQCACAIDAIAQCBABAEBAICABAUBQMAYBAMBQ6AIDAQBQGAIDBMXDG",
                        ].join(","),
                        [
                          "player#tag",
                          "CIDQCAYABYAQIAACAECQMAICAIDBMPQCAIAAMCQCAUAAUDADAEAAMCI5AEAQEAAHAIAQCABTAECQAF",
                          "CMBQCBIEBQCAIBABAICAOBQEA4ARYJ2NJ5JQCAYEA45W3CQBAEAQIB2S",
                          "CECQCAIDCQAQGBASAECAIEACAUBQSDIEAECCMJZNGQCACAIDAIAQCBABAEBAICABAUBQMAYBAMBQ6AIDAQBQGAIDBMXDG",
                        ].join(","),
                        [
                          "player#tag",
                          "CIDQCAYABYAQIAACAECQMAICAIDBMPQCAIAAMCQCAUAAUDADAEAAMCI5AEAQEAAHAIAQCABTAECQAF",
                          "CMBQCBIEBQCAIBABAICAOBQEA4ARYJ2NJ5JQCAYEA45W3CQBAEAQIB2S",
                          "CECQCAIDCQAQGBASAECAIEACAUBQSDIEAECCMJZNGQCACAIDAIAQCBABAEBAICABAUBQMAYBAMBQ6AIDAQBQGAIDBMXDG",
                        ].join(","),
                        "...",
                      ].join("\n")}
                    </SyntaxHighlighter>
                  </Box>
                </Grid>
                <Grid item textAlign="right">
                  <FileUploader
                    onFileSelect={onFileSelect}
                    locale={props.locale}
                  />
                </Grid>
              </Container>
            </Paper>
          </Grid>
        </Grid>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const locale: string = context.locale!;
  let tournaments: Tournament[] | undefined = await getRecentTournaments();
  tournaments = tournaments?.sort((a, b) => b.timestamp - a.timestamp);
  return {
    props: {
      tournaments: tournaments,
      locale: locales[locale],
      localeLang: locale,
    },
    revalidate: 1,
  };
};
