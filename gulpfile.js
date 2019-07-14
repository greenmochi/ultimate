const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const del = require("del");

const gulp = require("gulp");
const series = gulp.series;
const parallel = gulp.parallel;
const src = gulp.src;
const dest = gulp.dest;

function installUI(done) {
  const script = exec("yarn install", {
    cwd: path.resolve(__dirname, "ui"),
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
    cwd: path.resolve(__dirname, "electron"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    done(error);
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
    done(error);
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
    done(error);
  });
  return script;
}

function buildUI(done) {
  const script = exec("yarn build", {
    cwd: path.resolve(__dirname, "ui"),
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
    cwd: path.resolve(__dirname, "electron"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    done(error);
  });
  return script;
}

function prePackageTask(done) {
  const buildDir = "./build";
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  const ui = () => src("ui/build/**/*").pipe(dest("build/ui"));
  const electron = () => src("electron/build/**/*").pipe(dest("build/electron"));
  const gateway = () => src("services/gateway/build/**/*").pipe(dest("build/services/gateway"));
  const nyaa = () => src("services/nyaa/build/**/*").pipe(dest("build/services/nyaa"));
  return parallel(ui, electron, gateway, nyaa)(done);
}

function packageRelease(done) {
  const cmd = `"node_modules/.bin/electron-builder" -c.extraMetadata.main=./build/electron/bundle.js`;
  const script = exec(cmd, {
    cwd: path.join(__dirname),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    done(error);
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

function removeNodeModules() {
  return del([
    "ui/node_modules",
    "electron/node_modules",
  ]);
}

const install = parallel(installUI, installElectron);
const start = parallel(startUI, startElectron);
const build = parallel(buildUI, buildElectron);
const package = series(prePackageTask, packageRelease);
const clean = parallel(removeUIBuild, removeElectronBuild);
const uninstall = series(clean, parallel(removeNodeModules));

module.exports = {
  "install": install,
  "start": start,
  "build": build,
  "package": package,
  "clean": clean,
  "uninstall": uninstall,
};