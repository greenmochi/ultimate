const del = require("del");

function cleanUIBuild() {
  return del([
    "ui/build",
  ]);
}

function cleanElectronBuild() {
  return del([
    "electron/build",
  ]);
}

function cleanNodeModules() {
  return del([
    "ui/node_modules",
    "electron/node_modules",
  ]);
}

module.exports = {
  cleanUIBuild,
  cleanElectronBuild,
  cleanNodeModules,
};