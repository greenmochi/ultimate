import {
  MyAnimeListState,
  MyAnimeListActionType,
  SET_USERNAME,
  SET_USER_ANIME_LIST,
  FETCHING_USER_ANIME_LIST,
  SET_ANIME_SEARCH_RESULTS,
  FETCHING_ANIME_SEARCH_RESULTS,
} from "./type";

const initialState: MyAnimeListState = {
  username: "",
  fetchingUserAnimeList: false,
  userAnimeList: {},
  fetchingAnimeSearchResults: false,
  animeSearchResults: [],
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
    case SET_USER_ANIME_LIST:
      return {
        ...state,
        userAnimeList: action.payload,
      };
    case FETCHING_USER_ANIME_LIST:
      return {
        ...state,
        fetchingUserAnimeList: action.payload,
      };
    case SET_ANIME_SEARCH_RESULTS:
      return {
        ...state,
        animeSearchResults: action.payload,
      };
    case FETCHING_ANIME_SEARCH_RESULTS:
      return {
        ...state,
        fetchingAnimeSearchResults: action.payload,
      };
    default:
      return state;
  }
}
