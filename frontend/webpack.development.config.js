var chalk = require('chalk')
var config = require('./webpack.config')

console.log(chalk.green('Using development config for WebPack'))

config.devtool = 'eval'

module.exports = config
