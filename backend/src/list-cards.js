var CardList = require('./models/card-list')

module.exports = function (req, res) {
  CardList
    .read()
    .then(function (cards) {
      res.json(cards)
    })
    .catch(function (err) {
      res.json(err)
    })
}
