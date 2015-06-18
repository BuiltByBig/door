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

        it('should call handleEdit when clicked', () => {
          TestUtils.Simulate.click(button)
          sinon.assert.calledOnce(editSpy)
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
          sinon.assert.calledOnce(deleteSpy)
        })
      })
    })
  })
})

