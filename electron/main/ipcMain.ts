import {
  ipcMain, Event,
} from "electron";
import { KokoroServer } from "./kokoroServer";

export class IpcMain {
  registerKokoroServerListener(kokoroServer: KokoroServer): void {
    ipcMain.on("kabedon:kokoroServerEndpointRequest", (event: Event) => {
      event.sender.send("kabedon:kokoroServerEndpointResponse", kokoroServer.kokoroEndpoint);
    });

    ipcMain.on("kabedon:gatewayServerEndpointRequest", (event: Event) => {
      event.sender.send("kabedon:gatewayServerEndpointResponse", kokoroServer.gatewayEndpoint);
    });
  }
}
