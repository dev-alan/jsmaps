const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let homepage = new HtmlWebpackPlugin({
  title: 'home',
  template: './src/index.ejs',
  filename: '../index.html'
});
let styles = new ExtractTextPlugin('styles.css')

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist/assets/'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /.less$/,
        use: styles.extract({
          use: [
            {
              loader: 'css-loader'
            }, {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /.(sass|scss)$/,
        use: styles.extract({
          use: [
            {
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        include: [
          // path.resolve(__dirname, "app/src"),
          // path.resolve(__dirname, "app/test")
        ],
        use: styles.extract({
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          limit: 50000,
          name: 'fonts/[name].[ext]'
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            } 
          }
        ]
      }
    ]
  },
  plugins: [
    homepage,
    styles,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    })
  ]
};