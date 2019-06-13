if (process.env.NODE_ENV == "production") {
  module.exports = import("./main.prod");
} else if (process.env.NODE_ENV == "staging") {
  module.exports = import("./main.staging");
} else {
  module.exports = import("./main.dev");
}