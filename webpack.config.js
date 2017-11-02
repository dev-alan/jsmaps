const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let home_page = new HtmlWebpackPlugin({
  title: 'Homepage Layout',
  template: './src/pages/index.hbs',
  filename: 'index.html',
  chunks: ['index'],
  files: {
    'css': ['css/index.css'],
    'js': ['js/index.js']
  },
  alwaysWriteToDisk: true
});
let default_page = new HtmlWebpackPlugin({
  title: 'Default Layout',
  template: './src/pages/default.hbs',
  filename: 'default.html',
  chunks: ['internal'],
  files: {
    'css': ['css/internal.css'],
    'js': ['js/internal.js']
  },
  alwaysWriteToDisk: true
});
let styles = new ExtractTextPlugin('assets/css/[name].styles.css');

module.exports = {
  entry: {
    index: './src/index.js',
    internal: './src/internal.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'assets/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
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
              publicPath: '/',
              name: 'assets/img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    home_page,
    default_page,
    styles,
    new CopyWebpackPlugin([
      {
        from: 'src/assets/jsmaps/maps/australia.js',
        to: 'assets/js/australia.js'
      },
      {
        from: 'src/images/',
        to: 'images/'
      }
    ], {
      ignore: [
        '*.psb'
      ]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'Tether': 'tether',
      'window.Tether': 'tether',
      Raphael: ['webpack-raphael']
    })
  ]
};