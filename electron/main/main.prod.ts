import { app } from "electron";
import * as path from "path";

import { KokoroServer } from "./kokoroServer";
import { IpcMain } from "./ipcMain";
import { MainWindow } from "./browserWindow";

let mainWindow: MainWindow | null;
let kokoroServer: KokoroServer | null = null;
let ipcMain: IpcMain = new IpcMain();

app.on("ready", () => {
  let binaryPath: string = path.resolve("./resources/app.asar.unpacked/service")
  if (binaryPath.length > 0) {
    kokoroServer = new KokoroServer("kabedon-kokoro.exe", binaryPath, "localhost", 9111, 9990);
    kokoroServer.run();

    console.log(`Running kokoro server. binaryPath=${binaryPath} endpoint=${kokoroServer.kokoroEndpoint}`);

    ipcMain.registerKokoroServerListener(kokoroServer);
  } else {
    console.log("binaryPath length is not valid: length=", binaryPath.length);
  }

  mainWindow = new MainWindow(path.join(__dirname, "../../build/index.html"), true, 900, 1200);
  mainWindow.create();
  mainWindow.sendAfter("kabedon:kokoroServerEndpointResponse", kokoroServer.kokoroEndpoint);
  mainWindow.sendAfter("kabedon:gatewayServerEndpointResponse", kokoroServer.gatewayEndpoint);
});

app.on("window-all-closed", async () => {
  if (kokoroServer) {
    kokoroServer.close();
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = new MainWindow(path.join(__dirname, "../../build/index.html"), true, 900, 1200);
    mainWindow.create();
    mainWindow.sendAfter("kokoro-endpoint", kokoroServer.kokoroEndpoint);
    mainWindow.sendAfter("gateway-endpoint", kokoroServer.gatewayEndpoint);
  }
});