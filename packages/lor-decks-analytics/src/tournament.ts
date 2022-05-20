import { Card, Deck } from "@lor-tournament-analytics/lor-decks-data";
import { parse } from "csv-parse/sync";
import _ from "lodash";
import { ThemeProvider, createTheme } from "@mui/material/styles";
export type Lineup = [Deck, Deck, Deck];

export class Tournament {
  readonly lineups: Lineup[];

  constructor(lineups: Lineup[]) {
    this.lineups = lineups;
  }

  static fromCSV(csvData: string | Buffer): Tournament {
    const records = parse(csvData, { relax_column_count: true });
    const lineup = records.map(
      (r) =>
        r
          .map((code) => {
            try {
              return new Deck(code);
            } catch (e) {
              return undefined;
            }
          })
          .filter(Boolean) as Lineup
    ) as Lineup[];
    return new Tournament(lineup);
  }

  countBy(
    fn: (lineup: Lineup) => any,
    flatDepth: number = 1
  ): [string, number][] {
    const lineups = this.lineups.map(fn).flat(flatDepth).sort();
    return Object.entries(_.countBy(lineups)).sort((a, b) => b[1] - a[1]);
  }
}
