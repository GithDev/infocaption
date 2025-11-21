export enum GuideTypes {
  Snabbguide = 1,
  StegForStegGuide = 2,
  Textguide = 7,
  Kunskapstest = 9,
  Oversikt = 11,
  Snabbinspelning = 12,
  PushTraining = 13,
  Kurs = 14,
  Url = 15,
  Ranking = 16,
  Arbetsflode = 17,
  FysiskKurs = 18,
  Guidesamling = 19,
}

export enum GuideSort {
  TitleAsc = 1,
  TitleDesc = 2,
  ViewsAsc = 9,
  ViewsDesc = 10,
  DatePublishedAsc = 11,
  DatePublishedDesc = 12,
  DateModifiedAsc = 13,
  DateModifiedDesc = 14,
  Popularity7DaysAsc = 15,
  Popularity7DaysDesc = 16,
  Popularity14DaysAsc = 17,
  Popularity14DaysDesc = 18,
  Popularity21DaysAsc = 19,
  Popularity21DaysDesc = 20,
  Popularity30DaysAsc = 21,
  Popularity30DaysDesc = 22,
  PopularityYearAsc = 23,
  PopularityYearDesc = 24,
  DateLastAccessedAsc = 31,
  DateLastAccessedDesc = 32,
  DateLastPublishedAsc = 37,
  DateLastPublishedDesc = 38,
}

export interface GuideSearchOptions {
  searchQuery?: string;

  topicIDs?: number[];
  types?: GuideTypes[];
  language?: number[];
  page?: number;
  hitsPerPage?: number;

  searchable?: ("y" | "n")[];

  keywords?: string[];

  includeProcess?: boolean;

  sort?: GuideSort;
}

// Suggest-resultat
export interface SuggestResultItem {
  fullURL: URL;
  guideType: number;
  guideURL: string;
  highlightKey: string;
  iconID: number;
  id: number;
  idMatch: boolean;
  key: string;
}

export interface GuideSearchHit {
  id: number;
  name: string;
  summary?: string;
  fullURL: string;
  thumbnailURL?: string;
  guideType?: number;
  topics?: number[];
  topicNames?: string[];
}

export interface GuideSearchResponse {
  results: GuideSearchHit[];
  hitsPerPage: number;
  totalHits: number;
  totalPages: number;
  currentPage: number;
}

export interface FilterOptionsResponse {
  topics: Topic[];
  languages: Language[];
  selectableLanguages: Language[]; // ofta tom array
  guideTypes: GuideType[];
  id: number;
}

export interface Topic {
  shortName: string;
  id: number;
  subTopics: Topic[];
}

export interface Language {
  name: string;
  code: string;
  translateable: boolean;
  id: number;
}

export interface GuideType {
  id: number;
  name: string;
}
