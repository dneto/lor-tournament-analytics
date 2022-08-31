import cards from "./assets/en_us/cards.json";
import cardsPTBR from "./assets/pt_br/cards.json";
import { regions, region } from "./region";

class Card {
  associatedCards!: string[];
  associatedCardRefs!: string[];
  assets!: { gameAbsolutePath: string; fullAbsolutePath: string }[];
  regions!: string[];
  regionRefs!: string[];
  attack!: number;
  cost!: number;
  health!: number;
  description!: string;
  descriptionRaw!: string;
  levelupDescription!: string;
  levelupDescriptionRaw!: string;
  flavorText!: string;
  artistName!: string;
  name!: string;
  cardCode!: string;
  keywords!: string[];
  keywordRefs!: string[];
  spellSpeed!: string;
  spellSpeedRef!: string;
  rarity!: string;
  rarityRef!: string;
  subtypes!: string[];
  supertype!: string;
  type!: string;
  collectible!: boolean;
  set!: string;

  regionsShort!: string[];

  isChampion(): boolean {
    return this.rarityRef == "Champion";
  }

  isFromRegion(region: string): boolean {
    return this.regionRefs.includes(region);
  }
}

function cardFromCode(code: string): Card {
  const cardFromDatabase = cards.find((card) => {
    return card.cardCode == code;
  });

  if (cardFromDatabase != undefined) {
    const card = Object.assign(new Card(), cardFromDatabase);
    card.regionsShort = card.regionRefs.map(
      (r) => regions[r as region].shortName
    );

    return card;
  }

  throw new Error("Could not parse card code");
}

function cardFromCodeLocale(code: string, locale: string): Card {
  let cardDatabase = cards;
  switch (locale) {
    case "en-us":
      cardDatabase = cards;
      break;
    case "pt-br":
      cardDatabase = cardsPTBR;
      break;
  }
  const cardFromDatabase = cardDatabase.find((card) => {
    return card.cardCode == code;
  });

  if (cardFromDatabase != undefined) {
    const card = Object.assign(new Card(), cardFromDatabase);
    card.regionsShort = card.regionRefs.map(
      (r) => regions[r as region].shortName
    );

    return card;
  }

  throw new Error("Could not parse card code");
}

export { Card, cardFromCode, cardFromCodeLocale };
