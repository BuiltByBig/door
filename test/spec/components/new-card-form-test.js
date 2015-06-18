'use strict';

const React = require('react/addons');
const TestUtils = require('react/lib/ReactTestUtils');
const NewCardForm = require('components/new-card-form');

describe('<NewCardForm />', () => {
  let element
  let spy

  beforeEach(() => {
    spy = sinon.spy()
    element = TestUtils.renderIntoDocument(<NewCardForm handleSubmit={spy} />)
  })

  it('renders', () => {
    expect(element).to.be.defined
  })

  it('should have a name input field', () => {
    TestUtils.findRenderedDOMComponentWithClass(element, 'name-field')
  })

  it('should have a code input field', () => {
    TestUtils.findRenderedDOMComponentWithClass(element, 'code-field')
  })

  it('should have a submit button', () => {
    TestUtils.findRenderedDOMComponentWithClass(element, 'submit-button')
  })

  it('should be passed a handleSubmit prop', () => {
    element.props.handleSubmit.should.be.a('function')
  })

  it('should call the handleSubmit prop when clicking the submit button with card details', () => {
    let nameField = TestUtils.findRenderedDOMComponentWithClass(element, 'name-field')
    nameField.getDOMNode().value = 'Foo'

    let codeField = TestUtils.findRenderedDOMComponentWithClass(element, 'code-field')
    codeField.getDOMNode().value = 'bar'

    let button = TestUtils.findRenderedDOMComponentWithTag(element, 'button')
    TestUtils.Simulate.click(button)

    sinon.assert.calledWith(spy, {
      name: 'Foo',
      code: 'bar'
    })
  })
})
