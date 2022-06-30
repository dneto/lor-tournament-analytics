import ptBR from "./pt-BR";
import enUS from "./en-US";
export interface ILocale {
  locale:string;
  welcome: string;
  latestTournaments: string;
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
}

const locales: Record<string, ILocale> = {
  "en-US": enUS,
  "pt-BR": ptBR,
};

export default locales;
