import {
  BrowserWindow,
} from "electron";

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


  sendAfter(channel: string, message: string): void {
    this.mainWindow.webContents.on("did-finish-load", () => {
      this.mainWindow.webContents.send(channel, message);
    });
  }
}