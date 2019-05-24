import {
  CalculatorState,
  UPDATE_CALCULATOR,
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
    case UPDATE_CALCULATOR:
      return {
        input: state.input,
        value: action.payload,
      };
    default:
      return state;
  }
}
