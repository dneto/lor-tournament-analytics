import { Deck, Region } from "@lor-analytics/deck-utils";
import { parse } from "csv-parse/sync";
import _ from "lodash";
export type Lineup = [Deck, Deck, Deck];
export type Pair = [Deck, Deck];
export type Archetype = {
  regions: string[];
  championsCode: string[];
};

type archetypeCount = {
  archetype: Archetype;
  qty: number;
  percent: number;
};

type championCount = {
  championCode: string;
  qty: number;
  percent: number;
};

type regionSetCount = {
  regions: string[];
  qty: number;
  percent: number;
};

type regionCount = {
  region: string;
  qty: number;
  percent: number;
};

type cardCount = {
  cardCode: string;
  qty: number;
  percent: number;
};

type lineupCount = {
  archetypes: Archetype[];
  qty: number;
  percent: number;
};
export class Tournament {
  readonly lineups: Lineup[];
  title: string = "";
  logoURL: string = "";
  cardImage: string = "";
  region: string = "";
  startDate: Date = new Date();
  season: string = "";
  archetypes!: archetypeCount[];

  champions!: championCount[];

  regionSet!: regionSetCount[];

  regions!: regionCount[];
  cardCount!: cardCount[];

  lineupCount!: lineupCount[];
  pairsCount!: lineupCount[];

  constructor(lineups: Lineup[]) {
    this.lineups = lineups;
  }

  static fromCSV(csvData: string | Buffer): Tournament {
    const records = parse(csvData);
    const lineup = records
      .map(
        (r: string[]) =>
          r
            .map((code: string) => {
              try {
                const d = new Deck(code);
                return new Deck(code);
              } catch (e) {
                console.warn(code, e);
                return undefined;
              }
            })
            .filter(Boolean) as Lineup
      )
      .filter((l: Lineup[]) => l.length > 0);

    const tournament = new Tournament(lineup);
    tournament.archetypes = buildArchetypesCount(tournament);
    tournament.champions = buildChampionsCount(tournament);
    tournament.regionSet = buildRegionSetCount(tournament);
    tournament.regions = buildRegionCount(tournament);
    tournament.cardCount = buildCardCount(tournament);
    tournament.lineupCount = buildLineupCount(tournament);
    tournament.pairsCount = buildDeckPairCount(tournament);

    return tournament;
  }

  countBy(
    fn: (lineup: Lineup) => any,
    flatDepth: number = 1
  ): [string, number][] {
    const lineups = this.lineups.map(fn).flat(flatDepth).sort();
    return Object.entries(_.countBy(lineups)).sort((a, b) => b[1] - a[1]);
  }
}

const buildArchetypesCount = (tournament: Tournament): archetypeCount[] => {
  const data: Deck[] = tournament.lineups
    .map((lineup: Lineup) => lineup.map((deck) => deck))
    .flat();
  const count: archetypeCount[] = Object.entries(
    _.groupBy(data, (d: Deck) => {
      const key = `${d.archetype
        .map((c) => c.name)
        .sort()
        .join(",")},${d.regions
        .map((r) => r.shortName)
        .sort()
        .join(",")}`;
      return key;
    })
  ).map((e) => {
    const [_, group] = e;
    return {
      archetype: {
        championsCode: group[0].archetype.map((c) => c.cardCode),
        regions: group[0].regions.map((r) => r.shortName),
      },
      qty: group.length,
      percent: (group.length / data.length) * 100,
    };
  });

  return count;
};

const buildChampionsCount = (tournament: Tournament): championCount[] => {
  const data = tournament.lineups
    .map((l: Lineup) => l.map((d: Deck) => d.champions))
    .flat(2);

  const count: championCount[] = Object.entries(
    _.groupBy(data, (d) => {
      return d.name;
    })
  ).map((e) => {
    const [_, group] = e;
    return {
      championCode: group[0].cardCode,
      qty: group.length,
      percent: (group.length / data.length) * 100,
    };
  });

  return count;
};

const buildRegionSetCount = (tournament: Tournament): regionSetCount[] => {
  const data: Region[][] = tournament.lineups
    .map((l: Lineup) => l.map((d: Deck) => d.regions))
    .flat(1);

  const dataGroup = _.groupBy(data, (regions: Region[]) => {
    return regions
      .map((region: Region) => region.shortName)
      .sort()
      .join("/");
  });

  const count: regionSetCount[] = Object.entries(dataGroup).map((e) => {
    const [_, group] = e;

    return {
      regions: group[0].map((r) => r.shortName),
      qty: group.length,
      percent: (group.length / data.length) * 100,
    };
  });

  return count;
};

const buildRegionCount = (tournament: Tournament): regionCount[] => {
  const data = tournament.lineups
    .map((l: Lineup) => l.map((d: Deck) => d.regions))
    .flat(999);
  const dataGroup = _.groupBy(data, (r) => r.shortName);

  const count: regionCount[] = Object.entries(dataGroup).map((e) => {
    const [_, group] = e;

    return {
      region: group[0].shortName,
      qty: group.length,
      percent: (group.length / data.length) * 100,
    };
  });

  return count;
};

const buildCardCount = (tournament: Tournament): cardCount[] => {
  const dataGroup = tournament.lineups
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

  const totalCount = Object.entries(dataGroup).reduce((a, b) => {
    return a + b[1];
  }, 0);

  const count: cardCount[] = Object.entries(dataGroup).map(([card, count]) => ({
    cardCode: card,
    qty: count,
    percent: (count / totalCount) * 100,
  }));

  return count.sort((a, b) => b.qty - a.qty);
};

const buildLineupCount = (tournament: Tournament): lineupCount[] => {
  const data: Lineup[] = tournament.lineups;
  const dataGroup = _.groupBy(data, (lineup) => {
    return lineup
      .map((d: Deck) => {
        const key = `${d.archetype
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

  const count: lineupCount[] = Object.entries(dataGroup).map((e) => {
    const [_, group] = e;

    return {
      archetypes: group[0].map((d) => ({
        championsCode: d.archetype.map((c) => c.cardCode),
        regions: d.regions.map((r) => r.shortName),
      })),
      qty: group.length,
      percent: (group.length / data.length) * 100,
    };
  });

  return count;
};

const buildDeckPairCount = (tournament: Tournament) => {
  const data: Deck[][] = tournament.lineups
    .map((l) => [
      [l[0], l[1]],
      [l[1], l[2]],
      [l[0], l[2]],
    ])
    .flat(1);

  const dataGroup = _.groupBy(data, (decks) => {
    return decks
      .filter((d) => d !== undefined)
      .map((d) => {
        const key = `${d.archetype
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

  const count: lineupCount[] = Object.entries(dataGroup).map((ds) => {
    const [_, group] = ds;

    return {
      archetypes: group[0]
        .filter((d) => d)
        .map((d) => ({
          championsCode: d?.archetype?.map((c) => c.cardCode) || "",
          regions: d.regions.map((r) => r.shortName),
        })),
      qty: group.length,
      percent: (group.length / data.length) * 100,
    };
  });

  return count;
};
