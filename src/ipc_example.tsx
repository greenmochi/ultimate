import React from "react";
declare global {
  interface Window {
    require: any;
  }
}
const { ipcRenderer } = window.require("electron");

export interface IButton {
  value?: string;
  onClick?(): void;
}

export class Button extends React.Component<IButton, {}> {
  constructor(props: any) {
    super(props);
    ipcRenderer.on("alive-reply", (event: any, arg: any) => {
      console.log("alive-reply", arg);
    });
  }

  handleOnClick = () => {
    ipcRenderer.send("alive-message", "im alive");
  }

  render() {
    return (
      <button onClick={this.handleOnClick}>button here</button>
    );
  }
}

ipcRenderer.on("test", (event: any, message: any) => {
  console.log("test channel:", message);
})