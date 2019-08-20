import { ThemeState, SET_DEFAULT_THEME, ThemeActionType } from "./type";

const initialState: ThemeState = {
  defaultTheme: {
    borderRadius: '5px',
    colors: {
      main: 'cyan',
      secondary: 'magenta',
    },
  },
};

export function themeReducer(
  state = initialState,
  action: ThemeActionType,
): ThemeState {
  switch (action.type) {
    case SET_DEFAULT_THEME:
      // Note: we are mutating defaultTheme state directly.
      // We cannot change any reference in the object. lodash
      // does not provide a function for map-to-map values of the 
      // same type of object. Although lodash.assign says it mutates,
      // but it still changes the references in the object for some reason.
      state.defaultTheme.borderRadius = action.payload.borderRadius;
      state.defaultTheme.colors.main = action.payload.colors.main;
      state.defaultTheme.colors.secondary = action.payload.colors.secondary;
      return state;
    default:
      return state;
  }
}
