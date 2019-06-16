import {
  ipcMain,
} from "electron";
import { KokoroServer } from "./kokoroServer";

export class IpcMain {
  registerKokoroServerListener(kokoroServer: KokoroServer): void {
    ipcMain.on("kokoro-endpoint", (event: any, arg: any) => {
      console.log("ipc: kokoro-endpoint request message received");
      event.reply("kokoro-endpoint", kokoroServer.kokoroEndpoint);
    });

    ipcMain.on("gateway-endpoint", (event: any, arg: any) => {
      console.log("ipc: gateway-endpoint request message received");
      event.reply("gateway-endpoint", kokoroServer.gatewayEndpoint);
    });
  }
}
