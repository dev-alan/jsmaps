const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let homepage = new HtmlWebpackPlugin({
  title: 'Welcome',
  template: './src/index.ejs',
  filename: 'index.html',
  alwaysWriteToDisk: true
});
let styles = new ExtractTextPlugin('assets/styles.css');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'assets/bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /^australia.js$/,
        use: []
      },
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
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: 'assets/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    homepage,
    styles,
    new CopyWebpackPlugin([
      {
        from: 'src/assets/jsmaps/maps/australia.js', to: 'assets/js/australia.js'
      }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Raphael: ['webpack-raphael'],
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    })
  ]
};