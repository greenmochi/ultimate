import {
  NyaaState,
  SET_SEARCH_TERM,
  NyaaActionType,
} from "./type";

const initialState: NyaaState = {
  searchTerm: "",
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
    default:
      return state;
  }
}
