import {
  CalculatorState,
  UPDATE_CALCULATOR,
  CalculatorActionType,
} from "./type";

const initialState: CalculatorState = {
  value: 0,
};

export function calculatorReducer(
  state = initialState,
  action: CalculatorActionType
): CalculatorState {
  switch (action.type) {
    case UPDATE_CALCULATOR:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
}
