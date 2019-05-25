import {
  CalculatorState,
  UPDATE_INPUT,
  UPDATE_VALUE,
  CalculatorActionType,
} from "./type";

const initialState: CalculatorState = {
  input: 0,
  value: 0,
};

export function calculatorReducer(
  state = initialState,
  action: CalculatorActionType
): CalculatorState {
  switch (action.type) {
    case UPDATE_INPUT:
      return {
        input: action.payload,
        value: state.value,
      };
    case UPDATE_VALUE:
      return {
        input: state.input,
        value: action.payload,
      };
    default:
      return state;
  }
}
