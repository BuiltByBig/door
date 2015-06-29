import React from 'react/addons'
import TestUtils from 'react/lib/ReactTestUtils'
import ActiveCardList from 'components/active-card-list'

describe('<ActiveCardList />', () => {
  let deleteSpy
  let editSpy

  beforeEach(() => {
    deleteSpy = sinon.spy()
    editSpy = sinon.spy()
  })

  it('should be passed a handleDelete prop', () => {
    let element = TestUtils.renderIntoDocument(
      <ActiveCardList
        handleEdit={editSpy}
        handleDelete={deleteSpy}
      />
    )
    element.props.handleDelete.should.be.a('function')
  })

  it('should set activeCardIndex to null by default', () => {
    let element = TestUtils.renderIntoDocument(
      <ActiveCardList
        handleEdit={editSpy}
        handleDelete={deleteSpy}
      />
    )
    expect(element.state.activeCardIndex).to.be.null
  })

  describe('without active cards', () => {
    const message = 'Sorry, there are no active cards'

    it('displays a message if cards are not passed in', () => {
      let element = TestUtils.renderIntoDocument(
        <ActiveCardList
          handleEdit={editSpy}
          handleDelete={deleteSpy}
        />
      )
      element.getDOMNode().innerHTML.should.contain(message)
    })

    it('displays a message if an empty list of cards is passed in', () => {
      let element = TestUtils.renderIntoDocument(
        <ActiveCardList
          handleEdit={editSpy}
          handleDelete={deleteSpy}
          cards={[]}
        />
      )
      element.getDOMNode().innerHTML.should.contain(message)
    })
  })

  describe('with active cards', () => {
    let element
    let activeCards
    let cards

    beforeEach(() => {
      activeCards = [
        {
          name: 'John H. Smith',
          code: '1234'
        },
        {
          name: 'Zack',
          code: 'asdf'
        },
        {
          name: 'Dana',
          code: 'qwerty'
        }
      ]
      element = TestUtils.renderIntoDocument(
        <ActiveCardList
          handleEdit={editSpy}
          handleDelete={deleteSpy}
          cards={activeCards}
        />
      )
      cards = TestUtils.scryRenderedDOMComponentsWithTag(element, 'li')
    })

    it('has a list of active cards', () => {
      TestUtils.findRenderedDOMComponentWithTag(element, 'ul')
    })

    it('display all passed in cards', () => {
      cards.length.should.eql(3)
    })

    describe('each card', () => {
      it('should show name and code', () => {
        cards.forEach((card, index) => {
          let expected = activeCards[index]
          let html = card.getDOMNode().innerHTML
          html.should.contain(expected.name)
          html.should.contain(expected.code)
        })
      })

      describe('edit button', () => {
        let button

        beforeEach(() => {
          button = TestUtils.findRenderedDOMComponentWithClass(cards[0], 'edit-button')
        })

        it('should exist', () => {
          button.getDOMNode().innerHTML.should.contain('Edit')
        })

        it('should call _handleEdit when clicked', () => {
          sinon.spy(element, '_handleEdit')
          expect(element.state.activeCardIndex).to.be.null
          TestUtils.Simulate.click(button)
          sinon.assert.called(element._handleEdit)
          expect(element.state.activeCardIndex).to.eql(0)
        })

        describe('editing', () => {
          beforeEach(() => {
            TestUtils.Simulate.click(button)
          })

          it('should set state.activeCardIndex', () => {
            expect(element.state.activeCardIndex).to.eql(0)
          })

          it('should change card name and code to input fields', () => {
            expect(element.refs.name).to.exist
            expect(element.refs.code).to.exist
          })

          it('should populate fields with current values', () => {
            let nameField = element.refs.name.getDOMNode()
            let codeField = element.refs.code.getDOMNode()
            expect(nameField.value).to.eql(activeCards[0].name)
            expect(codeField.value).to.eql(activeCards[0].code)
          })

          it('should have a save button', () => {
            let submit = element.refs.submit
            expect(submit).to.exist
            expect(submit.getDOMNode().innerHTML).to.eql('Save')
          })

          it('should call _handleSaveCard when save button is clicked', () => {
            sinon.spy(element, '_handleSaveCard')
            element.refs.name.getDOMNode().value = 'Dude'
            element.refs.code.getDOMNode().value = 'qwerty'
            TestUtils.Simulate.click(element.refs.submit)
            sinon.assert.called(element._handleSaveCard)
            sinon.assert.calledWith(
              editSpy,
              0,
              {
                name: 'Dude',
                code: 'qwerty'
              }
            )
            expect(element.state.activeCardIndex).to.be.null
          })

          it('should call preventDefault when calling _handleSaveCard', () => {
            let eventSpy = sinon.spy()
            let event = {
              preventDefault: eventSpy
            }
            element._handleSaveCard(event)
            sinon.assert.called(eventSpy)
          })

          it('should set other card edit buttons to be disabled', () => {
            let editButtons = TestUtils.scryRenderedDOMComponentsWithClass(element, 'edit-button')
            editButtons.forEach((btn, index) => {
              if (element.state.activeCardIndex !== index) {
                expect(btn.getDOMNode().disabled).to.be.true
              }
            })
          })

          it('should hide edit and delete buttons for card being edited', () => {
            let editButton = TestUtils.scryRenderedDOMComponentsWithClass(cards[0], 'edit-button')
            expect(editButton).to.be.empty

            let deleteButton = TestUtils.scryRenderedDOMComponentsWithClass(cards[0], 'delete-button')
            expect(deleteButton).to.be.empty
          })

          it('should have a cancel editing button', () => {
            expect(element.refs.cancel).to.exist
          })

          it('should cancel editing when cancel button is clicked', () => {
            sinon.spy(element, '_handleCancelEditing')
            TestUtils.Simulate.click(element.refs.cancel)
            sinon.assert.called(element._handleCancelEditing)
            expect(element.state.activeCardIndex).to.be.null
          })

          it('should prevent default when clicking cancel button', () => {
            let eventSpy = sinon.spy()
            let event = {
              preventDefault: eventSpy
            }
            element._handleCancelEditing(event)
            sinon.assert.called(eventSpy)
          })
        })
      })

      describe('delete button', () => {
        let button

        beforeEach(() => {
          button = TestUtils.findRenderedDOMComponentWithClass(cards[0], 'delete-button')
        })

        it('should exist', () => {
          button.getDOMNode().innerHTML.should.contain('Delete')
        })

        it('should call handleDelete when clicked', () => {
          TestUtils.Simulate.click(button)
          sinon.assert.calledWith(deleteSpy, 0)
        })
      })
    })
  })
})

