import { 
  ActionCreator, 
  Action,
} from "redux";
import { ThunkResult } from "..";
import {
  NyaaResult,
  SET_SEARCH_TERM, 
  SET_RESULTS,
  FETCHING_RESULTS,
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

export function loadResults(queryData: PostQueryData): ThunkResult<void> {
  return async (dispatch, getState) => {
    dispatch(fetchingResults(true));
    dispatch(setSearchTerm(queryData.query));

    const endpoint = getState().api.gatewayEndpoint + "/nyaa/search";

    let results: NyaaResult[] = await fetchResults<NyaaResult[]>(endpoint, queryData)
      .then((json: any) => {
        if (!("results" in json)) {
          return [];
        }

        let resultsArray: [] = json["results"];
        if (!(json["results"] instanceof Array)) {
          return [];
        }

        let nyaaResults: NyaaResult[] = resultsArray.map((data): NyaaResult => ({
          category:   data["category"]  ?  data["category"]  : "n/a",
          name:       data["name"]      ?  data["name"]      : "n/a",
          link:       data["link"]      ?  data["link"]      : "n/a",
          size:       data["size"]      ?  data["size"]      : "n/a",
          date:       data["date"]      ?  data["date"]      : "n/a",
          seeders:    data["seeders"]   ?  data["seeders"]   : 0,
          leechers:   data["leechers"]  ?  data["leechers"]  : 0,
          downloads:  data["downloads"] ?  data["downloads"] : 0,
        }));

        return nyaaResults;
      })
      .catch(error => {
        console.log(error);
        return [];
      });
    dispatch(fetchingResults(false));
    dispatch(setResults(results));
  };
}

export const fetchingResults: ActionCreator<Action> = (fetching: boolean) => {
  return {
    type: FETCHING_RESULTS,
    payload: fetching,
  };
}