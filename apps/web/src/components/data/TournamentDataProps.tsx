import { ILocale } from "@/locales";
import { Tournament } from "@lor-analytics/data-extractor/tournament";

export type DataProps = {
  pageID: string;
  tournament: Tournament;
  locale: ILocale;
  paginated?: boolean;
  rowsPerPage?: number;
  showBackButton?: boolean;
  showFullScreenButton?: boolean;
};

export type DataState = {
  page: number;
};
