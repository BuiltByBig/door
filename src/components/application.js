import React from 'react/addons'
import NewCardForm from 'components/new-card-form'
import ActiveCardList from 'components/active-card-list'
import FontAwesome from 'react-fontawesome'

const ReactTransitionGroup = React.addons.TransitionGroup

// CSS
require('normalize.css')
require('../styles/main.less')

const Application = React.createClass({

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
      <div className='container'>
        <div className='logo'>
          <FontAwesome name='lock' />
        </div>
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
