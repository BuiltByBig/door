import fs from 'fs'
import CardList from '../../src/models/card-list'

describe('CardList', () => {
  describe('.read()', () => {
    let cards

    beforeEach(() => {
      cards = [
        {
          name: 'Foo Bar',
          code: '00000989898'
        },
        {
          name: 'John Smith',
          code: '00000123456'
        },
        {
          name: 'Joe Maker',
          code: '1234'
        }
      ]

      sinon.stub(fs, 'readFile', (path, cb) => {
        return cb(null, JSON.stringify(cards))
      })
    })

    afterEach(() => {
      fs.readFile.restore()
    })

    it('should open a file for reading', () => {
      let promise = CardList.read()

      sinon.assert.called(fs.readFile)

      return expect(promise)
        .to.eventually.deep.equal(cards)
    })

    xit('should handle invalid JSON format', () => {

    })
  })
})
