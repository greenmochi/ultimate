export interface TorrentState {
  searchTerm: string;
}

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: string;
}
export type TorrentActionType = SetSearchTermAction;