import { MusicState, SET_SEARCH_TERM, MusicActionType } from "./type";

const initialState: MusicState = {
  searchTerm: "",
};

export function musicReducer(
  state = initialState,
  action: MusicActionType,
): MusicState {
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
