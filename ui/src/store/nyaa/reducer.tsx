import { NyaaState, SET_SEARCH_TERM, NyaaActionType, SET_RESULTS, FETCHING_RESULTS } from "./type";

const initialState: NyaaState = {
  searchTerm: "",
  results: [],
  fetchingResults: false,
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
    case FETCHING_RESULTS:
      return {
        ...state,
        fetchingResults: action.payload,
      }
    default:
      return state;
  }
}
