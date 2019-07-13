import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";

export class MainWindow {
  private mainWindow: BrowserWindow | null;

  private url: string;
  private urlIsFile: boolean;
  private height: number; 
  private width: number;

  constructor(
    url: string,
    urlIsFile: boolean,
    height: number,
    width: number,
  ) {
    this.url = url;
    this.urlIsFile = urlIsFile;
    this.height = height;
    this.width = width;
  }

  create(): void {
    this.mainWindow = new BrowserWindow({
      height: this.height,
      width: this.width,
      webPreferences: {
        nodeIntegration: true,
      },
      frame: false,
    });

    if (this.urlIsFile) {
      this.mainWindow.loadFile(this.url);
    } else {
      this.mainWindow.loadURL(this.url);
    }
    
    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    });
    this.mainWindow.webContents.openDevTools();
    console.log(path.resolve("."));
    console.log(path.resolve("./../../ui/build/index.html"));
  }

  registerWindowsButtonListener() {
    ipcMain.on("ultimate:windowsMinimizeRequest", (event: Event) => {
      if (!this.mainWindow) {
        console.log("unable to minimize window because main window is null");
        return;
      }
      this.mainWindow.minimize();
    });
    ipcMain.on("ultimate:windowsMaximizeRequest", (event: Event) => {
      if (!this.mainWindow) {
        console.log("unable to maximize window because main window is null");
        return;
      }
      this.mainWindow.maximize();
    });
    ipcMain.on("ultimate:windowsUnmaximizeRequest", (event: Event) => {
      if (!this.mainWindow) {
        console.log("unable to Unmaximize window because main window is null");
        return;
      }
      this.mainWindow.unmaximize();
    });
    ipcMain.on("ultimate:windowsCloseRequest", (event: Event) => {
      if (!this.mainWindow) {
        console.log("unable to close window because main window is null");
        return;
      }
      this.mainWindow.close();
    });
  }

  registerDevtools(): void {
    if (!this.mainWindow) {
      console.log("unable to register devtools because main window is null");
      return;
    }

    this.mainWindow.webContents.once('dom-ready', async () => {
      const devtools = await import("electron-devtools-installer");
      const installExtension = devtools.default;
      const {
        REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS,
      } = devtools;

      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added extension: ${name}`))
        .catch((err) => console.log("An error occurred: ", err));

      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added extension: ${name}`))
        .catch((err) => console.log("An error occurred: ", err));

      this.mainWindow.webContents.openDevTools()
    })
  }


  sendAfter(channel: string, ...args: any[]): void {
    this.mainWindow.webContents.on("did-finish-load", () => {
      this.mainWindow.webContents.send(channel, ...args);
    });
  }
}