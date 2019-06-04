import { 
  ActionCreator, 
  Action,
} from "redux";
import {
  NyaaResult,
  SET_SEARCH_TERM, 
  SET_RESULTS,
} from "./type";
import { 
  fetchResults,
} from "../../api/nyaa";
import { 
  ThunkResult, 
} from "..";

export const setSearchTerm: ActionCreator<Action> = (searchTerm: string) => {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
}

export const setResults: ActionCreator<Action> = (results: NyaaResult[]) => {
  return {
    type: SET_RESULTS,
    payload: results,
  };
}

export function loadResults(searchTerm: string): ThunkResult<void> {
  return async (dispatch, getState) => {
    dispatch(setSearchTerm(searchTerm));

    const { nyaa } = getState();
    let results = await fetchResults<NyaaResult[]>(nyaa.searchTerm)
      .then((results: NyaaResult[]) => {
        return results;
      })
      .catch(error => {
        console.log(error);
      });
    dispatch(setResults(results));
  };
}
