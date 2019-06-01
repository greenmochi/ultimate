import { 
  createStore,
  combineReducers,
} from "redux";
import { nyaaReducer } from "./nyaa/reducer";
import { calculatorReducer } from "./calculator/reducer";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({
  nyaa: nyaaReducer,
  calculator: calculatorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  if (process.env.NODE_ENV === "development") {
    return createStore(
      rootReducer, 
      devToolsEnhancer({}),
    );
  } else {
    return createStore(
      rootReducer, 
    );
  }
};