import { DefaultTheme } from "styled-components";

export interface ThemeState {
  defaultTheme: DefaultTheme;
}

export const SET_DEFAULT_THEME = "SET_DEFAULT_THEME";

interface SetDefaultThemeAction {
  type: typeof SET_DEFAULT_THEME;
  payload: DefaultTheme;
}
export type ThemeActionType = SetDefaultThemeAction;