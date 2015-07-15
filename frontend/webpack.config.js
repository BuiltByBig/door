var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

require('dotenv').load()

var DIST = 'dist'
var SOURCE = 'src'
var APP_NAME = 'Doorlock'

module.exports = {
  entry: {
    bundle: [
      './src/index.js'
      //path.join('.', SOURCE, 'components/application.js')
    ]
  },
  output: {
    path: path.join(__dirname, DIST),
    filename: '[hash].[name].js'

    // Uncomment and change if you will host your
    // frontend code on a different host than your
    // server code:
    //publicPath: assetHost + '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: process.env.NODE_ENV || 'development'

        // Put any other environment variables you want
        // access to in your frontend code here. Access
        // them in your code like you would in node.js:
        // `process.env.NODE_ENV`
      })
    }),
    new HtmlWebpackPlugin({
      template: path.join(SOURCE, 'index.html'),
      inject: true,
      minify: true,

      // Custom attributes to use in template.
      // Define as many as you'd like:
      pageTitle: APP_NAME
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
      },
      // Uncomment if you want to use data URLs
      // for images:
      //{
        //test: /\.(svg|png|jpg)$/,
        //loader: 'url?limit=10000'
      //},
      {
        test: /\.(svg|woff|woff2|eot|dtd|png|gif|jpg|jpeg|ttf)(\?.*)?$/,
        loader: 'file?name=[hash].[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'app': path.join(process.cwd(), SOURCE)
    },
    modulesDirectories: ['node_modules']
  }
}
