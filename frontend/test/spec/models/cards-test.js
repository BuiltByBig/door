import Cards from 'models/cards'
import mockRequest from '../../helpers/mock-request'

describe('Cards', () => {
  describe('.fetch()', () => {
    it('should properly construct the query', done => {
      let response = {
        body: {
          cards: [
            {
              name: 'Bill',
              code: '123'
            },
            {
              name: 'Jane',
              code: 'uyiou'
            }
          ]
        }
      }
      let mockReq = mockRequest(null, response)
      sinon.stub(Cards, '_request').returns(mockReq)
      Cards
        .fetch()
        .then(resp => {
          expect(mockReq.method).to.eql('GET')
          expect(mockReq.url).to.eql('/api/cards')
          expect(mockReq.headers['Accept']).to.eql('application/json')
          expect(resp.length).to.eql(2)
        })
        .finally(() => {
          Cards._request.restore()
          done()
        })
    })

    it('should catch errors from the API', done => {
      let mockReq = mockRequest(new Error('Shit broke'), null)
      sinon.stub(Cards, '_request').returns(mockReq)
      Cards
        .fetch()
        .catch(err => {
          expect(err).to.exist
          expect(err.message).to.eql('Shit broke')
        })
        .finally(() => {
          Cards._request.restore()
          done()
        })
    })
  })

  describe('.update()', () => {
    it('should update the list of cards', done => {
      let cards = []
      let mockReq = mockRequest(null, null)
      sinon.stub(Cards, '_request').returns(mockReq)
      Cards
        .update(cards)
        .then(() => {
          expect(mockReq.method).to.eql('PUT')
          expect(mockReq.url).to.eql('/api/cards')
          expect(mockReq.headers['Accept']).to.eql('application/json')
        })
        .finally(() => {
          Cards._request.restore()
          done()
        })
    })

    it('should update the list of cards', done => {
      let cards = []
      let mockReq = mockRequest(new Error('Bad stuff'), null)
      sinon.stub(Cards, '_request').returns(mockReq)
      Cards
        .update(cards)
        .catch(err => {
          expect(err).to.exist
          expect(err.message).to.eql('Bad stuff')
        })
        .finally(() => {
          Cards._request.restore()
          done()
        })
    })
  })
})
