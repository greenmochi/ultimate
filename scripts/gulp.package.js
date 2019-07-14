const path = require("path");
const exec = require("child_process").exec;

const gulp = require("gulp");
const parallel = gulp.parallel;
const src = gulp.src;
const dest = gulp.dest;

function prePackageTask(done) {
  const ui = () => src("ui/build/**/*").pipe(dest("build/ui"));
  const electron = () => src("electron/build/**/*").pipe(dest("build/electron"));
  const gateway = () => src("services/gateway/build/**/*").pipe(dest("build/services/gateway"));
  const nyaa = () => src("services/nyaa/build/**/*").pipe(dest("build/services/nyaa"));
  const torrent = () => src("services/torrent/dist/torrent/**/*").pipe(dest("build/services/torrent"));
  return parallel(ui, electron, gateway, nyaa, torrent)(done);
}

function packageRelease(done) {
  const cmd = `"node_modules/.bin/electron-builder" -c.extraMetadata.main=build/electron/bundle.js`;
  const script = exec(cmd, {
    cwd: process.cwd(),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    done(error);
  });
  return script;
}

module.exports = {
  prePackageTask,
  packageRelease,
};