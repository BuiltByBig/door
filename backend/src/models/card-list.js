var path = require('path')
var fs = require('fs')

var CARDS_FILE = path.join(process.env.HOME, 'users.json')

exports.CARDS_FILE = CARDS_FILE


module.exports = {
  read: function () {
    return new Promise(function (resolve, reject) {
      fs.readFile(CARDS_FILE, function (err, cards) {
        if (err) {
          reject(err)
        }

        resolve(JSON.parse(cards))
      })
    })
  }
}
