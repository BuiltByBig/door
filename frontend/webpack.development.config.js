var chalk = require('chalk')
var config = require('./webpack.config')

require('dotenv').load()

console.log(chalk.green('Using development config for WebPack'))

config.devtool = 'eval'
config.output.filename = '[name].js'
config.output.publicPath = process.env.ASSET_HOST

module.exports = config
