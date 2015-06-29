'use strict'

const Promise = require('bluebird')
const React = require('react/addons')
const TestUtils = require('react/lib/ReactTestUtils')
const Application = require('components/application')
const NewCardForm = require('components/new-card-form')
const ActiveCardList = require('components/active-card-list')
const Cards = require('models/cards')

describe('<Application />', () => {
  let element

  beforeEach(() => {
    sinon.stub(Cards, 'fetch', Promise.resolve)
    element = TestUtils.renderIntoDocument(<Application />)
  })

  afterEach(() => {
    Cards.fetch.restore()
  })

  it('renders', () => {
    expect(element).to.be.defined
  })

  it('should contain a new card form', () => {
    TestUtils.findRenderedComponentWithType(element, NewCardForm)
  })

  it('should show a list of active cards', () => {
    TestUtils.findRenderedComponentWithType(element, ActiveCardList)
  })

  it('should have an initial state', () => {
    element.state.should.eql({
      cards: []
    })
  })

  it('should pass a handleSubmit callback to NewCardForm', () => {
    let newCardForm = TestUtils.findRenderedComponentWithType(element, NewCardForm)
    newCardForm.props.handleSubmit.should.eql(element._handleSubmit)
  })


  describe('componetWillMount', function () {
    it('should call cards.fetch() and update state.cards', () => {
      sinon.assert.calledOnce(Cards.fetch)
    })
      // TODO Assert setState is called with new cards

    xit('should set state.errorMessage when the api returns an error', () => {

    })
  })

  it('should pass cards to ActiveCardList', () => {
    let cards = [
      {
        name: 'Foo',
        code: 'bar'
      }
    ]
    element.setState({
      cards: cards
    })
    let activeCardList = TestUtils.findRenderedComponentWithType(element, ActiveCardList)
    activeCardList.props.cards.should.eql(cards)
  })

  it('should fetch a list of cards from the API', () => {
    sinon.assert.called(Cards.fetch)
  })

  describe('_handleSubmit()', () => {
    it('should update the card list with a new card', () => {
      let cards = [
        {
          name: 'Foo',
          code: 'bar'
        }
      ]
      element.setState({
        cards: cards
      })
      element.state.cards.should.have.length(1)
      let card = {
        name: 'Catman',
        code: 'cats'
      }
      element._handleSubmit(card)
      element.state.cards.should.have.length(2)
      element.state.cards[1].name.should.eql('Catman')
    })
  })

  describe('_handleEdit()', () => {
    let cards
    let newCard

    beforeEach(() => {
      cards = [
        {
          name: 'Foo',
          code: 'bar'
        }
      ]
      newCard = {
        name: 'John',
        code: 'asdf'
      }

      element.setState({
        cards
      })

      element.state.cards.should.have.length(1)
    })

    afterEach(()=>{
      Cards.update.restore()
    })

    it('should replace the card in the list with a new card', () => {
      sinon.stub(Cards, 'update', Promise.resolve)
      element._handleEdit(0, newCard)
      element.state.cards.should.have.length(1)
      element.state.cards[0].name.should.eql('John')
      element.state.cards[0].code.should.eql('asdf')
    })

    it('should call the Cards model with the updated list of cards', () => {
      sinon.stub(Cards, 'update', Promise.resolve)
      element._handleEdit(0, newCard)
      sinon.assert.calledWith(Cards.update, element.state.cards)
    })

    it('should set errorMessage if an error occurs while updating', done => {
      sinon.stub(Cards, 'update', () => {
        return Promise.reject(new Error('Server broke'))
      })
      element._handleEdit(0, newCard)
        .finally(err => {
          expect(element.state.errorMessage).to.eql('Server broke')
          done()
        })
    })
  })

  describe('_handleDelete()', () => {
    it('should remove the card from the list', () => {
      let cards = [
        {
          name: 'Foo',
          code: 'bar'
        },
        {
          name: 'Biz',
          code: 'bap'
        }
      ]
      element.setState({
        cards: cards
      })
      element.state.cards.should.have.length(2)
      element._handleDelete(1)
      element.state.cards.should.have.length(1)
      element.state.cards[0].name.should.eql('Foo')
    })
  })
})
