import { CalculatorState, UPDATE_DISPLAY, UPDATE_INPUT, UPDATE_VALUE, CalculatorActionType } from "./type";

const initialState: CalculatorState = {
  display: 0,
  input: 0,
  value: 0,
};

export function calculatorReducer(
  state = initialState,
  action: CalculatorActionType
): CalculatorState {
  switch (action.type) {
    case UPDATE_DISPLAY:
      return {
        ...state,
        display: action.payload,
      }
    case UPDATE_INPUT:
      return {
        ...state,
        input: action.payload,
      };
    case UPDATE_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
}
