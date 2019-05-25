//export interface History {
//  stack: [];
//}

export interface CalculatorState {
  display: number;
  input: number;
  value: number;
}

export const UPDATE_DISPLAY = "UPDATE_DISPLAY";
export const UPDATE_INPUT   = "UPDATE_INPUT";
export const UPDATE_VALUE   = "UPDATE_VALUE";

interface UpdateDisplayAction {
  type: typeof UPDATE_DISPLAY;
  payload: number;
}

interface UpdateInputAction {
  type: typeof UPDATE_INPUT;
  payload: number;
}

interface UpdateValueAction {
  type: typeof UPDATE_VALUE;
  payload: number;
}

export type CalculatorActionType = UpdateDisplayAction | UpdateInputAction | UpdateValueAction;