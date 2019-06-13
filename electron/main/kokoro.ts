import * as child from "child_process";
import fetch from "node-fetch";

// KokoroServer contains the methods needed to control the kabedon-kokoro server.
export class KokoroServer {

  private _binary: string;
  private _cwd: string;
  private _host: string;
  private _kokoroPort: number;
  private _gatewayPort: number;

  private _server: child.ChildProcess | null;

  constructor(binary: string, cwd: string, host: string, kokoroPort: number, gatewayPort: number) {
    this._binary = binary;
    this._cwd = cwd;
    this._host = host;
    this._kokoroPort = kokoroPort;
    this._gatewayPort = gatewayPort
  }

  get binary(): string {
    return this._binary;
  }

  get cwd(): string {
    return this._cwd;
  }

  get host(): string {
    return this._host;
  }

  get kokoroPort(): number {
    return this._kokoroPort;
  }

  get kokoroEndpoint(): string {
    return `http://${this._host}:${this._kokoroPort}`;
  }

  get gatewayEndpoint(): string {
    return `http://${this._host}:${this._gatewayPort}`;
  }

  run(): void {
    this._server = child.spawn(`./${this._binary}`, [
      `--kokoro-port=${this._kokoroPort}`,
      `--gateway-port=${this._gatewayPort}`,
    ], {
      cwd: this._cwd,
    });
    this._server.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    this._server.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`)
    });
    this._server.on("close", (code) => {
      console.log(`close: child process (kokoro server) exited with code ${code}`);
    })
    this._server.on("error", (data) => {
      console.log(`error: ${data}`)
    })
  }

  async close<T>(): Promise<T> {
    console.log(`sending a shutdown request to ${this._kokoroPort}/shutdown`);
    return fetch(`${this._kokoroPort}/shutdown`)
      .then(response => {
        if (!response.ok) {
          console.log(`unable to send shutdown request to ${this._kokoroPort} status=${response.status}`);
        }
        console.log(`shutdown request received status=${response.status}`);
        return response.json();
      }).catch(error => {
        console.log(error);
      })
  }
}

