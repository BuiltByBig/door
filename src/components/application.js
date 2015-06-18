import React from 'react/addons'
import NewCardForm from 'components/new-card-form'
import ActiveCardList from 'components/active-card-list'

const ReactTransitionGroup = React.addons.TransitionGroup

// CSS
require('normalize.css')
require('../styles/main.css')

export default React.createClass({

  displayName: 'Application',

  getInitialState() {
    return {
      cards: []
    }
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
  },

  _handleDelete(index) {
    this.state.cards.splice(index, 1)
    this.setState({
      cards: this.state.cards
    })
  },

  render() {
    return (
      <div>
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
