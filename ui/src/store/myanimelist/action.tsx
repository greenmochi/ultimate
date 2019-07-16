import { 
  ActionCreator, 
  Action,
} from "redux";
import {
  SET_USERNAME, 
} from "./type";

export const setUsername: ActionCreator<Action> = (username: string) => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
}