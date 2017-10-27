const path = require('path');

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          // path.resolve(__dirname, "app/src"),
          // path.resolve(__dirname, "app/test")
        ],
        loader: 'style!css'
      }
    ]
  }
};