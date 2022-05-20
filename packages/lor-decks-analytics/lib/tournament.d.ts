/// <reference types="node" />
import { Deck } from "@lor-tournament-analytics/lor-decks-data";
export declare type Lineup = [Deck, Deck, Deck];
export declare class Tournament {
    readonly lineups: Lineup[];
    constructor(lineups: Lineup[]);
    static fromCSV(csvData: string | Buffer): Tournament;
    countBy(fn: (lineup: Lineup) => any, flatDepth?: number): [string, number][];
}
