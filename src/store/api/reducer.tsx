import {
  APIState,
  APIActionType,
  SET_KOKOROENDPOINT,
  SET_GATEWAYENDPOINT,
} from "./type";

const initialState: APIState = {
  kokoroEndpoint: "",
  gatewayEndpoint: "",
}

export function apiReducer(
  state = initialState,
  action: APIActionType
): APIState {
  switch (action.type) {
    case SET_KOKOROENDPOINT:
      return {
        ...state,
        kokoroEndpoint: action.payload,
      }
    case SET_GATEWAYENDPOINT:
      return {
        ...state,
        gatewayEndpoint: action.payload,
      }
    default:
      return state;
  }
}