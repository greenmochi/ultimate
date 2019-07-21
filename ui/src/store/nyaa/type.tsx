export interface NyaaState {
  searchTerm: string;
  results: NyaaResult[];
  fetchingResults: boolean;
}

export interface NyaaResult {
  category:   string;
  name:       string;
  link:       string;
  size:       string;
  date:       string;
  seeders:    number;
  leechers:   number;
  downloads:  number;
}

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SET_RESULTS = "SET_RESULTS";
export const FETCHING_RESULTS = "FETCHING_RESULTS";

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: string;
}

interface SetResultsAction {
  type: typeof SET_RESULTS;
  payload: NyaaResult[];
}

interface FetchingResultsAction {
  type: typeof FETCHING_RESULTS;
  payload: boolean;
}

export type NyaaActionType = 
  | SetSearchTermAction 
  | SetResultsAction
  | FetchingResultsAction;