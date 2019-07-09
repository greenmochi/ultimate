import { 
  Store, 
  AnyAction,
} from "redux";
import { StoreState } from "../store";
import { 
  setKokoroEndpoint, 
  setGatewayEndpoint,
} from "../store/api/action";

const { ipcRenderer, Event } = window.require("electron");

export default class IpcRenderer {
  private store: Store<StoreState, AnyAction> | null;

  constructor(store: Store<StoreState, AnyAction>) {
    this.store = store;
  }

  static send(channel: string, ...args: any[]) {
    ipcRenderer.send(channel, ...args);
  }
  
  registerEndpointsListener() {
    ipcRenderer.on("ultimate:kokoroServerEndpointResponse", (event: Event, kokoroServerEndpoint: string) => {
      console.log("kokoro server listening on", kokoroServerEndpoint);
      if (this.store) {
        this.store.dispatch(setKokoroEndpoint(kokoroServerEndpoint));
      }
    });
    ipcRenderer.on("ultimate:gatewayServerEndpointResponse", (event: Event, gatewayServerEndpoint: string) => {
      console.log("gateway server listening on", gatewayServerEndpoint);
      if (this.store) {
        this.store.dispatch(setGatewayEndpoint(gatewayServerEndpoint));
      }
    });
  }
}