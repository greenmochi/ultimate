import {
  UPDATE_VALUE, UPDATE_INPUT,
} from "./type";

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