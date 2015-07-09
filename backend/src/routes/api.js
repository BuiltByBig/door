var express = require('express')
var CardsHandler = require('../list-cards')

var router = express.Router()

router.get('/cards', CardsHandler.list)
router.post('/cards', CardsHandler.update)

module.exports = router
