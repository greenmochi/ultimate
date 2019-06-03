export interface NyaaState {
  searchTerm: string;
  results: NyaaResult[];
}

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: string;
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

export const SET_RESULTS = "SET_RESULTS";

interface SetResultsAction {
  type: typeof SET_RESULTS;
  payload: NyaaResult[];
}

export type NyaaActionType = SetSearchTermAction | SetResultsAction;