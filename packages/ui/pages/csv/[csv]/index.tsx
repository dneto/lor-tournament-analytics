import * as React from "react";
import type { NextPage } from "next";
import {
  Container,
  Typography,
  Grid,
  TableCell,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Lineup,
  Tournament,
} from "@lor-tournament-analytics/lor-decks-analytics";

import {
  Deck,
  cardFromCode,
} from "@lor-tournament-analytics/lor-decks-data/lib";

import ChampionIcon from "../../../components/ChampionIcon";
import QtSlider from "../../../components/QtSlider";
import Image from "next/image";
import _ from "lodash";
import { useRouter } from "next/router";
import lzString from "lz-string";
import Header from "../../../components/Header";
import PagedTable from "../../../components/PagedTable";
import path from "path";
const Home: NextPage = () => {
  const [show, setShow] = React.useState<React.ReactElement>(<></>);

  const router = useRouter();
  const query = router.query;

  let reader: FileReader;

  function loadCSV(file: File) {
    const basename = path.parse(file.name).name;
    reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result!.toString();
      if (typeof result == "string") {
        const tournament = Tournament.fromCSV(result);
        setShow(
          <Box>
            <Grid container>
              <Grid item xs={4}>
                <Box paddingTop={0} padding={1}>
                  <ArchetypesGrid
                    records={tournament}
                    fileName={`${basename}_archetypes.csv`}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box paddingTop={0} padding={1}>
                  <ChampionsGrid
                    records={tournament}
                    fileName={`${basename}_champions.csv`}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box paddingTop={0} padding={1}>
                  <RegionsGrid
                    records={tournament}
                    fileName={`${basename}_regions.csv`}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box paddingTop={0} padding={1}>
                  <UniqueRegionGrid
                    records={tournament}
                    fileName={`${file.name}_unique_regions.csv`}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      }
    };
    reader.readAsText(file);
  }

  if (query.csv) {
    const base64CSV = String(query.csv);
    const csv = lzString.decompressFromEncodedURIComponent(base64CSV);
    if (csv != null) {
      const blob = new Blob([csv], { type: "text/csv" });
      const name = (query.filename as string) || "tournament.csv";
      loadCSV(new File([blob], name, { type: "text/csv" }));
    }
  }
  const darkTheme = createTheme({
    // palette: {
    //   mode: "dark",
    // },
    palette: {
      background: {
        default: "#000000",
      },
    },
    typography: {
      fontFamily: `"Open Sans", sans-serif`,
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
        {show}
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

interface IGridComp {
  records: Tournament;
  fileName: string;
}

const ArchetypesGrid: React.FC<IGridComp> = ({ records, fileName }) => {
  const data = records.lineups
    .map((l: Lineup) =>
      l.map((d: Deck) => {
        const champions = d.champions;
        const regions = d.regions;
        return { champions: champions, regions: regions };
      })
    )
    .flat();
  const count = Object.entries(
    _.groupBy(data, (d) => {
      const key = `${d.champions
        .map((c) => c.name)
        .sort()
        .join(",")},${d.regions
        .map((r) => r.shortName)
        .sort()
        .join(",")}`;
      return key;
    })
  ).map((e) => {
    const [key, group] = e;
    return {
      key: key,
      champions: group[0].champions,
      regions: group[0].regions,
      qtd: group.length,
      percent: (group.length / data.length) * 100,
    };
  });
  const maxPercent = Math.max(...count.map((c) => c.percent));

  const rows = _.sortBy(count, (r) => r.qtd).reverse();
  return (
    <PagedTable<typeof rows[0]>
      title="Archetypes"
      count={rows.length}
      rows={rows}
      maxPercent={maxPercent}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(r) => (
        <TableRow key={r.key}>
          <TableCell
            width={160}
            sx={{ padding: "6px 0 0 24px", verticalAlign: "middle" }}
          >
            {r.champions.map((c) => (
              <ChampionIcon
                key={`${c.cardCode}`}
                championCard={c}
                style={{ marginRight: 1, marginLeft: 1 }}
              />
            ))}
            {r.regions.map((reg) => (
              <div
                key={`${r.key}-${reg.code}-div`}
                style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  float: "left",
                }}
              >
                <Image
                  key={`${r.key}-${reg.code}-img`}
                  alt={reg.ref}
                  layout="fill"
                  objectFit="contain"
                  src={`/assets/imgs/regions/${reg?.code}.svg`}
                  style={{ paddingTop: "6px" }}
                />
              </div>
            ))}
          </TableCell>
          <TableCell>
            <QtSlider value={r.percent} max={maxPercent} />
          </TableCell>
          <TableCell align="right" width={"10"}>
            {r.qtd}
          </TableCell>
        </TableRow>
      )}
    />
  );
};

const ChampionsGrid: React.FC<IGridComp> = ({ records, fileName }) => {
  const data = records.lineups
    .map((l: Lineup) => l.map((d: Deck) => d.champions))
    .flat(2);

  const count = Object.entries(
    _.groupBy(data, (d) => {
      return d.name;
    })
  ).map((e) => {
    const [key, group] = e;
    return {
      key: key,
      champion: group[0],
      qtd: group.length,
      percent: (group.length / data.length) * 100,
    };
  });

  const maxPercent = Math.max(...count.map((c) => c.percent));
  const rows = _.sortBy(count, (r) => r.qtd).reverse();

  return (
    <PagedTable<typeof rows[0]>
      title="Champions"
      maxPercent={maxPercent}
      count={rows.length}
      rows={rows}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(r) => (
        <TableRow key={r.key}>
          <TableCell width={64}>
            <ChampionIcon championCard={cardFromCode(r.champion.cardCode)} />
          </TableCell>
          <TableCell>
            <QtSlider value={r.percent} max={maxPercent} />
          </TableCell>
          <TableCell align="right" width={"10"}>
            {r.qtd}
          </TableCell>
        </TableRow>
      )}
    />
  );
};

