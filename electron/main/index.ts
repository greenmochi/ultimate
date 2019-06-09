import { 
  app, 
  BrowserWindow, 
  ipcMain,
} from "electron";
import * as path from "path";
import { KokoroServer } from "./kokoro";

const NODE_ENV: string = process.env.NODE_ENV;

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  console.log("path: " + path.resolve("."));
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 900,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  if (NODE_ENV == "development") {
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
      mainWindow.webContents.send("test", "localhost message test");
    })
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../build/index.html"));
  }

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
  createWindow();

  let binaryPath: string = "";
  if (NODE_ENV == "development") {
    binaryPath = path.resolve("./service");
  } else {
    binaryPath = path.resolve("./resources/app.asar.unpacked/service")
  }
  if (binaryPath.length <= 0) {
    console.log("binaryPath length is not valid: length=", binaryPath.length);
  } else {
    kokoroServer = new KokoroServer("kabedon-kokoro.exe", binaryPath, "localhost", 9111);
    kokoroServer.run();
    console.log(`Running kokoro server. binaryPath=${binaryPath} endpoint=${kokoroServer.endpoint}`);
  }
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    kokoroServer.close();
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

ipcMain.on("alive-message", (event: any, arg: any) => {
  console.log("alive message received");
  event.reply("alive-reply", process.argv[0]);
});