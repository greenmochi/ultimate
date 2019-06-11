import { 
  Store, 
  AnyAction,
} from "redux";
import { StoreState} from "../store";
import { setKokoroEndpoint } from "../store/ipc/action";

declare global {
  interface Window {
    require: any;
  }
}
const { ipcRenderer } = window.require("electron");

let store: Store<StoreState, AnyAction> | null = null;

export const setStore = (s: typeof store) => {
  store = s;
}

ipcRenderer.on("kokoro", (event: any, message: any) => {
  console.log("kokoro reply received:", message);
  if (store) {
    store.dispatch(setKokoroEndpoint(message as string));
  }
});

export const sendKokoroEndpointRequest = () => {
  ipcRenderer.send("kokoro");
}