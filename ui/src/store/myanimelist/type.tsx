export interface MyAnimeListState {
  username: string;
  fetchingUserAnimeList: boolean;
  userAnimeList: UserAnimeList;
  animeSearchResults: AnimeSearchResult[];
  fetchingAnimeSearchResults: boolean;
}

export interface UserAnimeList {
  username?: string;
  userAnime?: UserAnime[];
}

export interface UserAnime {
  status: number;
  score: number;
  tags: string;
  isRewatching: string;
  numWatchedEpisodes: number;
  animeTitle: string;
  animeNumEpisodes: number;
  animeAiringStatus: number;
  animeID: number;
  animeStudios: string;
  animeLicensors: string;
  animeSeason: AnimeSeason;
  hasEpisodeVideo: boolean;
  hasPromotionVideo: boolean;
  hasVideo: boolean;
  videoURL: string;
  animeURL: string;
  animeImagePath: string;
  isAddedToList: boolean;
  animeMediaTypeString: string;
  animeMPAARatingString: string;
  startDateString: string;
  finishDateString: string;
  animeStartDateString: string;
  animeEndDateString: string;
  daysString: number;
  storageString: string;
  priorityString: string;
}

export interface AnimeSeason {
  year: number;
  season: string;
}

export interface AnimeSearchResult {
  imgSrc: string;
  // Keep the blob as type string and the original base it's in.
  // since we can just load in as a src for an img tag.
  imgBlob: string; 
  title: string;
  link: string;
  synopsis: string;
  type: string;
  numEpisodes: string;
  score: string;
}

export const SET_USERNAME = "SET_USERNAME";
export const SET_USER_ANIME_LIST = "SET_USER_ANIME_LIST";
export const FETCHING_USER_ANIME_LIST = "FETCHING_USER_ANIME_LIST";
export const SET_ANIME_SEARCH_RESULTS = "SET_ANIME_SEARCH_RESULTS";
export const FETCHING_ANIME_SEARCH_RESULTS = "FETCHING_ANIME_SEARCH_RESULTS";

interface SetUsernameAction {
  type: typeof SET_USERNAME;
  payload: string;
}

interface SetUserAnimeListAction {
  type: typeof SET_USER_ANIME_LIST;
  payload: UserAnimeList;
}

interface FetchingUserAnimeListAction {
  type: typeof FETCHING_USER_ANIME_LIST;
  payload: boolean;
}

interface SetAnimeSearchResultsAction {
  type: typeof SET_ANIME_SEARCH_RESULTS;
  payload: AnimeSearchResult[];
}

interface FetchingAnimeSearchResultsAction {
  type: typeof FETCHING_ANIME_SEARCH_RESULTS;
  paylaod: boolean
}

export type MyAnimeListActionType = 
  | SetUsernameAction
  | SetUserAnimeListAction
  | FetchingUserAnimeListAction
  | SetAnimeSearchResultsAction
  | FetchingAnimeSearchResultsAction
  ;