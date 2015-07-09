require('dotenv').load()

var chalk = require('chalk')
var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var CardsHandler = require('./list-cards')

app.use(bodyParser.json())

var STATIC_PATH = path.resolve(__dirname, '../../frontend/dist/')
console.log(chalk.gray('Hosting static files from:', STATIC_PATH))
app.use(express.static(STATIC_PATH))

app.get('/api/cards', CardsHandler.list)
app.post('/api/cards', CardsHandler.update)

var port = process.env.PORT || 3000
app.listen(port)

console.log(chalk.green('Server started port', port))
