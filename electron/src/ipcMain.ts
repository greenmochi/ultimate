import { ipcMain, Event, BrowserWindow, } from "electron";

export class IpcMain {
  static Send(window: BrowserWindow, channel: string, ...args: any[]): void {
    window.webContents.send(channel, ...args);
  }

  static RegisterGatewayServerListener(endpoint: string): void {
    ipcMain.on("ultimate:gatewayServerEndpointRequest", (event: Event) => {
      event.sender.send("ultimate:gatewayServerEndpointResponse", endpoint);
    });
  }

  static RegisterWindowsButtonListener(window: BrowserWindow) {
    ipcMain.on("ultimate:windowsMinimizeRequest", (event: Event) => {
      if (!window) {
        console.log("unable to minimize window because main window is null");
        return;
      }
      window.minimize();
    });
    ipcMain.on("ultimate:windowsMaximizeRequest", (event: Event) => {
      if (!window) {
        console.log("unable to maximize window because main window is null");
        return;
      }
      window.maximize();
    });
    ipcMain.on("ultimate:windowsUnmaximizeRequest", (event: Event) => {
      if (!window) {
        console.log("unable to Unmaximize window because main window is null");
        return;
      }
      window.unmaximize();
    });
    ipcMain.on("ultimate:windowsCloseRequest", (event: Event) => {
      if (!window) {
        console.log("unable to close window because main window is null");
        return;
      }
      window.close();
    });
  }
}
