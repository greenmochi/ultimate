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

  registerEndpointsListener() {
    ipcRenderer.on("kabedon:kokoroServerEndpointResponse", (event: Event, kokoroServerEndpoint: string) => {
      console.log("kokoro server listening on", kokoroServerEndpoint);
      if (this.store) {
        this.store.dispatch(setKokoroEndpoint(kokoroServerEndpoint));
      }
    });
    ipcRenderer.on("kabedon:gatewayServerEndpointResponse", (event: Event, gatewayServerEndpoint: string) => {
      console.log("gateway server listening on", gatewayServerEndpoint);
      if (this.store) {
        this.store.dispatch(setGatewayEndpoint(gatewayServerEndpoint));
      }
    });
  }
}

