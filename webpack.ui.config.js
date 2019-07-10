const path = require("path");

module.exports = {
  entry: "./ultimate/ui/src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build/ui"),
    filename: "ui.bundle.js"
  },
  resolve: {
    extensions: [".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};