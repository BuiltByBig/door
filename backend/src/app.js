var chalk = require('chalk')
var express = require('express')
var app = express()
var listCards = require('./list-cards')

app.get('/api/cards', listCards)

var port = process.env.PORT || 3000

console.log(chalk.green('Starting server on port', port))

app.listen(port)
