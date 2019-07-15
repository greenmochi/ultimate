import { app } from "electron";
import * as path from "path";

import { IpcMain } from "./ipcMain";
import Window from "./window";
import * as service from "./service";

function runAllServices() {
  let servicesPath: string = path.resolve(app.getAppPath(), "../app.asar.unpacked/build/services")
  if (!servicesPath) {
    console.log(`Unable to path to services directory. Please check if it exist at resources/app.asar.unpacked/build/services from the application directory.`);
    return;
  }
  service.RunService("gateway", path.resolve(servicesPath, "gateway"));
  service.RunService("nyaa", path.resolve(servicesPath, "nyaa"));
  service.RunService("torrent", path.resolve(servicesPath, "torrent"));
}
runAllServices();

let mainWindow: Window | null;

app.on("ready", () => {
  IpcMain.RegisterGatewayServerListener("http://localhost:9990");

  mainWindow = new Window({ fileUri: "build/ui/index.html", height: 900, width: 1200 });
  mainWindow.registerWindowsButtonListener();
  mainWindow.sendAfterDidFinishLoad("ultimate:gatewayServerEndpointResponse", "http://localhost:9990");
});

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = new Window({ url: "http://localhost:3000", height: 900, width: 1200 });
    mainWindow.registerWindowsButtonListener();
    mainWindow.sendAfterDidFinishLoad("ultimate:gatewayServerEndpointResponse", "http://localhost:9990");
  }
});