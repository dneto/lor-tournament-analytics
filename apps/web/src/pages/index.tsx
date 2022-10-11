import type { NextPage } from "next";
import {
  Typography,
  Box,
  Grid,
  Chip,
  Stack,
  Button,
  Skeleton,
} from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import locales, { ILocale } from "@/locales";
import ShardPill from "@/components/ShardPill";
import { DateTime } from "luxon";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

import Link from "next/link";
import { CardBGCard } from "@/components/CardBGCard";
import { cardFromCode } from "@lor-analytics/deck-utils/card";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ITournament } from "@lor-analytics/db/models/tournament";
const Home: NextPage = () => {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<ITournament[] | null>();

  const [season, setSeason] = useState<string>("Awakening");

  const localeLang: string = router.locale || router.defaultLocale || "en-US";
  const locale: ILocale = locales[localeLang];

  const localizedCalendar = (date: Date): string => {
    let calendar = "iso8601";
    if (localeLang === "th-th") {
      calendar = "buddhist";
    }
    return DateTime.fromJSDate(new Date(date))
      .reconfigure({ outputCalendar: calendar })
      .setLocale(localeLang)
      .toFormat(locale.dateFormat)!;
  };

  const fetchHome = async (season: string) => {
    setSeason(season);
    setTournaments(null);
    const resp = await fetch(`/api/home/?season=${season}`);
    const json = await resp.json();
    const homeEntries: ITournament[] = json;
    setTournaments(homeEntries);
  };

  useEffect(() => {
    if (!tournaments) {
      fetchHome("Awakening").catch(console.error);
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} alignContent="center">
        <Typography variant="h5" fontWeight="600" mb={"10px"}>
          {locale.tournaments}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link href="/tournament/new">
          <Button>
            <Add fontSize="small" />
            {locale.upload}
          </Button>
        </Link>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item display="flex">
            <Typography
              textTransform="capitalize"
              sx={{ alignSelf: "center", fontSize: "0.9rem" }}
              fontWeight="600"
            >
              {locale.season}:
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1} sx={{ fontWeight: "500" }}>
              {[
                "Domination",
                "Awakening",
                "ForcesFromBeyond",
                "Worldwalker",
              ].map((s) => {
                type k = keyof typeof locale;
                const ks = `set${s}` as k;
                return (
                  <Chip
                    key={s}
                    size="small"
                    label={locale[ks]}
                    color={season == s ? "primary" : "default"}
                    variant={season == s ? "filled" : "outlined"}
                    onClick={() => {
                      fetchHome(s);
                    }}
                  />
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      {tournaments ? (
        tournaments.map((entry: ITournament) => (
          <Grid item lg={3} sm={6} xs={12}>
            <Link href={`/tournament/${entry.slug}`} passHref>
              <a style={{ color: "inherit", textDecoration: "inherit" }}>
                <CardBGCard
                  card={
                    (entry.background_card_code &&
                      cardFromCode(entry.background_card_code)) ||
                    null
                  }
                >
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
                        {entry.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sx={{ alignSelf: "center" }}>
                      <ShardPill shard={`${entry.region}`} />
                    </Grid>
                    <Grid
                      item
                      xs
                      sx={{ textAlign: "end", alignSelf: "center" }}
                    >
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
                          {localizedCalendar(entry.datetime)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardBGCard>
              </a>
            </Link>
          </Grid>
        ))
      ) : (
        <>
          <Grid item lg={3} sm={6} xs={12}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="168px"
              sx={{ borderRadius: "5px" }}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="168px"
              sx={{ borderRadius: "5px" }}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="168px"
              sx={{ borderRadius: "5px" }}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="168px"
              sx={{ borderRadius: "5px" }}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Home;
