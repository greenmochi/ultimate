//export interface History {
//  stack: [];
//}

export interface CalculatorState {
  input: number;
  value: number;
}

export const UPDATE_INPUT = "UPDATE_INPUT";
export const UPDATE_VALUE = "UPDATE_VALUE";

interface UpdateInputAction {
  type: typeof UPDATE_INPUT;
  payload: number;
}

interface UpdateValueAction {
  type: typeof UPDATE_VALUE;
  payload: number;
}

export type CalculatorActionType = UpdateInputAction | UpdateValueAction;