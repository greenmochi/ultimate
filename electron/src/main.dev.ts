import { app } from "electron";
import { IpcMain } from "./ipcMain";
import Window from "./window";

let mainWindow: Window | null;

app.on("ready", () => {
  IpcMain.RegisterGatewayServerListener("http://localhost:9990");

  mainWindow = new Window({ url: "http://localhost:3000", height: 900, width: 1200 });
  mainWindow.registerWindowsButtonListener();
  mainWindow.registerDevtools();
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
    mainWindow.registerDevtools();
    mainWindow.sendAfterDidFinishLoad("ultimate:gatewayServerEndpointResponse", "http://localhost:9990");
  }
});