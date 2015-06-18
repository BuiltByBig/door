import React from 'react'

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

  render() {
    if (!this.props.cards.length) {
      return <p>Sorry, there are no active cards</p>
    }

    let cards = this.props.cards.map((card, index) => {
      return (
        <li key={index}>
          {card.name} - {card.code}
          <button
            className='edit-button'
            onClick={this.props.handleEdit}
          >
            Edit
          </button>
          <button
            className='delete-button'
            onClick={this.props.handleDelete}
          >
            Delete
          </button>
        </li>
      )
    })

    return <ul>{cards}</ul>
  }
})
