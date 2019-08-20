import { APIState, APIActionType, SET_GATEWAY_ENDPOINT } from "./type";

const initialState: APIState = {
  gatewayEndpoint: "",
}

export function apiReducer(
  state = initialState,
  action: APIActionType
): APIState {
  switch (action.type) {
    case SET_GATEWAY_ENDPOINT:
      return {
        ...state,
        gatewayEndpoint: action.payload,
      }
    default:
      return state;
  }
}