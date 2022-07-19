import * as React from "react";

import type { NextPage } from "next";
import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { Tournament } from "@lor-analytics/data-extractor";

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

const Home: NextPage = () => {
  const [tournament, setTournament] = React.useState<Tournament>();

  const router = useRouter();
  const locale = locales[router.locale || "en-US"];
  const query = router.query;

  React.useEffect(() => {
    if (!tournament && router.isReady && query.csv) {
      const range = (query.range as string) || "Latest";
      const tournamentID: string = query.csv as string;
      const filename = query.filename as string;
      loadTournamentFromID(tournamentID, range, filename).then(
        (tournament: Tournament) => {
          setTournament(tournament);
        }
      );
    }
  });

  return (
    <>
      {tournament ? (
        <Box>
          <Grid container>
            <Grid item xs={12} md={12}>
              <TournamentTitle tournament={tournament} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box paddingTop={0} padding={1}>
                <ArchetypesData
                  locale={locale}
                  pageID={`${query.csv}`}
                  tournament={tournament}
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
                  tournament={tournament}
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
                  tournament={tournament}
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
                  tournament={tournament}
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
                  tournament={tournament}
                  rowsPerPage={5}
                  paginated
                  showFullScreenButton
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <LineupData
                locale={locale}
                pageID={`${query.csv}`}
                tournament={tournament}
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
