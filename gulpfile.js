const gulp = require("gulp");
const series = gulp.series;
const parallel = gulp.parallel;

const { startUI, startElectron, startGateway, } = require("./scripts/gulp.start");
const { buildUI, buildElectron, } = require("./scripts/gulp.build");
const { installUI, installElectron, } = require("./scripts/gulp.install");
const { prePackageTask, packageRelease, } = require("./scripts/gulp.package");
const { cleanUIBuild, cleanElectronBuild, cleanNodeModules, } = require("./scripts/gulp.clean");

const install = parallel(installUI, installElectron);
const start = parallel(startUI, startElectron, startGateway);
const build = parallel(buildUI, buildElectron);
const package = series(prePackageTask, packageRelease);
const clean = parallel(cleanUIBuild, cleanElectronBuild, cleanNodeModules);

module.exports = {
  "install": install,
  "start": start,
  "build": build,
  "package": package,
  "clean": clean,
};