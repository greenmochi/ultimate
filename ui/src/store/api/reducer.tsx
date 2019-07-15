import {
  APIState,
  APIActionType,
  SET_GATEWAYENDPOINT,
} from "./type";

const initialState: APIState = {
  gatewayEndpoint: "",
}

export function apiReducer(
  state = initialState,
  action: APIActionType
): APIState {
  switch (action.type) {
    case SET_GATEWAYENDPOINT:
      return {
        ...state,
        gatewayEndpoint: action.payload,
      }
    default:
      return state;
  }
}