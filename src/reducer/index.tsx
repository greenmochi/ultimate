import { combineReducers } from "redux";
import { nyaaReducer } from "./nyaa";

const rootReducer = combineReducers({
  nyaa: nyaaReducer,
});

export default rootReducer;