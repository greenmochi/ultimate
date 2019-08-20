import { ActionCreator, Action } from "redux";
import { DefaultTheme } from "styled-components";
import { SET_DEFAULT_THEME } from "./type";

export const setDefaultTheme: ActionCreator<Action> = (defaultTheme: DefaultTheme) => {
  return {
    type: SET_DEFAULT_THEME,
    payload: defaultTheme,
  };
}