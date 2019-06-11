import {
  IPCActionType,
  SET_KOKOROENDPOINT, IPCState,
} from "./type";

const initialState: IPCState = {
  kokoroEndpoint: "",
}

export function ipcReducer(
  state = initialState,
  action: IPCActionType
): IPCState {
  switch (action.type) {
    case SET_KOKOROENDPOINT:
      return {
        ...state,
        kokoroEndpoint: action.payload,
      }
    default:
      return state;
  }
}