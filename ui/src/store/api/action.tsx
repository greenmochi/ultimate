import { Action, ActionCreator } from "redux";
import { SET_GATEWAY_ENDPOINT } from "./type";

export const setGatewayEndpoint: ActionCreator<Action> = (endpoint: string) => {
  return {
    type: SET_GATEWAY_ENDPOINT,
    payload: endpoint,
  };
}