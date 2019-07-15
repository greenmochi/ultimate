export interface NavigationState {
  location: string;
}

export const SET_LOCATION = "SET_LOCATION";

interface SetLocationAction {
  type: typeof SET_LOCATION;
  payload: string;
}

export type NavigationActionType = SetLocationAction;