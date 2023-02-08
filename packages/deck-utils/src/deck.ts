import { DeckEncoder } from "runeterra";
import { Card, cardFromCode } from "./card";
import { Region, regions, region } from "./region";

const MAX_REGIONS = 2;

export type CardEntry = {
  card: Card;
  count: number;
};

class Deck {
  code: string;
  cardEntries: CardEntry[];
  private _regions!: Region[];
  private _cards!: Card[];

  constructor(code: string) {
    const cards: CardEntry[] = DeckEncoder.decode(code).map((card) => {
      return { card: cardFromCode(card.code), count: card.count } as CardEntry;
    });

    this.cardEntries = cards;
    this.code = code;
  }

  get cards(): Card[] {
    if (this._cards == undefined) {
      this._cards = this.cardEntries.map((ce) => ce.card);
    }
    return this._cards;
  }

  get regions(): Region[] {
    if (this._regions == undefined) {
      this._regions = [];
      const runeterraChampionsCount = this.champions.filter((champion) =>
        champion.isFromRegion("Runeterra")
      ).length;
      if (runeterraChampionsCount < this.champions.length) {
        this._regions = (
          Object.entries(
            this.cards
              .map((c) => c.regionRefs)
              .flat()
              .reduce((acc: any, curr: string) => {
                acc[curr] = acc[curr] + 1 || 1;
                return acc;
              }, {})
          ) as [region, number][]
        )
          .map((r) => [regions[r[0]], r[1]] as [Region, number])
          .sort((a, b) => b[1] - a[1])
          .slice(0, MAX_REGIONS - runeterraChampionsCount)
          .map((r) => r[0]);
      }
      if (runeterraChampionsCount > 0) {
        this._regions.push(regions["Runeterra"]);
      }
    }

    return this._regions.sort((a, b) => a.ref.localeCompare(b.ref));
  }

  get champions(): Card[] {
    return this.cards.filter((c: Card) => c.isChampion()).sort();
  }

  get archetype(): Card[] {
    return this.cardEntries
      .filter((ce) => ce.card.isChampion() && ce.count > 1)
      .map((ce) => ce.card)
      .sort();
  }
}

export { Deck };
