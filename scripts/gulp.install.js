const path = require("path");
const exec = require("child_process").exec;

function installUI(done) {
  const script = exec("yarn install", {
    cwd: path.resolve(process.cwd(), "ui"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    done(error);
  });
  return script;
}

function installElectron(done) {
  const script = exec("yarn install", {
    cwd: path.resolve(process.cwd(), "electron"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    done(error);
  });
  return script;
}

module.exports = {
  installUI,
  installElectron,
};