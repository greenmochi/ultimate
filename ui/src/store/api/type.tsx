export interface APIState {
  gatewayEndpoint: string;
}

export const SET_GATEWAYENDPOINT = "SET_GATEWAYENDPOINT";

interface SetGatewayEndpointAction {
  type: typeof SET_GATEWAYENDPOINT;
  payload: string;
}

export type APIActionType = SetGatewayEndpointAction;