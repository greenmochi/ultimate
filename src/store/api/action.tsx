import { 
  Action, 
  ActionCreator, 
} from "redux";
import {
  SET_KOKOROENDPOINT, 
  SET_GATEWAYENDPOINT,
} from "./type";

export const setKokoroEndpoint: ActionCreator<Action> = (endpoint: string) => {
  return {
    type: SET_KOKOROENDPOINT,
    payload: endpoint,
  };
}

export const setGatewayEndpoint: ActionCreator<Action> = (endpoint: string) => {
  return {
    type: SET_GATEWAYENDPOINT,
    payload: endpoint,
  };
}