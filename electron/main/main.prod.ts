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
  });

  mainWindow.loadFile(path.join(__dirname, "../../build/index.html"));
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

let kokoroServer: KokoroServer | null = null;

app.on("ready", () => {
  let binaryPath: string = path.resolve("./resources/app.asar.unpacked/service")
  if (binaryPath.length > 0) {
    kokoroServer = new KokoroServer("kabedon-kokoro.exe", binaryPath, "localhost", 9111);
    kokoroServer.run();
    console.log(`Running kokoro server. binaryPath=${binaryPath} endpoint=${kokoroServer.endpoint}`);
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

ipcMain.on("kokoro", (event: any, arg: any) => {
  console.log("kokoro request message received");
  event.reply("kokoro", kokoroServer.endpoint);
});