import { 
  ActionCreator, 
  Action,
  AnyAction,
} from "redux";
import {
  NyaaResult,
  SET_SEARCH_TERM, 
  SET_RESULTS,
  NyaaState,
} from "./type";
import { 
  fetchResults,
} from "../../api/nyaa";
import { ThunkDispatch } from "redux-thunk";

export const setSearchTerm: ActionCreator<Action> = (searchTerm: string) => {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  }
}

export const setResults: ActionCreator<Action> = (results: NyaaResult[]) => {
  return {
    type: SET_RESULTS,
    payload: results,
  }
}

export const loadResults = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
  const { nyaa } = getState();
  let call = fetchResults<NyaaResult>("/nyaa", nyaa.searchTerm)
}