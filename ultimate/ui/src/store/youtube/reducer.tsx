import {
  YoutubeState,
  SET_SEARCH_TERM,
  YoutubeActionType,
} from "./type";

const initialState: YoutubeState = {
  searchTerm: "",
};

export function youtubeReducer(
  state = initialState,
  action: YoutubeActionType,
): YoutubeState {
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
