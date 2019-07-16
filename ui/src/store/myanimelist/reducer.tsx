import {
  MyAnimeListState,
  SET_USERNAME,
  MyAnimeListActionType,
} from "./type";

const initialState: MyAnimeListState = {
  username: "",
};

export function myAnimeListReducer(
  state = initialState,
  action: MyAnimeListActionType,
): MyAnimeListState {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
}
