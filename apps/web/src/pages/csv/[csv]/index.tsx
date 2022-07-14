import * as React from "react";

import QtSlider from "@/components/QtSlider";
import type { NextPage } from "next";
import { Container, Typography, Grid, Skeleton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import Head from "next/head";
import {
  Deck,
  cardFromCode,
  Card,
  Region,
  cardFromCodeLocale,
} from "@lor-analytics/deck-utils";
import { Lineup, Tournament } from "@lor-analytics/data-extractor";

import { ChampionIcon, RegionIcon } from "../../../components/icons/Icons";
import _ from "lodash";
import { useRouter } from "next/router";
import lzString from "lz-string";
import Header from "@/components/Header";
import PagedTable from "@/components/PagedTable";
import path from "path";
import locales, { ILocale } from "@/locales";
import Image from "next/image";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
const Home: NextPage = () => {
  const [tournament, setTournament] = React.useState<Tournament>();
  const [title, setTitle] = React.useState<string>();
  const [logo, setLogo] = React.useState<string>();

  const router = useRouter();
  const locale = locales[router.locale || "en-US"];
  const query = router.query;
  let basename = "";
  let reader: FileReader;
  let fileName: string;

  function loadCSV(file: File) {
    fileName = file.name;
    basename = path.parse(fileName).name;
    reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (result != null) {
        const tournament = Tournament.fromCSV(result.toString());
        setTournament(tournament);
      }
    };
    reader.readAsText(file);
  }

  React.useEffect(() => {
    if (!tournament && query.csv) {
      fetch(`/api/csv/${query.csv}`, { method: "GET" }).then((resp) => {
        resp.json().then((respJson) => {
          setTitle(respJson.title);
          setLogo(respJson.logoURL);
          const csv = lzString.decompressFromEncodedURIComponent(respJson.data);
          if (csv != null) {
            const blob = new Blob([csv], { type: "text/csv" });
            const name = (query.filename as string) || "tournament.csv";
            loadCSV(new File([blob], name, { type: "text/csv" }));
          }
        });
      });
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{
          p: 2,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <Header />
        {tournament ? (
          <Box>
            <Grid container>
              <Grid item>
                <Box
                  paddingTop={0}
                  padding={1}
                  sx={{ justifyContent: "center", alignContent: "center" }}
                >
                  {logo ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                      }}
                      width="32px"
                      height="32px"
                    >
                      <img
                        src={logo}
                        style={{objectFit:"cover", width:"32px", height:"32px", borderRadius:"5px"}}
                      ></img>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                      }}
                      width="32px"
                      height="32px"
                      bgcolor="#111213"
                    >
                      <EmojiEventsIcon
                        style={{
                          width: "24px",
                          height: "24px",
                          fill: "#fafafa",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={11} md={11}>
                <Box paddingTop={0} padding={1}>
                  <Typography variant="h6">{title}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box paddingTop={0} padding={1}>
                  <ArchetypesGrid
                    records={tournament}
                    fileName={`${basename}_archetypes.csv`}
                    locale={locale}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box paddingTop={0} padding={1}>
                  <ChampionsGrid
                    records={tournament}
                    fileName={`${basename}_champions.csv`}
                    locale={locale}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box paddingTop={0} padding={1}>
                  <RegionsGrid
                    records={tournament}
                    fileName={`${basename}_regions.csv`}
                    locale={locale}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box paddingTop={0} padding={1}>
                  <UniqueRegionGrid
                    records={tournament}
                    fileName={`${basename}_unique_regions.csv`}
                    locale={locale}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box paddingTop={0} padding={1}>
                  <CardsGrid
                    records={tournament}
                    fileName={`${basename}_cards.csv`}
                    locale={locale}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box paddingTop={0} padding={1}>
                  <LineupsGrid
                    records={tournament}
                    fileName={`${basename}_lineups.csv`}
                    locale={locale}
                  />
                </Box>
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
  locale: ILocale;
}

const ArchetypesGrid: React.FC<IGridComp> = ({ records, fileName, locale }) => {
  type dataType = { champions: Card[]; regions: Region[] };
  const data: dataType[] = records.lineups
    .map((lineup: Lineup) =>
      lineup.map((d: Deck) => {
        const champions = d.champions;
        const regions = d.regions;
        return { champions: champions, regions: regions };
      })
    )
    .flat();
  const count = Object.entries(
    _.groupBy(data, (d: dataType) => {
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
      title={locale.archetype}
      count={rows.length}
      rows={rows}
      maxPercent={maxPercent}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(r) => (
        <>
          <Grid
            key={`${r.key}-images`}
            item
            xs={12}
            sx={{ marginBottom: "-5px" }}
          >
            {r.champions.map((c) => (
              <ChampionIcon
                key={`${c.cardCode}`}
                championCard={c}
                style={{ ...imgStyle }}
              />
            ))}
            {r.regions.map((reg) => (
              <RegionIcon region={reg} style={{ ...imgStyle }} />
            ))}
          </Grid>
          <Grid
            key={`${r.key}-slider`}
            item
            xs={12}
            sx={{ marginBottom: "5px" }}
          >
            <QtSlider value={r.percent} max={maxPercent} textValue={r.qtd} />
          </Grid>
        </>
      )}
    />
  );
};

const ChampionsGrid: React.FC<IGridComp> = ({ records, fileName, locale }) => {
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
      title={locale.champions}
      maxPercent={maxPercent}
      count={rows.length}
      rows={rows}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(r) => (
        <>
          <Grid item xs={12} sx={{ marginBottom: "-5px" }}>
            <ChampionIcon
              championCard={cardFromCode(r.champion.cardCode)}
              style={{ ...imgStyle }}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "5px" }}>
            <QtSlider value={r.percent} max={maxPercent} textValue={r.qtd} />
          </Grid>
        </>
      )}
    />
  );
};

const imgStyle: React.CSSProperties = {
  marginLeft: "2px",
  marginRight: "2px",
};

const UniqueRegionGrid: React.FC<IGridComp> = ({
  records,
  fileName,
  locale,
}) => {
  const data = records.lineups
    .map((l: Lineup) => l.map((d: Deck) => d.regions))
    .flat(999);
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
      title={locale.region}
      count={rows.length}
      rows={rows}
      maxPercent={maxPercent}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(r) => (
        <>
          <Grid item xs={12} sx={{ marginBottom: "-5px" }}>
            <RegionIcon region={r.region} style={{ ...imgStyle }} />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "5px" }}>
            <QtSlider value={r.percent} max={maxPercent} textValue={r.qtd} />
          </Grid>
        </>
      )}
    />
  );
};

