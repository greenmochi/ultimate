import {
  NyaaState,
  SEND_MESSAGE,
  NyaaActionType,
} from "./type";

const initialState: NyaaState = {
  messages: []
};

export function nyaaReducer(
  state = initialState,
  action: NyaaActionType
): NyaaState {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
}
