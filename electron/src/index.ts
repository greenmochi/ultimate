if (process.env.NODE_ENV == "development") {
  module.exports = import("./main.dev");
} else if (process.env.NODE_ENV == "staging") {
  module.exports = import("./main.staging");
} else {
  module.exports = import("./main.prod");
}