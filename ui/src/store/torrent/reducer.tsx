import { TorrentState, SET_SEARCH_TERM, TorrentActionType } from "./type";

const initialState: TorrentState = {
  searchTerm: "",
};

export function torrentReducer(
  state = initialState,
  action: TorrentActionType,
): TorrentState {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
}