const RegionsGrid: React.FC<IGridComp> = ({ records, fileName, locale }) => {
  const data: Region[][] = records.lineups
    .map((l: Lineup) => l.map((d: Deck) => d.regions))
    .flat(1);

  const dataGroup = _.groupBy(data, (regions: Region[]) => {
    return regions
      .map((region: Region) => region.shortName)
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
      title={locale.regions}
      count={rows.length}
      rows={rows}
      maxPercent={maxPercent}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(r) => (
        <>
          <Grid item xs={12} sx={{ marginBottom: "-5px" }}>
            {r.regions.map((region) => (
              <RegionIcon region={region} style={{ ...imgStyle }} />
            ))}
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "5px" }}>
            <QtSlider value={r.percent} max={maxPercent} textValue={r.qtd} />
          </Grid>
        </>
      )}
    />
  );
};

const LineupsGrid: React.FC<IGridComp> = ({ records, fileName, locale }) => {
  const data: Lineup[] = records.lineups;
  const dataGroup = _.groupBy(data, (lineup) => {
    return lineup
      .map((d: Deck) => {
        const key = `${d.champions
          .map((c) => c.name)
          .sort()
          .join("/")}[${d.regions
          .map((r) => r.shortName)
          .sort()
          .join("/")}]`;
        return key;
      })
      .sort()
      .join(";");
  });

  const count = Object.entries(dataGroup).map((e) => {
    const [key, group] = e;

    return {
      key: key,
      lineup: group[0],
      qtd: group.length,
      percent: (group.length / data.length) * 100,
    };
  });
  const maxPercent = Math.max(...count.map((c) => c.percent));

  const rows = _.sortBy(count, (c) => c.qtd).reverse();
  return (
    <PagedTable<typeof rows[0]>
      title={locale.lineups}
      count={rows.length}
      rows={rows}
      maxPercent={maxPercent}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.key, String(r.qtd)];
      }}
      render={(r) => (
        <>
          <Grid item xs={12} marginBottom="-10px">
            <Box sx={{ width: "100%" }}>
              {r.lineup.map((deck: Deck) => (
                <>
                  <Box
                    component="div"
                    sx={{
                      height: "42px",
                      marginRight: "30px",
                      display: "inline-block",
                      borderBottom: "5px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    {deck.champions.map((c) => (
                      <ChampionIcon
                        championCard={cardFromCode(c.cardCode)}
                        style={{ ...imgStyle }}
                      />
                    ))}
                    {deck.regions.map((r) => (
                      <RegionIcon region={r} style={{ ...imgStyle }} />
                    ))}
                  </Box>
                </>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "5px" }}>
            <QtSlider value={r.percent} max={maxPercent} textValue={r.qtd} />
          </Grid>
        </>
      )}
    />
  );
};

const CardsGrid: React.FC<IGridComp> = ({ records, fileName, locale }) => {
  const dataGroup = records.lineups
    .map((lineup) => lineup.map((deck) => deck.cardEntries))
    .reduce((prev: Record<string, number>, curr) => {
      curr.forEach((ces) =>
        ces.forEach((ce) => {
          prev[ce.card.cardCode] =
            prev[ce.card.cardCode] + ce.count || ce.count;
        })
      );
      return prev;
    }, {});

  const count = Object.entries(dataGroup).map((e) => {
    const [card, count] = e;

    console.log(locale.locale);

    return {
      key: card,
      card: cardFromCodeLocale(card, locale.locale),
      qtd: count,
    };
  });

  const rows = _.sortBy(count, (c) => c.qtd).reverse();
  return (
    <PagedTable<typeof rows[0]>
      title={locale.cards}
      count={rows.length}
      rows={rows}
      rowsPerPage={9}
      maxPercent={0}
      csvFilename={fileName}
      csvParser={(r) => {
        return [r.card.name, String(r.qtd)];
      }}
      render={(r) => (
        <>
          <Grid item xs={10} sx={{ marginBottom: "-5px" }}>
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#ffffff00",
                  },
                },
              }}
              title={
                <Image
                  src={r.card.assets[0].gameAbsolutePath}
                  width="250px"
                  height="376px"
                />
              }
            >
              <Typography variant="h6">{r.card.name}</Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={2} sx={{ marginBottom: "5px" }}>
            <Typography variant="h6">{r.qtd}</Typography>
          </Grid>
        </>
      )}
    />
  );
};

export default Home;
