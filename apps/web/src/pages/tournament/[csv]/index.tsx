import * as React from "react";

import type { NextPage } from "next";
import { Grid, Skeleton } from "@mui/material";
import { Box, minHeight } from "@mui/system";

import _ from "lodash";
import { useRouter } from "next/router";
import locales from "@/locales";
import loadTournamentFromID from "@/lib/load_tournament";
import TournamentTitle from "@/components/TournamentTitle";
import ArchetypesData from "@/components/data/ArchetypeData";
import ChampionsData from "@/components/data/ChampionsData";
import RegionsData from "@/components/data/RegionsData";
import RegionData from "@/components/data/RegionData";
import LineupData from "@/components/data/LineupData";
import CardsData from "@/components/data/CardsData";
import DeckPairData from "@/components/data/DeckPairData";
import { CardBGCard } from "@/components/CardBGCard";
import { cardFromCode } from "@lor-analytics/deck-utils/card";
import { Tournament } from "@lor-analytics/db";
import { ITournament } from "../../../../../../packages/db/src/models/tournament";
import Head from "next/head";

const Home: NextPage = () => {
  const [tournament, setTournament] = React.useState<ITournament>();

  const router = useRouter();
  const locale = locales[router.locale || "en-US"];
  const query = router.query;

  React.useEffect(() => {
    if (!tournament && router.isReady && query.csv) {
      const tournamentID: string = query.csv as string;
      loadTournamentFromID(tournamentID).then((tournament) => {
        setTournament(tournament);
      });
    }
  });

  return (
    <>
      {tournament ? (
        <Box>
          <Head>
            <title>{tournament.title}</title>
          </Head>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Box zIndex={15} padding="5px" alignSelf="end">
                <TournamentTitle tournament={tournament} />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box paddingTop={0} padding={1}>
                <ArchetypesData
                  locale={locale}
                  pageID={`${query.csv}`}
                  title={tournament.title}
                  data={tournament.archetypes}
                  rowsPerPage={5}
                  paginated
                  showFullScreenButton
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box paddingTop={0} padding={1}>
                <ChampionsData
                  locale={locale}
                  pageID={`${query.csv}`}
                  title={tournament.title}
                  data={tournament.champions}
                  rowsPerPage={5}
                  paginated
                  showFullScreenButton
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box paddingTop={0} padding={1}>
                <RegionsData
                  locale={locale}
                  pageID={`${query.csv}`}
                  title={tournament.title}
                  data={tournament.regionSet}
                  rowsPerPage={5}
                  paginated
                  showFullScreenButton
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box paddingTop={0} padding={1}>
                <RegionData
                  locale={locale}
                  pageID={`${query.csv}`}
                  title={tournament.title}
                  data={tournament.regionUnique}
                  rowsPerPage={5}
                  paginated
                  showFullScreenButton
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box paddingTop={0} padding={1}>
                <CardsData
                  locale={locale}
                  pageID={`${query.csv}`}
                  title={tournament.title}
                  data={tournament.cards}
                  rowsPerPage={9}
                  paginated
                  showFullScreenButton
                />
              </Box>
            </Grid>
            {tournament.deckpair && tournament.deckpair.length ? (
              <Grid item xs={12} md={12}>
                <DeckPairData
                  locale={locale}
                  pageID={`${query.csv}`}
                  title={tournament.title}
                  data={tournament.deckpair}
                  rowsPerPage={5}
                  paginated
                  showFullScreenButton
                />
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={12} md={12}>
              <LineupData
                locale={locale}
                pageID={`${query.csv}`}
                title={tournament.title}
                data={tournament.lineups}
                rowsPerPage={5}
                paginated
                showFullScreenButton
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box paddingTop={0} padding={1}>
                <Skeleton variant="rectangular" width="100%" height="400px" />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box paddingTop={0} padding={1}>
                <Skeleton variant="rectangular" width="100%" height="400px" />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box paddingTop={0} padding={1}>
                <Skeleton variant="rectangular" width="100%" height="400px" />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box paddingTop={0} padding={1}>
                <Skeleton variant="rectangular" width="100%" height="400px" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box paddingTop={0} padding={1}>
                <Skeleton variant="rectangular" width="100%" height="400px" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Home;
