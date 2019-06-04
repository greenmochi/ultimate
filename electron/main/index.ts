import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import installExtension, { 
  REACT_DEVELOPER_TOOLS, 
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";

const NODE_ENV: string = process.env.NODE_ENV;

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
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
    mainWindow.webContents.once('dom-ready', () => {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added extension: ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added extension: ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
      mainWindow.webContents.openDevTools()
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  //let kokoro: KokoroServer = new KokoroServer("localhost", 3222);
  //kokoro.spawn();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
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