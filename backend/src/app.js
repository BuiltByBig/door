require('dotenv').load()

var chalk = require('chalk')
var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var auth = require('./middleware/basic-auth')
var api = require('./routes/api')

app.use(bodyParser.json())

// Use auth on all routes
app.use(auth)

// Serve static assets
var STATIC_PATH = path.resolve(__dirname, '../../frontend/dist/')
console.log(chalk.gray('Hosting static files from:', STATIC_PATH))
app.use(express.static(STATIC_PATH))

// Serve the API
app.use('/api', api)

var port = process.env.PORT || 3000
app.listen(port)

console.log(chalk.green('Server started port', port))
