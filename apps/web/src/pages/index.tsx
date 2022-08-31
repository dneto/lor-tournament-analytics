import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import {
  Container,
  Typography,
  Box,
  Grid,
  Table,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Alert,
  useTheme,
  Chip,
  Stack,
} from "@mui/material";
import FileUploader from "@/components/FileUploader";
import { makeStyles } from "@mui/styles";
import _ from "lodash";
import { useRouter } from "next/router";
import lzString from "lz-string";
import { getTournaments, Tournament } from "lib/google_sheets";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import locales, { ILocale } from "@/locales";
import htmlParse from "html-react-parser";
import ShardPill from "@/components/ShardPill";
import { DateTime } from "luxon";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

import Link from "next/link";
import { CardBGCard } from "@/components/CardBGCard";
import { cardFromCode } from "@lor-analytics/deck-utils/card";
import { useState } from "react";

type Props = {
  tournaments: Tournament[];
  locale: ILocale;
  localeLang: string;
  season: string;
};

const Home: NextPage<Props> = (props: Props) => {
  let reader: FileReader;
  const router = useRouter();
  const localizedCalendar = (n: number): string => {
    return DateTime.fromMillis(n)
      .setLocale(props.localeLang)
      .toFormat(props.locale.dateFormat)!;
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
    <Grid container spacing={3}>
      <Grid item xs={12} alignContent="center">
        <Typography variant="h5" fontWeight="600" mb={"10px"}>
          {props.locale.tournaments}
        </Typography>
        <Grid container spacing={1}>
          <Grid item display="flex">
            <Typography
              textTransform="capitalize"
              sx={{ alignSelf: "center", fontSize: "0.9rem" }}
              fontWeight="600"
            >
              {props.locale.season}:
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1} sx={{ fontWeight: "500" }}>
              <Link href={"/"}>
                <Chip
                  size="small"
                  label={props.locale.setAwakening}
                  color={props.season == "Latest" ? "primary" : "default"}
                  variant={props.season == "Latest" ? "filled" : "outlined"}
                />
              </Link>
              <Link href={"/?season=ForcesFromBeyond"}>
                <Chip
                  size="small"
                  label={props.locale.setForcesFromBeyond}
                  color={
                    props.season == "ForcesFromBeyond" ? "primary" : "default"
                  }
                  variant={
                    props.season == "ForcesFromBeyond" ? "filled" : "outlined"
                  }
                />
              </Link>
              <Link href={"/?season=Worldwalker"}>
                <Chip
                  size="small"
                  label={props.locale.setWorldwalker}
                  color={props.season == "Worldwalker" ? "primary" : "default"}
                  variant={
                    props.season == "Worldwalker" ? "filled" : "outlined"
                  }
                />
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      {props.tournaments.map((t: Tournament) => (
        <Grid item lg={3} sm={6} xs={12}>
          <Link href={t.url} passHref>
            <a style={{ color: "inherit", textDecoration: "inherit" }}>
              <CardBGCard card={(t.card && cardFromCode(t.card)) || null}>
                <Grid
                  container
                  sx={{ zIndex: 15, alignSelf: "flex-end", padding: "1rem" }}
                >
                  <Grid item xs={12}>
                    <Typography
                      className="tournamentTitle"
                      sx={{
                        wordBreak: "break-word",
                        marginBottom: "0.5rem",
                        fontFamily: '"Oswald", sans-serif',
                        fontWeight: "700",
                        fontSize: "1.15rem",
                      }}
                    >
                      {t.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sx={{ alignSelf: "center" }}>
                    <ShardPill shard={`${t.region}`} />
                  </Grid>
                  <Grid item xs sx={{ textAlign: "end", alignSelf: "center" }}>
                    <Box
                      sx={{
                        textAlign: "right",
                        alignContent: "center",
                        alignSelf: "center",
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <CalendarMonthSharpIcon
                        sx={{ fontSize: "1.2rem", alignSelf: "center" }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          alignSelf: "center",
                          paddingLeft: "2px",
                          textTransform: "uppercase",
                          fontWeight: "600",
                        }}
                      >
                        {localizedCalendar(t.timestamp)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardBGCard>
            </a>
          </Link>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Paper sx={{ padding: "15px 0px" }}>
          <Container>
            <Grid item>
              <Typography variant="h5" color={"primary"}>
                {props.locale.upload}
              </Typography>
              <Box padding="12px 5px">
                <Typography padding="5px 0">
                  {htmlParse(props.locale.csvMustHave)}
                </Typography>
                <Typography padding="5px 0">
                  {props.locale.nonCodeWillBeDiscarded}
                </Typography>
                <Typography padding="5px 0">
                  {htmlParse(props.locale.fileContentShouldBe)}
                </Typography>
              </Box>
              <Box>
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
              <FileUploader onFileSelect={onFileSelect} locale={props.locale} />
            </Grid>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale: string = context.locale || context.defaultLocale || "en-US";
  const { season } = context.query;
  let tournaments: Tournament[] | undefined = await getTournaments(
    (season as string) || "Latest"
  );
  tournaments = tournaments?.sort((a, b) => b.timestamp - a.timestamp);
  return {
    props: {
      tournaments: tournaments,
      locale: locales[locale],
      localeLang: locale,
      season: season || "Latest",
    },
  };
};
