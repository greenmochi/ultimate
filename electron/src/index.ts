if (process.env.NODE_ENV == "production") {
  module.exports = import("./main.prod");
} else {
  module.exports = import("./main.dev");
}