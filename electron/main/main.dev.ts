import { 
  app, 
} from "electron";
import { KokoroServer } from "./kokoroServer";
import { IpcMain } from "./ipcMain";
import { MainWindow } from "./browserWindow";

let mainWindow: MainWindow | null;
let kokoroServer: KokoroServer | null = null;
let ipcMain: IpcMain = new IpcMain();

app.on("ready", () => {
  // Test with json-server, or set to different port if you have another mock server
  kokoroServer = new KokoroServer("fake-binary-that-doesn't-exist.exe", "fake-path", "localhost", 9111, 8000);
  ipcMain.registerKokoroServerListener(kokoroServer);

  mainWindow = new MainWindow("http://localhost:3000", false, 900, 1200);
  mainWindow.create();
  mainWindow.registerDevtools();
  mainWindow.sendAfter("kokoro-endpoint", kokoroServer.kokoroEndpoint);
  mainWindow.sendAfter("gateway-endpoint", kokoroServer.gatewayEndpoint);
});

app.on("window-all-closed", async () => {
  if (kokoroServer) {
    await kokoroServer.close();
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = new MainWindow("http://localhost:3000", false, 900, 1200);
    mainWindow.create();
    mainWindow.registerDevtools();
    mainWindow.sendAfter("kokoro-endpoint", kokoroServer.kokoroEndpoint);
    mainWindow.sendAfter("gateway-endpoint", kokoroServer.gatewayEndpoint);
  }
});