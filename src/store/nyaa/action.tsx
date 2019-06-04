import { 
  ActionCreator, 
  Action,
  AnyAction,
} from "redux";
import {
  NyaaResult,
  SET_SEARCH_TERM, 
  SET_RESULTS,
} from "./type";
import { 
  fetchResults,
} from "../../api/nyaa";
import { ThunkDispatch } from "redux-thunk";
import { 
  StoreState, 
  ThunkResult, 
} from "..";

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

export function loadResults(): ThunkResult<void> {
  return (dispatch, getState) => {
    const { nyaa } = getState();
    let req = fetchResults<NyaaResult[]>("/nyaa", nyaa.searchTerm)
    req.then((results: NyaaResult[]) => {
      console.log(results);
    })
      .then(error => {
        console.log(error);
      });
    dispatch(setResults([]));
  };
}
