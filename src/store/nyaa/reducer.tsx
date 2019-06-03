import {
  NyaaState,
  SET_SEARCH_TERM,
  NyaaActionType,
  SET_RESULTS,
} from "./type";

const initialState: NyaaState = {
  searchTerm: "",
  results: [],
};

export function nyaaReducer(
  state = initialState,
  action: NyaaActionType
): NyaaState {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
}
