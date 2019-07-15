import { 
  Action, 
  ActionCreator, 
} from "redux";
import {
  SET_GATEWAYENDPOINT,
} from "./type";

export const setGatewayEndpoint: ActionCreator<Action> = (endpoint: string) => {
  return {
    type: SET_GATEWAYENDPOINT,
    payload: endpoint,
  };
}