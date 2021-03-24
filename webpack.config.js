const path = require("path");

module.exports = {
  entry: "./js/modul-10.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
};
