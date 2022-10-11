import cardsDEDE from "./assets/de_de/cards.json";
import cardsENUS from "./assets/en_us/cards.json";
import cardsESES from "./assets/es_es/cards.json";
import cardsESMX from "./assets/es_mx/cards.json";
import cardsFRFR from "./assets/fr_fr/cards.json";
import cardsITIT from "./assets/it_it/cards.json";
import cardsJAJP from "./assets/ja_jp/cards.json";
import cardsKOKR from "./assets/ko_kr/cards.json";
import cardsPLPL from "./assets/pl_pl/cards.json";
import cardsPTBR from "./assets/pt_br/cards.json";
import cardsRURU from "./assets/ru_ru/cards.json";
import cardsTHTH from "./assets/th_th/cards.json";
import cardsTRTR from "./assets/tr_tr/cards.json";
import cardsVIVN from "./assets/vi_vn/cards.json";
import cardsZHTW from "./assets/zh_tw/cards.json";

const cardsByLocale = (locale: string) => {
  switch (locale) {
    case "en-us":
      return cardsENUS;
    case "de-de":
      return cardsDEDE;
    case "es-es":
      return cardsESES;
    case "es-mx":
      return cardsESMX;
    case "fr-fr":
      return cardsFRFR;
    case "it-it":
      return cardsITIT;
    case "ja-jp":
      return cardsJAJP;
    case "ko-kr":
      return cardsKOKR;
    case "pl-pl":
      return cardsPLPL;
    case "pt-br":
      return cardsPTBR;
    case "ru-ru":
      return cardsRURU;
    case "th-th":
      return cardsTHTH;
    case "tr-tr":
      return cardsTRTR;
    case "vi-vn":
      return cardsVIVN;
    case "zh-tw":
      return cardsZHTW;
    default:
      return cardsENUS;
  }
};

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
  const cardFromDatabase = cardsENUS.find((card) => {
    return card.cardCode == code;
  });

  if (cardFromDatabase != undefined) {
    const card = Object.assign(new Card(), cardFromDatabase);
    card.regionsShort = card.regionRefs.map(
      (r) => regions[r as region].shortName
    );

    return card;
  }

  throw new Error(`Could not parse card code ${code}`);
}

function cardFromCodeLocale(code: string, locale: string): Card {
  const cardDatabase = cardsByLocale(locale);
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

  throw new Error(`Could not parse card code ${code} for locale ${locale}`);
}

export { Card, cardFromCode, cardFromCodeLocale };
