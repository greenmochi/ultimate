// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import { ipcRenderer } from "electron";


//let btn: HTMLButtonElement | null =  document.querySelector("button");
//if (btn) {
//  btn.addEventListener("click", () => {
//    console.log("hello");
//    ipcRenderer.send("alive-message", "i'm alive");
//  });
//}

//ipcRenderer.on("alive-reply", (event: any, arg: any) => {
//  console.log("alive-reply", arg);
//});