import React from "react";
declare global {
  interface Window {
    require: any;
  }
}
const {ipcRenderer} = window.require("electron");

export interface Props {
  value?: string;
  onClick?(): void;
}

export class Button extends React.Component<Props, {}> {
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
    const {
      value,
      onClick,
    } = this.props;
    return (
      <button onClick={this.handleOnClick}>button here</button>
    );
  }
}
