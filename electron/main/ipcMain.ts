import {
  ipcMain, Event,
} from "electron";
import { KokoroServer } from "./kokoroServer";

export class IpcMain {
  registerKokoroServerListener(kokoroServer: KokoroServer): void {
    ipcMain.on("ultimate:kokoroServerEndpointRequest", (event: Event) => {
      event.sender.send("ultimate:kokoroServerEndpointResponse", kokoroServer.kokoroEndpoint);
    });

    ipcMain.on("ultimate:gatewayServerEndpointRequest", (event: Event) => {
      event.sender.send("ultimate:gatewayServerEndpointResponse", kokoroServer.gatewayEndpoint);
    });
  }
}
