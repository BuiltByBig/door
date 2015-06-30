var CardList = require('./models/card-list')

module.exports = {
  update: function (req, res) {
    CardList
      .write(req.body)
      .then(function (cards) {
        res.json(cards)
      })
      .catch(function (err) {
        res.json(err)
      })
  },

  list: function (req, res) {
    CardList
      .read()
      .then(function (cards) {
        res.json(cards)
      })
      .catch(function (err) {
        res.json(err)
      })
  }
}
