export interface APIState {
  kokoroEndpoint: string;
  gatewayEndpoint: string;
}

export const SET_KOKOROENDPOINT = "SET_KOKOROENDPOINT";
export const SET_GATEWAYENDPOINT = "SET_GATEWAYENDPOINT";

interface SetKokoroEndpointAction {
  type: typeof SET_KOKOROENDPOINT;
  payload: string;
}

interface SetGatewayEndpointAction {
  type: typeof SET_GATEWAYENDPOINT;
  payload: string;
}

export type APIActionType = SetKokoroEndpointAction | SetGatewayEndpointAction;