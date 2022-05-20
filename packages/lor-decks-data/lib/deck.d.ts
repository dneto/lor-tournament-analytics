import { Card } from "./card";
import { Region } from "./region";
declare type CardEntry = {
    card: Card;
    count: number;
};
declare class Deck {
    code: string;
    cardEntries: CardEntry[];
    private _regions;
    private _cards;
    constructor(code: string);
    get cards(): Card[];
    get regions(): Region[];
    get champions(): Card[];
}
export { Deck };
