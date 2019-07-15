const path = require("path");
const exec = require("child_process").exec;

function buildUI(done) {
  const script = exec("yarn build", {
    cwd: path.resolve(process.cwd(), "ui"),
    env: {
      "NODE_ENV": "production",
    },
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    done(error);
  });
  return script;
}

function buildElectron(done) {
  const script = exec("yarn build", {
    cwd: path.resolve(process.cwd(), "electron"),
    env: {
      "NODE_ENV": "production",
    },
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    done(error);
  });
  return script;
}

module.exports = {
  buildUI,
  buildElectron,
};