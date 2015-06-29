'use strict';

const React = require('react/addons');
const TestUtils = require('react/lib/ReactTestUtils');
const NewCardForm = require('components/new-card-form');

describe('<NewCardForm />', () => {
  let element
  let handleSubmitSpy

  beforeEach(() => {
    handleSubmitSpy = sinon.spy()
    element = TestUtils.renderIntoDocument(<NewCardForm handleSubmit={handleSubmitSpy} />)
  })

  it('renders', () => {
    expect(element).to.be.defined
  })

  it('should have a name input field', () => {
    expect(element.refs.name).to.exist
  })

  it('should have a code input field', () => {
    expect(element.refs.code).to.exist
  })

  it('should have a submit button', () => {
    expect(element.refs.submit).to.exist
    expect(element.refs.submit.getDOMNode().innerHTML).to.eql('Add New Card')
  })

  it('should have a placeholder for each field', () => {
    expect(element.refs.name.getDOMNode().placeholder).to.eql('Full name...')
    expect(element.refs.code.getDOMNode().placeholder).to.eql('RFID code...')
  })

  it('should be passed a handleSubmit prop', () => {
    element.props.handleSubmit.should.be.a('function')
  })

  it('should call preventDefault when calling _handleSubmit', () => {
    let eventSpy = sinon.spy()
    let event = {
      preventDefault: eventSpy
    }
    element._handleSubmit(event)
    sinon.assert.called(eventSpy)
  })

  it('should call the handleSubmit prop when clicking the submit button with card details', () => {
    // debugger
    let nameField = element.refs.name
    let codeField = element.refs.code

    sinon.spy(nameField.getDOMNode(), 'focus')

    nameField.getDOMNode().value = 'Foo'
    codeField.getDOMNode().value = 'bar'

    TestUtils.Simulate.click(element.refs.submit)

    sinon.assert.calledWith(handleSubmitSpy, {
      name: 'Foo',
      code: 'bar'
    })

    expect(nameField.getDOMNode().value).to.eql('')
    expect(codeField.getDOMNode().value).to.eql('')

    sinon.assert.called(nameField.getDOMNode().focus)
  })

  it('should require both name and code to submit', () => {
    TestUtils.Simulate.click(element.refs.submit)
    sinon.assert.notCalled(handleSubmitSpy)
  })
})
