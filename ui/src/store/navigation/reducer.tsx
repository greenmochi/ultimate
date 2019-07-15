import {
  NavigationState,
  NavigationActionType,
  SET_LOCATION,
} from "./type";

const initialState: NavigationState = {
  location: "/",
}

export function navigationReducer(
  state = initialState,
  action: NavigationActionType
): NavigationState {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      }
    default:
      return state;
  }
}