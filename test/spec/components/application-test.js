'use strict'

const React = require('react/addons')
const TestUtils = require('react/lib/ReactTestUtils')
const Application = require('components/application')
const NewCardForm = require('components/new-card-form')
const ActiveCardList = require('components/active-card-list')

describe('<Application />', () => {
  let element

  beforeEach(() => {
    element = TestUtils.renderIntoDocument(<Application />)
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
    it('should replace the card in the list with a new card', () => {
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
      let newCard = {
        name: 'John',
        code: 'asdf'
      }
      element._handleEdit(0, newCard)
      element.state.cards.should.have.length(1)
      element.state.cards[0].name.should.eql('John')
      element.state.cards[0].code.should.eql('asdf')
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
