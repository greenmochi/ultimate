import { UserAnimeList, AnimeSearchResult } from "../../api/myanimelist/responseMessage";

export interface MyAnimeListState {
  username: string;
  fetchingUserAnimeList: boolean;
  userAnimeList: UserAnimeList;
  animeSearchResults: AnimeSearchResult[];
  fetchingAnimeSearchResults: boolean;
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
  payload: boolean;
}

export type MyAnimeListActionType = 
  | SetUsernameAction
  | SetUserAnimeListAction
  | FetchingUserAnimeListAction
  | SetAnimeSearchResultsAction
  | FetchingAnimeSearchResultsAction
  ;
