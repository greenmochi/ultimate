const path = require("path");
const exec = require("child_process").exec;

function startUI(cb) {
  const script = exec("yarn start", {
    cwd: path.resolve(process.cwd(), "ui"),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  script.on("exit", (code, signal) => {
    console.log(`ui process exited with code ${code} and signal ${signal}`);
    cb();
  });
  return script;
}

function startElectron(cb) {
  const script = exec("yarn start", {
    cwd: path.resolve(process.cwd(), "electron"),
    env: {
      "NODE_ENV": "development",
    },
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  script.on("exit", (code, signal) => {
    console.log(`electron process exited with code ${code} and signal ${signal}`);
    cb();
  });
  return script;
}

function startGateway(cb) {
  const cmd = `"services/gateway/build/gateway"`;
  const script = exec(cmd, {
    cwd: path.resolve(process.cwd()),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  script.on("exit", (code, signal) => {
    console.log(`gateway process exited with code ${code} and signal ${signal}`);
    cb();
  });
  return script;
}

function startNyaa(cb) {
  const cmd = `"services/nyaa/build/nyaa"`;
  const script = exec(cmd, {
    cwd: path.resolve(process.cwd()),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  script.on("exit", (code, signal) => {
    console.log(`nyaa process exited with code ${code} and signal ${signal}`);
    cb();
  });
  return script;
}

function startMyAnimeList(cb) {
  const cmd = `"services/myanimelist/build/myanimelist"`;
  const script = exec(cmd, {
    cwd: path.resolve(process.cwd()),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  script.on("exit", (code, signal) => {
    console.log(`myanimelist process exited with code ${code} and signal ${signal}`);
    cb();
  });
  return script;
}

function startYoutubeDL(cb) {
  const cmd = `"services/youtube-dl/dist/youtube-dl/youtube-dl"`;
  const script = exec(cmd, {
    cwd: path.resolve(process.cwd()),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  script.on("exit", (code, signal) => {
    console.log(`youtube-dl process exited with code ${code} and signal ${signal}`);
    cb();
  });
  return script;
}

function startAtlas(cb) {
  const cmd = `"services/atlas/build/atlas"`;
  const script = exec(cmd, {
    cwd: path.resolve(process.cwd()),
  });
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stderr.on("error", (error) => {
    cb(error);
  });
  script.on("exit", (code, signal) => {
    console.log(`atlas process exited with code ${code} and signal ${signal}`);
    cb();
  });
  return script;
}

module.exports = {
  startUI,
  startElectron,
  startGateway,
  startNyaa,
  startMyAnimeList,
  startYoutubeDL,
  startAtlas,
};