const UniqueRegionGrid: React.FC<IGridComp> = ({ records, fileName }) => {
  const data = records.lineups.map((l) => l.map((d) => d.regions)).flat(999);
  const dataGroup = _.groupBy(data, (r) => r.shortName);

  const count = Object.entries(dataGroup).map((e) => {
    const [key, group] = e;

    return {
      key: key,
      region: group[0],
      qtd: group.length,
      percent: (group.length / data.length) * 100,
    };
  });
  const maxPercent = Math.max(...count.map((c) => c.percent));

  const rows = _.sortBy(count, (c) => c.qtd).reverse();
  return (
    <PagedTable<typeof rows[0]>
      title="Region"
      count={rows.length}
      rows={rows}
      maxPercent={maxPercent}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(reg) => (
        <TableRow key={reg.key}>
          <TableCell width={80}>
            <div
              style={{
                position: "relative",
                width: 24,
                height: 24,
                float: "left",
              }}
            >
              <Image
                alt={reg.region.ref}
                layout="fill"
                objectFit="contain"
                src={`/assets/imgs/regions/${reg?.region?.code}.svg`}
                style={{ paddingTop: "6px" }}
              />
            </div>
          </TableCell>
          <TableCell>
            <QtSlider value={reg.percent} max={maxPercent} />
          </TableCell>
          <TableCell align="right" width={"10"}>
            {reg.qtd}
          </TableCell>
        </TableRow>
      )}
    />
  );
};

const RegionsGrid: React.FC<IGridComp> = ({ records, fileName }) => {
  const data = records.lineups.map((l) => l.map((d) => d.regions)).flat(1);
  const dataGroup = _.groupBy(data, (lrs) => {
    return lrs
      .map((r) => r.shortName)
      .sort()
      .join("/");
  });

  const count = Object.entries(dataGroup).map((e) => {
    const [key, group] = e;

    return {
      key: key,
      regions: group[0],
      qtd: group.length,
      percent: (group.length / data.length) * 100,
    };
  });
  const maxPercent = Math.max(...count.map((c) => c.percent));

  const rows = _.sortBy(count, (c) => c.qtd).reverse();
  return (
    <PagedTable<typeof rows[0]>
      title="Regions"
      count={rows.length}
      rows={rows}
      maxPercent={maxPercent}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(r) => (
        <TableRow key={r.key}>
          <TableCell width={80}>
            {r.regions.map((reg) => (
              <div
                key={`${r.key}-${reg.shortName}-div`}
                style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  float: "left",
                }}
              >
                <Image
                  alt={reg.ref}
                  layout="fill"
                  objectFit="contain"
                  src={`/assets/imgs/regions/${reg?.code}.svg`}
                  style={{ paddingTop: "6px" }}
                />
              </div>
            ))}
          </TableCell>
          <TableCell>
            <QtSlider value={r.percent} max={maxPercent} />
          </TableCell>
          <TableCell align="right" width={"10"}>
            {r.qtd}
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default Home;
