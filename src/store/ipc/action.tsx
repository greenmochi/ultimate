import { 
  ActionCreator, 
  Action, 
} from "redux";
import {
  SET_KOKOROENDPOINT,
} from "./type";

export const setKokoroEndpoint: ActionCreator<Action> = (endpoint: string) => {
  return {
    type: SET_KOKOROENDPOINT,
    payload: endpoint,
  };
}