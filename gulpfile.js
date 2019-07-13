const path = require("path");
const exec = require("child_process").exec;
const del = require("del");

const gulp = require("gulp");
const series = gulp.series;
const parallel = gulp.parallel;

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

function removeUIBuild() {
  return del([
    "ui/build",
  ]);
}

function removeElectronBuild() {
  return del([
    "electron/build",
  ]);
}

function removeUINodeModules() {
  return del([
    "ui/node_modules",
  ]);
}


function removeElectronNodeModules() {
  return del([
    "electron/node_modules",
  ]);
}

module.exports = {
  "install": parallel(installUI, installElectron),
  "start": series(install, parallel(startUI, startElectron)),
  "build": parallel(buildUI, buildElectron),
  "clean": parallel(removeUIBuild, removeElectronBuild),
  "uninstall": parallel(removeUINodeModules, removeElectronNodeModules),
};