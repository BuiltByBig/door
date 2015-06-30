import request from 'superagent'
import Promise from 'bluebird'

export default {
  fetch() {
    return new Promise((resolve, reject) => {
      this._request()
        .get('/api/cards')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            return reject(err)
          }
          let cards = res.body
          resolve(cards)
        })
    })
  },

  update(cards) {
    return new Promise((resolve, reject) => {
      this._request()
        .post('/api/cards')
        .send(cards)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            return reject(err)
          }
          resolve()
        })
    })
  },

  /**
   * Simple wrapper aroundr request to allow
   * stubbing in tests.
   *
   * @returns {Object} A Superagent request object
   */
  _request() {
    return request
  }
}
