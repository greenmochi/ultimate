import * as child from "child_process";

export function RunService(binary: string, cwd: string, args: string[] = []) {
  const spawn = child.spawn(binary, args, { cwd: cwd });
  spawn.stdout.pipe(process.stdout);
  spawn.stderr.pipe(process.stderr);
  spawn.on("close", (code) => {
    console.log(`close: ${binary} from ${cwd} process exited with code ${code}`);
  })
  spawn.on("error", (data) => {
    console.log(`error: ${data}, binary=${binary}, cwd=${cwd}, args=${args}`);
  })
  return spawn;
}