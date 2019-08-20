import { ActionCreator, Action } from "redux";

import { ThunkResult } from "../index";
import { SET_USERNAME, SET_USER_ANIME_LIST, FETCHING_USER_ANIME_LIST, SET_ANIME_SEARCH_RESULTS, FETCHING_ANIME_SEARCH_RESULTS } from "./type";
import { rpcUserAnimeList, rpcSearchAnime } from "../../api/myanimelist";
import { UsernameMsg, SearchQueryMsg } from "../../api/myanimelist/requestMessage";
import { UserAnimeList, AnimeSearchResult } from "../../api/myanimelist/responseMessage";

export const setUsername: ActionCreator<Action> = (username: string) => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
}

export function loadUserAnimeList(msg: UsernameMsg): ThunkResult<void> {
  return async (dispatch, getState) => {
    dispatch(fetchingUserAnimeList(true));
    const baseURI = getState().api.gatewayEndpoint;
    await rpcUserAnimeList(baseURI, msg)
      .then(userAnimeList => {
        dispatch(setUserAnimeList(userAnimeList));
      })
      .catch(error => {
        console.error("Failed to fetch user animelist", msg, error);
      })
    dispatch(fetchingUserAnimeList(false));
  };
}

export const setUserAnimeList: ActionCreator<Action> = (userAnimeList: UserAnimeList) => {
  return {
    type: SET_USER_ANIME_LIST,
    payload: userAnimeList,
  };
}

export const fetchingUserAnimeList: ActionCreator<Action> = (fetching: boolean) => {
  return {
    type: FETCHING_USER_ANIME_LIST,
    payload: fetching,
  };
}

export function loadAnimeSearchResults(msg: SearchQueryMsg): ThunkResult<void> {
  return async (dispatch, getState) => {
    dispatch(fetchingAnimeSearchResults(true));
    const baseURI = getState().api.gatewayEndpoint;
    await rpcSearchAnime(baseURI, msg)
      .then(animeSearchResults => {
        dispatch(setAnimeSearchResults(animeSearchResults));
      })
      .catch(error => {
        console.error("Failed to fetch anime search results", msg, error);
      });
    dispatch(fetchingAnimeSearchResults(false));
  };
}

export const setAnimeSearchResults: ActionCreator<Action> = (animeSearchResults: AnimeSearchResult[]) => {
  return {
    type: SET_ANIME_SEARCH_RESULTS,
    payload: animeSearchResults,
  };
}

export const fetchingAnimeSearchResults: ActionCreator<Action> = (fetching: boolean) => {
  return {
    type: FETCHING_ANIME_SEARCH_RESULTS,
    payload: fetching,
  };
}