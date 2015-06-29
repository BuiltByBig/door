import React from 'react'
import '../styles/active-card-list.less'

export default React.createClass({

  displayName: 'ActiveCardList',

  propTypes: {
    cards: React.PropTypes.array,
    handleEdit: React.PropTypes.func.isRequired,
    handleDelete: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      cards: []
    }
  },

  getInitialState() {
    return {
      activeCardIndex: null
    }
  },

  _handleEdit(index) {
    this.setState({
      activeCardIndex: index
    })
  },

  _handleSaveCard(e) {
    e.preventDefault()
    let name = this.refs.name.getDOMNode().value
    let code = this.refs.code.getDOMNode().value
    this.props.handleEdit(
      this.state.activeCardIndex,
      {
        name,
        code
      }
    )
    this.setState({
      activeCardIndex: null
    })
  },

  _handleCancelEditing(e) {
    e.preventDefault()
    this.setState({
      activeCardIndex: null
    })
  },

  render() {
    if (!this.props.cards.length) {
      return <p className='no-card-message'>Sorry, there are no active cards yet :-(</p>
    }

    let cards = this.props.cards.map((card, index) => {
      let content

      // Show the form for the active card
      if (index === this.state.activeCardIndex) {
        content = (
          <form className='card-edit-form'>
            <input
              className='name-field'
              defaultValue={card.name}
              ref='name'
            />
            <input
              className='code-field'
              defaultValue={card.code}
              ref='code'
            />
            <button
              className='btn-primary'
              onClick={(e) => {
                this._handleSaveCard(e)
              }}
              ref='submit'
              type='submit'
            >
              Save
            </button>
            <button
              className='btn-danger'
              onClick={(e) => {
                this._handleCancelEditing(e)
              }}
              ref='cancel'
            >
              Cancel
            </button>
          </form>
        )

      // Another card is being edited.
      } else {
        let disabled = this.state.activeCardIndex !== null &&
                       this.state.activeCardIndex >= 0

        content = (
          <div>
            <span className='button-group'>
              <button
                className='btn-primary edit-button'
                disabled={disabled}
                onClick={() => {
                  this._handleEdit(index)
                }}
              >
                Edit
              </button>
              <button
                className='btn-danger delete-button'
                onClick={this.props.handleDelete.bind(null, index)}
              >
                Delete
              </button>
            </span>
            <strong className='name'>{card.name}</strong>
            <em className='code'>{card.code}</em>
          </div>
        )

      }

      return (
        <li key={index}>
          {content}
        </li>
      )
    })

    return <ul className='active-card-list'>{cards}</ul>
  }
})
