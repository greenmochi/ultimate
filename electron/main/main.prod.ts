import { 
  app, 
  BrowserWindow, 
  ipcMain,
} from "electron";
import * as path from "path";
import { KokoroServer } from "./kokoro";

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 900,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
  });

  mainWindow.loadFile(path.join(__dirname, "../../build/index.html"));
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("kokoro-endpoint", kokoroServer.kokoroEndpoint);
    mainWindow.webContents.send("gateway-endpoint", kokoroServer.gatewayEndpoint);
  });
}

let kokoroServer: KokoroServer | null = null;

app.on("ready", () => {
  let binaryPath: string = path.resolve("./resources/app.asar.unpacked/service")
  if (binaryPath.length > 0) {
    kokoroServer = new KokoroServer("kabedon-kokoro.exe", binaryPath, "localhost", 9111, 9990);
    kokoroServer.run();
    console.log(`Running kokoro server. binaryPath=${binaryPath} endpoint=${kokoroServer.kokoroEndpoint}`);
  } else {
    console.log("binaryPath length is not valid: length=", binaryPath.length);
  }

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (kokoroServer) {
      kokoroServer.close();
    }
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("kokoro-endpoint", (event: any, arg: any) => {
  console.log("ipc: kokoro-endpoint request message received");
  event.reply("kokoro-endpoint", kokoroServer.kokoroEndpoint);
});

ipcMain.on("gateway-endpoint", (event: any, arg: any) => {
  console.log("ipc: gateway-endpoint request message received");
  event.reply("gateway-endpoint", kokoroServer.gatewayEndpoint);
});