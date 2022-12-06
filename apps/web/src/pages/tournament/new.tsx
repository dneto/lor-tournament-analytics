import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  FormHelperText,
} from "@mui/material";
import HTMLReactParser from "html-react-parser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import locales from "@/locales";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import FileUploader from "@/components/FileUploader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { useState } from "react";
const NewTournament: NextPage = () => {
  let reader: FileReader;
  const router = useRouter();
  let detectedLocale = router.locale || router.defaultLocale || "en-us";
  if (detectedLocale === "default") {
    detectedLocale = "en-us";
  }
  let locale = locales[detectedLocale];
  const [date, setDate] = useState<DateTime | null>(DateTime.now());
  const [title, setTitle] = useState<string | null>("");
  const [region, setRegion] = useState<string | null>("");
  function onFileSelect(fileFrom: File) {
    reader = new FileReader();
    reader.onloadend = () => {
      const csv = reader.result!.toString();
      fetch("/api/csv/create", {
        method: "POST",
        body: JSON.stringify({
          csv: csv,
          title: title,
          date: date?.toMillis(),
          region: region,
        }),
      })
        .then((result) => {
          if (result.status == 200) {
            result.text().then((slug) => router.push(`/tournament/${slug}`));
          } else {
          }
        })
        .catch(console.error);
    };
    reader.readAsText(fileFrom);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ padding: "15px 0px" }} elevation={0}>
          <Grid item>
            <Typography variant="h5" color={"primary"}>
              {locale.upload}
            </Typography>
            <Box component="form">
              <Box>
                <TextField
                  id="outlined-basic"
                  label={locale.title}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-basic"
                  label={locale.region}
                  value={region}
                  onChange={(event) => {
                    setRegion(event.target.value);
                  }}
                  variant="outlined"
                />
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateTimePicker
                    label={locale.tournamentDate}
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box padding="12px 5px">
              <Typography padding="5px 0" fontSize="0.9rem">
                {HTMLReactParser(locale.csvMustHave)}
              </Typography>
              <Typography padding="5px 0" fontSize="0.9rem">
                {locale.nonCodeWillBeDiscarded}
              </Typography>
              <Typography padding="5px 0" fontSize="0.9rem">
                {HTMLReactParser(locale.fileContentShouldBe)}
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
            <FileUploader onFileSelect={onFileSelect} locale={locale} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewTournament;
