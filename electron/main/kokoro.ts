import * as child from "child_process";

// KokoroServer contains the methods needed to control the kabedon-kokoro server.
export class KokoroServer {

  private _host: string;
  private _port: number;

  private _server: child.ChildProcess | null;

  constructor(host: string, port: number) {
    this._host = host;
    this._port = port;
  }

  get host(): string {
    return this._host;
  }

  get port(): number {
    return this._port;
  }

  // We need to spawn kabedon-kokoro server by executing as a child process and then 
  // detaching from it to make it stand-alone.
  public spawn(): void {
    this._server = child.spawn("ls", ["-la", "~"]);
    this._server.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    this._server.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`)
    });
    this._server.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    })
  }

  // Check whether or not kabedon-kokoro is alive
  public ping(): void {
  }

  // Shutdown kabedon-kokoro server
  public close(): void {
  }
}

