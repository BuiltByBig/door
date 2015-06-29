import React from 'react'
import 'app/styles/new-card-form.less'

export default React.createClass({

  displayName: 'NewCardForm',

  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },

  _handleSubmit(e) {
    e.preventDefault()
    let nameField = this.refs.name.getDOMNode()
    let codeField = this.refs.code.getDOMNode()
    let nameValue = nameField.value
    let codeValue = codeField.value

    if (nameValue && codeValue) {
      this.props.handleSubmit({
        name: nameValue,
        code: codeValue
      })

      nameField.value = ''
      codeField.value = ''

      nameField.focus()
    }
  },

  render() {
    return (
      <form className='new-card-form'>
        <input
          className='name-field'
          placeholder='Full name...'
          ref='name'
          type='text'
        />
        <input
          className='code-field'
          placeholder='RFID code...'
          ref='code'
          type='text'
        />
        <button
          className='submit-button'
          onClick={this._handleSubmit}
          ref='submit'
        >
          Add New Card
        </button>
      </form>
    )
  }
})
