export interface APIState {
  gatewayEndpoint: string;
}

export const SET_GATEWAY_ENDPOINT = "SET_GATEWAY_ENDPOINT";

interface SetGatewayEndpointAction {
  type: typeof SET_GATEWAY_ENDPOINT;
  payload: string;
}

export type APIActionType = SetGatewayEndpointAction;