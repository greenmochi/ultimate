import { 
  Action, 
  ActionCreator, 
} from "redux";
import {
  SET_LOCATION,
} from "./type";

export const setLocation: ActionCreator<Action> = (location: string) => {
  return {
    type: SET_LOCATION,
    payload: location,
  };
}