import { BrowserWindow } from "electron";
import { IpcMain } from "./ipcMain";

export interface WindowSettings {
    url?: string;
    fileUri?: string;
    height: number;
    width: number;
}

export default class Window {
  private window: BrowserWindow | null;
  private settings: WindowSettings | null;

  constructor(settings: WindowSettings) {
    this.settings = settings;
    this.createWindow();
  }

  private createWindow(): void {
    this.window = new BrowserWindow({
      height: this.settings.height,
      width: this.settings.width,
      webPreferences: {
        nodeIntegration: true,
      },
      frame: true,
    });

    if (this.settings.fileUri) {
      this.window.loadFile(this.settings.fileUri);
    } else {
      this.window.loadURL(this.settings.url);
    }
    
    this.window.on("closed", () => {
      this.window = null;
    });
  }

  registerWindowsButtonListener() {
    IpcMain.RegisterWindowsButtonListener(this.window);
  }

  registerDevtools(): void {
    if (!this.window) {
      console.log("unable to register devtools because main window is null");
      return;
    }

    this.window.webContents.once('dom-ready', async () => {
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

      this.window.webContents.openDevTools()
    })
  }


  sendAfterDidFinishLoad(channel: string, ...args: any[]): void {
    this.window.webContents.on("did-finish-load", () => {
      this.window.webContents.send(channel, ...args);
    });
  }
}