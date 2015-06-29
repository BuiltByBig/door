import React from 'react/addons'
import NewCardForm from 'components/new-card-form'
import ActiveCardList from 'components/active-card-list'
import FontAwesome from 'react-fontawesome'
import Cards from 'models/cards'

const ReactTransitionGroup = React.addons.TransitionGroup

// CSS
require('normalize.css')
require('../styles/application.less')

const Application = React.createClass({

  displayName: 'Application',

  getInitialState() {
    return {
      cards: []
    }
  },

  componentWillMount(){
    this._fetchCards()
  },

  _fetchCards() {
    return Cards.fetch()
      .then(cards => {
        this.setState({
          cards: cards
        })
      })
      .catch(err => {
        this.setState({
          errorMessage: err.message
        })
      })
  },

  _handleSubmit(card) {
    this.state.cards.push(card)
    this.setState({
      cards: this.state.cards
    })
  },

  _handleEdit(index, newCard) {
    this.state.cards.splice(index, 1, newCard)
    this.setState({
      cards: this.state.cards
    })
    return Cards
      .update(this.state.cards)
      .catch(err => {
        this.setState({
          errorMessage: err.message
        })
      })
  },

  _handleDelete(index) {
    this.state.cards.splice(index, 1)
    this.setState({
      cards: this.state.cards
    })
  },

  render() {
    let errorMessage
    if (this.state.errorMessage) {
      errorMessage = (
        <div className='alert alert-danger'>
          {this.state.errorMessage}
        </div>
      )
    }

    return (
      <div className='container'>
        <div className='logo'>
          <FontAwesome name='lock' />
        </div>
        {errorMessage}
        <NewCardForm
          handleSubmit={this._handleSubmit}
        />
        <ActiveCardList
          cards={this.state.cards}
          handleEdit={this._handleEdit}
          handleDelete={this._handleDelete}
        />
      </div>
    )
  }
})

export default Application

React.render(<Application />, document.body)
