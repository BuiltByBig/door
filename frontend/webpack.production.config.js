var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./webpack.config')
var CompressionPlugin = require('compression-webpack-plugin')

console.log(chalk.green('Using production config for WebPack'))

config.plugins.unshift(
  new webpack.optimize.UglifyJsPlugin({
    exclude: [/node_modules/]
  }),
  new CompressionPlugin({
    asset: '{file}.gz',
    algorithm: 'gzip'
    //regExp: /\.js$|\.html$/,
    //threshold: 10240,
    //minRatio: 0.8
  }),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify({
      NODE_ENV: 'production'
    })
  })
)

config.devtool = 'sourcemap'
config.output.filename = '[hash].[name].js'

module.exports = config
