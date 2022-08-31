import type { GetStaticProps, NextPage } from "next";
import {
  Container,
  Typography,
  Grid,
  Table,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { getTournaments, Tournament } from "lib/google_sheets";
import locales, { ILocale } from "@/locales";
import ShardPill from "@/components/ShardPill";
import { DateTime } from "luxon";

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
      .toRelativeCalendar()!;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ padding: "15px 0px" }}>
          <Container>
            <Typography variant="h5" color={"primary"}>
              {props.locale.tournaments}
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
                      {t.region ? <ShardPill shard={t.region} /> : <></>}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "inherit",
                        border: "0",
                        padding: "12px 8px",
                      }}
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
    </Grid>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale: string = context.locale || context.defaultLocale || "en-US";
  let tournaments: Tournament[] | undefined = await getTournaments(
    "Worldwalker"
  );
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
