import type { GetStaticProps, NextPage } from "next";
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

import Link from "next/link";

type Props = {
  tournaments: Tournament[];
  locale: ILocale;
  localeLang: string;
};

const Home: NextPage<Props> = (props: Props) => {
  const theme = useTheme();
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {props.locale.checkoutWorldwalker && (
          <Link
            href={"/worldwalker"}
            style={{ color: theme.palette.text.primary, cursor: "pointer" }}
          >
            <Alert severity="info">{props.locale.checkoutWorldwalker}</Alert>
          </Link>
        )}
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ padding: "15px 0px" }}>
          <Container>
            <Typography variant="h5" color={"primary"}>
              {props.locale.latestTournaments}
            </Typography>
            {props.tournaments.map((t: Tournament) => (
              <Table key={t.title}>
                <TableBody>
                  <TableRow
                    onClick={() => router.push(t.url)}
                    sx={{
                      "&:hover": {
                        background: theme.palette.primary.main,
                        color: "#fff",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "inherit",
                        border: "0",
                        padding: "12px 8px",
                      }}
                    >
                      <Typography component="span">{t.title} </Typography>
                      {t.region ? (
                        <ShardPill shard={t.region} color="black" />
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "inherit",
                        border: "0",
                        padding: "12px 8px",
                      }}
                      align="right"
                    >
                      <Typography>{localizedCalendar(t.timestamp)}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </Container>
        </Paper>
      </Grid>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const locale: string = context.locale || context.defaultLocale || "en-US";
  let tournaments: Tournament[] | undefined = await getTournaments("Latest");
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
