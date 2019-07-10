import { 
  ActionCreator, 
  Action,
} from "redux";
import {
  SET_SEARCH_TERM, 
} from "./type";

export const setSearchTerm: ActionCreator<Action> = (searchTerm: string) => {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
}