export interface IPCState {
  kokoroEndpoint: string;
}

export const SET_KOKOROENDPOINT = "SET_KOKOROENDPOINT";

interface SetKokoroEndpointAction {
  type: typeof SET_KOKOROENDPOINT;
  payload: string;
}

export type IPCActionType = SetKokoroEndpointAction;