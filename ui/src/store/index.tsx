import { 
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";

import { APIActionType } from "./api/type";
import { apiReducer } from "./api/reducer";

import { NavigationActionType } from "./navigation/type";
import { navigationReducer } from "./navigation/reducer";

import { TorrentActionType } from "./torrent/type";
import { torrentReducer } from "./torrent/reducer";

import { YoutubeDLActionType } from "./youtube-dl/type";
import { youtubeDLReducer } from "./youtube-dl/reducer";

import { NyaaActionType } from "./nyaa/type";
import { nyaaReducer } from "./nyaa/reducer";

import { CalculatorActionType } from "./calculator/type";
import { calculatorReducer } from "./calculator/reducer";

const rootReducer = combineReducers({
  api: apiReducer,
  navigation: navigationReducer,
  torrent: torrentReducer,
  youtubeDL: youtubeDLReducer,
  nyaa: nyaaReducer,
  calculator: calculatorReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
export type StoreActions =
  | APIActionType
  | NavigationActionType
  | TorrentActionType
  | YoutubeDLActionType
  | NyaaActionType
  | CalculatorActionType;
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