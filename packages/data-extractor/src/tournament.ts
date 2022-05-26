import { Deck } from "@lor-analytics/deck-utils";
import { parse } from "csv-parse/sync";
import _ from "lodash";
export type Lineup = [Deck, Deck, Deck];

export class Tournament {
  readonly lineups: Lineup[];

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
