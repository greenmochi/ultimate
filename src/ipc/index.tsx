import { 
  Store, 
  AnyAction,
} from "redux";
import { StoreState } from "../store";
import { 
  setKokoroEndpoint, 
  setGatewayEndpoint,
} from "../store/api/action";

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

// export const sendKokoroEndpointRequest = () => {
//   ipcRenderer.send("kokoro-endpoint");
//   ipcRenderer.send("gateway-endpoint");
// }

ipcRenderer.on("kokoro-endpoint", (event: any, message: any) => {
  console.log("ipc: kokoro-endpoint reply received:", message);
  if (store) {
    store.dispatch(setKokoroEndpoint(message as string));
  }
});

ipcRenderer.on("gateway-endpoint", (event: any, message: any) => {
  console.log("ipc: gateway-endpoint reply received:", message);
  if (store) {
    store.dispatch(setGatewayEndpoint(message as string));
  }
});