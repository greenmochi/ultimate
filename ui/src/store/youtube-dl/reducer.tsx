import { YoutubeDLState, SET_SEARCH_TERM, YoutubeDLActionType } from "./type";

const initialState: YoutubeDLState = {
  searchTerm: "",
};

export function youtubeDLReducer(
  state = initialState,
  action: YoutubeDLActionType,
): YoutubeDLState {
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
