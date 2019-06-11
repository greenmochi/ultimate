import { 
  ActionCreator, 
  Action,
} from "redux";
import {
  IPCActionType,
  SET_KOKOROENDPOINT,
} from "./type";

export const setKokoroEndpoint: ActionCreator<IPCActionType> = (endpoint: string) => {
  return {
    type: SET_KOKOROENDPOINT,
    payload: endpoint,
  };
}