import { reduceInput, inputInitialState, InputState } from '@app/state/input/reducer'
import {
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
  updateInputValue,
} from '@app/actions/ui'

describe('reduce input state', () => {
  it('should handle ENTER_INPUT_VALUE', () => {
    expect(
      reduceInput(inputInitialState, enterInputValue('hello')),
    ).toMatchSnapshot()
  })

  const historyValues = ['hello', 'world']

  describe('at the begin of history', () => {
    const initialState: InputState = {
      ...inputInitialState,
      history: {
        ...inputInitialState.history,
        values: historyValues,
        index: 0,
      },
    }

    it('should handle GO_BACK_INPUT_HISTORY', () => {
      expect(reduceInput(initialState, goBackInputHistory())).toMatchSnapshot()
    })
  })

  describe('anywhere in history', () => {
    const initialState = {
      ...inputInitialState,
      history: {
        ...inputInitialState.history,
        values: historyValues,
        index: 1,
      },
    }

    it('should handle GO_BACK_INPUT_HISTORY', () => {
      expect(reduceInput(initialState, goBackInputHistory())).toMatchSnapshot()
    })

    it('should handle GO_FORWARD_INPUT_HISTORY', () => {
      expect(
        reduceInput(initialState, goForwardInputHistory()),
      ).toMatchSnapshot()
    })

    it('should handle UPDATE_INPUT_VALUE', () => {
      expect(
        reduceInput(initialState, updateInputValue('hello')),
      ).toMatchSnapshot()
    })
  })

  describe('at the end of history', () => {
    const initialState = {
      ...inputInitialState,
      history: {
        ...inputInitialState.history,
        values: historyValues,
        index: 2,
      },
    }

    it('should handle GO_FORWARD_INPUT_HISTORY', () => {
      expect(
        reduceInput(initialState, goForwardInputHistory()),
      ).toMatchSnapshot()
    })

    it('should handle UPDATE_INPUT_VALUE', () => {
      expect(
        reduceInput(initialState, updateInputValue('hello')),
      ).toMatchSnapshot()
    })
  })
})
