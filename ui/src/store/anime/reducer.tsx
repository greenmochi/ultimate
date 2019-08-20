import { AnimeState, SET_SEARCH_TERM, AnimeActionType } from "./type";

const initialState: AnimeState = {
  searchTerm: "",
};

export function animeReducer(
  state = initialState,
  action: AnimeActionType,
): AnimeState {
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
