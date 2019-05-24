import {
  UPDATE_CALCULATOR,
} from "./type";

export function updateCalculator(value: number) {
  return {
    type: UPDATE_CALCULATOR,
    payload: value,
  };
}