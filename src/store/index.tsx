import { 
  createStore,
  combineReducers,
} from "redux";
import { nyaaReducer } from "./nyaa/reducer";
import { calculatorReducer } from "./calculator/reducer";

const rootReducer = combineReducers({
  nyaa: nyaaReducer,
  calculator: calculatorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
  )
  return store;
};