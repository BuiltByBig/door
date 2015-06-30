import CardList from '../src/models/card-list'
import CardsHandler from '../src/list-cards'

describe('List cards', () => {
  describe('.list()', () => {
    let cards
    let promise

    beforeEach(() => {
      cards = [
        {
          name: 'Batman',
          code: '00000123456'
        },
        {
          name: 'Fake Person',
          code: '223344'
        }
      ]

      promise = Promise.resolve(cards)

      sinon.stub(CardList, 'read', () => promise)
    })

    afterEach(() => {
      CardList.read.restore()
    })

    it('should return a list of cards from the API', () => {
      let res = {
        json: sinon.spy()
      }

      CardsHandler.list({}, res)


      return expect(promise)
        .to.eventually.deep.equal(cards)
        .then(() => {
          sinon.assert.calledWith(res.json, cards)
        })
    })
  })

  describe('.update()', () => {
    let cards
    let promise

    beforeEach(() => {
      cards = [
        {
          name: 'Batman',
          code: '00000123456'
        },
        {
          name: 'Fake Person',
          code: '223344'
        }
      ]

      promise = Promise.resolve(cards)

      sinon.stub(CardList, 'write', () => promise)
    })

    afterEach(() => {
      CardList.write.restore()
    })

    it('should return a list of cards from the API', () => {
      let res = {
        json: sinon.spy()
      }

      CardsHandler.update({
        body: cards
      }, res)

      return expect(promise)
        .to.eventually.deep.equal(cards)
        .then(() => {
          sinon.assert.calledWith(CardList.write, cards)
          sinon.assert.calledWith(res.json, cards)
        })
    })
  })
})
