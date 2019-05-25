import {
  SET_SEARCH_TERM, 
} from "./type";

export function setSearchTerm(searchTerm: string) {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  }
}