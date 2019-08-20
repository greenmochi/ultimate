import { UPDATE_DISPLAY, UPDATE_INPUT, UPDATE_VALUE } from "./type";

export function updateCalculatorDisplay(value: number) {
  return {
    type: UPDATE_DISPLAY,
    payload: value,
  }
}

export function updateCalculatorInput(value: number) {
  return {
    type: UPDATE_INPUT,
    payload: value,
  }
}

export function updateCalculatorValue(value: number) {
  return {
    type: UPDATE_VALUE,
    payload: value,
  };
}