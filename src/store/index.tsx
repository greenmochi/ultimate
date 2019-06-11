import { 
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";

import { NyaaActionType } from "./nyaa/type";
import { nyaaReducer } from "./nyaa/reducer";
import { CalculatorActionType } from "./calculator/type";
import { calculatorReducer } from "./calculator/reducer";
import { IPCActionType } from "./ipc/type";
import { ipcReducer } from "./ipc/reducer";

const rootReducer = combineReducers({
  nyaa: nyaaReducer,
  calculator: calculatorReducer,
  ipc: ipcReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
export type StoreActions = CalculatorActionType | NyaaActionType | IPCActionType;
export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, StoreActions>;

export default function configureStore() {
  if (process.env.NODE_ENV === "development") {
    return createStore(
      rootReducer, 
      compose(
        applyMiddleware(thunk as ThunkMiddleware<StoreState, StoreActions>), 
        devToolsEnhancer({}),
      ),
    );
  } else {
    return createStore(
      rootReducer, 
      applyMiddleware(thunk as ThunkMiddleware<StoreState, StoreActions>),
    );
  }
};