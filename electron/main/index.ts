import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

const NODE_ENV: string = process.env.NODE_ENV;

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  if (NODE_ENV == "dev") {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.once('dom-ready', () => {
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
app.on("ready", createWindow);

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
  event.reply(process.argv[0]);
  //process.argv.forEach((val, index) => {
  //  console.log(`${index}: ${val}`);
  //});
});