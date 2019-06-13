import { 
  ActionCreator, 
  Action,
} from "redux";
import { 
  ThunkResult, 
} from "..";
import {
  NyaaResult,
  SET_SEARCH_TERM, 
  SET_RESULTS,
} from "./type";
import { 
  fetchResults,
} from "../../api/nyaa";
import PostQueryData from "../../api/nyaa/query";

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

export function loadResults(searchTerm: string, queryData: PostQueryData): ThunkResult<void> {
  return async (dispatch, getState) => {
    dispatch(setSearchTerm(searchTerm));

    const { 
      api,
    } = getState();
    const endpoint = api.gatewayEndpoint + "/nyaa/search";
    let results: NyaaResult[] = await fetchResults<NyaaResult[]>(endpoint, queryData)
      .then((results: any) => {
        if ("results" in results) {
          return results["results"];
        }
        return [];
      })
      .catch(error => {
        console.log(error);
      });
    dispatch(setResults(results));
  };
}