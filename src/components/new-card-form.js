import React from 'react'

export default React.createClass({

  displayName: 'NewCardForm',

  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },

  _handleSubmit(e) {
    this.props.handleSubmit({
      name: this.refs.name.getDOMNode().value,
      code: this.refs.code.getDOMNode().value
    })
  },

  render() {
    return (
      <form>
        <input
          className='name-field'
          ref='name'
          type='text'
        />
        <input
          className='code-field'
          ref='code'
          type='text'
        />
        <button
          className='submit-button'
          onClick={this._handleSubmit}
        >
          Submit
        </button>
      </form>
    )
  }
})
