import CardList from '../src/models/card-list'
import listCards from '../src/list-cards'

describe('List cards', () => {
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

    listCards({}, res)


    return expect(promise)
      .to.eventually.deep.equal(cards)
      .then(() => {
        sinon.assert.calledWith(res.json, cards)
      })
  })
})
