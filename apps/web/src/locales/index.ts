import { TwelveMp } from "@mui/icons-material";
import deDE from "./de-DE";
import enUS from "./en-US";
import esES from "./es-ES";
import esMX from "./es-MX";
import frFR from "./fr-FR";
import itIT from "./it-IT";
import jaJP from "./ja-JP";
import koKR from "./ko-KR";
import plPL from "./pl-PL";
import ptBR from "./pt-BR";
import ruRU from "./ru-RU";
import thTH from "./th-TH";
import trTR from "./tr-TR";
import viVN from "./vi-VN";
import zhTW from "./zh-TW";
export interface ILocale {
  locale: string;
  welcome: string;
  latestTournaments: string;
  tournaments: string;
  upload: string;
  csvMustHave: string;
  nonCodeWillBeDiscarded: string;
  fileContentShouldBe: string;
  or: string;
  archetype: string;
  champions: string;
  regions: string;
  region: string;
  lineups: string;
  uploadCSV: string;
  cards: string;
  viewFullScreen: string;
  checkoutWorldwalker: string;
  setWorldwalker: string;
  setForcesFromBeyond: string;
  setAwakening: string;
  setDomination: string;
  setWorldEnder: string;
  season: string;
  dateFormat: string;
  title: string;
  tournamentDate: string;
}

const locales: Record<string, ILocale> = {
  "de-de": deDE,
  "en-us": enUS,
  "es-es": esES,
  "es-mx": esMX,
  "fr-fr": frFR,
  "it-it": itIT,
  "ja-jp": jaJP,
  "ko-kr": koKR,
  "pl-pl": plPL,
  "pt-br": ptBR,
  "ru-ru": ruRU,
  "th-th": thTH,
  "tr-tr": trTR,
  "vi-vn": viVN,
  "zh-tw": zhTW,
};

export default locales;
