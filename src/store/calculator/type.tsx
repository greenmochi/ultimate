//export interface History {
//  stack: [];
//}

export interface CalculatorState {
  value: number;
}

export const UPDATE_CALCULATOR = "UPDATE_CALCULATOR";

interface UpdateCalculatorAction {
  type: typeof UPDATE_CALCULATOR;
  payload: number;
}

export type CalculatorActionType = UpdateCalculatorAction;