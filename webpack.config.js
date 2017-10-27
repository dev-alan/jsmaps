const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let homepage = new HtmlWebpackPlugin({
  title: 'home',
  template: './src/index.ejs'
});

module.exports = {
  entry: './src/entry.js',
  output: {
    path: __dirname + '/dist',
    filename: "bundle.min.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /.less$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          // path.resolve(__dirname, "app/src"),
          // path.resolve(__dirname, "app/test")
        ],
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    homepage
  ]
};