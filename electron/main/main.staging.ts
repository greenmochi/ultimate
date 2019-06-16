import { 
  app, 
  BrowserWindow, 
  ipcMain,
} from "electron";
import * as path from "path";
import { KokoroServer } from "./kokoro";

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 900,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000");
  mainWindow.webContents.once('dom-ready', async () => {
    const devtools = await import("electron-devtools-installer");
    const {
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = devtools;
    const installExtension = devtools.default;
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added extension: ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added extension: ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
    mainWindow.webContents.openDevTools()
  })
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("kokoro-endpoint", kokoroServer.kokoroEndpoint);
    mainWindow.webContents.send("gateway-endpoint", kokoroServer.gatewayEndpoint);
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

let kokoroServer: KokoroServer | null = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  let binaryPath: string = path.resolve("./service");
  if (binaryPath.length > 0) {
    kokoroServer = new KokoroServer("kabedon-kokoro.exe", binaryPath, "localhost", 9111, 9990);
    kokoroServer.run();
    console.log(`Running kokoro server. binaryPath=${binaryPath} endpoint=${kokoroServer.kokoroEndpoint}`);
  } else {
    console.log("binaryPath length is not valid: length=", binaryPath.length);
  }

  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", async () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    if (kokoroServer) {
      await kokoroServer.close();
    }
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
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