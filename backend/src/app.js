var chalk = require('chalk')
var express = require('express')
var path = require('path')
var app = express()
var listCards = require('./list-cards')

var STATIC_PATH = path.resolve(__dirname, '../../frontend/dist/')
console.log(chalk.gray('Hosting static files from:', STATIC_PATH))
app.use(express.static(STATIC_PATH))

app.get('/api/cards', listCards)

var port = process.env.PORT || 3000
app.listen(port)

console.log(chalk.green('Server started port', port))
