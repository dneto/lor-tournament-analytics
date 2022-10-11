import { ILocale } from "@/locales";

export type DataProps = {
  pageID: string;
  title: string;
  locale: ILocale;
  paginated?: boolean;
  rowsPerPage?: number;
  showBackButton?: boolean;
  showFullScreenButton?: boolean;
};

export type DataState = {
  page: number;
};
