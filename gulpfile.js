const path = require("path");
const exec = require("child_process").exec;
const del = require("del");
const gulp = require("gulp");

function startUI() {
  const script = exec("yarn start", {
    cwd: path.resolve(__dirname, "ui"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  return script;
}

function installUI(cb) {
  const script = exec("yarn install", {
    cwd: path.resolve(__dirname, "ui"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  return script;
}

function buildUI(cb) {
  const script = exec("yarn build", {
    cwd: path.resolve(__dirname, "ui"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  return script;
}

function removeUIBuild() {
  return del([
    "ui/build",
  ]);
}

function removeUINodeModules() {
  return del([
    "ui/node_modules",
  ]);
}

function startElectron() {
  const script = exec("yarn start", {
    cwd: path.resolve(__dirname, "electron"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  return script;
}

function installElectron(cb) {
  const script = exec("yarn install", {
    cwd: path.resolve(__dirname, "electron"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  return script;
}

function buildElectron(cb) {
  const script = exec("yarn build", {
    cwd: path.resolve(__dirname, "electron"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  return script;
}

function removeElectronBuild() {
  return del([
    "electron/build",
  ]);
}

function removeElectronNodeModules() {
  return del([
    "electron/node_modules",
  ]);
}

const install = gulp.parallel(
  installUI,
  installElectron,
);
const start = gulp.series(
  install,
  gulp.parallel(
    startUI,
    startElectron,
  ),
);
const build = gulp.parallel(
  buildUI,
  buildElectron
);
const clean = gulp.parallel(
  removeUIBuild,
  removeElectronBuild
);
const uninstall = gulp.parallel(
  removeUINodeModules,
  removeElectronNodeModules
);

module.exports = {
  "start": start,
  "install": install,
  "build": build,
  "clean": clean,
  "uninstall": uninstall,
};