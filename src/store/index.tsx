import { 
  createStore,
  combineReducers,
} from "redux";
import { nyaaReducer } from "./nyaa/reducer";

const rootReducer = combineReducers({
  nyaa: nyaaReducer,
});

export default function configureStore() {
  const store = createStore(
    rootReducer,
  )
  return store;
};