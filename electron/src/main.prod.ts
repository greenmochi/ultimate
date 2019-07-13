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
    kokoroServer = new KokoroServer("ultimate-kokoro.exe", binaryPath, "localhost", 9111, 9990);
    kokoroServer.run();

    console.log(`Running kokoro server. binaryPath=${binaryPath} endpoint=${kokoroServer.kokoroEndpoint}`);

    ipcMain.registerKokoroServerListener(kokoroServer);
  } else {
    console.log("binaryPath length is not valid: length=", binaryPath.length);
  }

  console.log(app.getAppPath());
  mainWindow = new MainWindow(path.join(app.getAppPath(), "build/ui/index.html"), true, 900, 1200);
  mainWindow.create();
  mainWindow.sendAfter("ultimate:kokoroServerEndpointResponse", kokoroServer.kokoroEndpoint);
  mainWindow.sendAfter("ultimate:gatewayServerEndpointResponse", kokoroServer.gatewayEndpoint);
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