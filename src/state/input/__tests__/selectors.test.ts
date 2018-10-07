import {
  getInput,
  getInputValue,
  getInputDirtyValue,
  getInputHistory,
} from '@app/state/input/selectors'
import { getMessages } from '@app/state/messages/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select input state', () => {
  it('should select input', () => {
    expect(getInput(rootInitialState)).toMatchSnapshot()
  })

  it('should select input value', () => {
    expect(getInputValue(rootInitialState)).toMatchSnapshot()
  })

  it('should select input dirty value', () => {
    expect(getInputDirtyValue(rootInitialState)).toMatchSnapshot()
  })

  it('should select input history', () => {
    expect(getInputHistory(rootInitialState)).toMatchSnapshot()
  })

  it('should select input history', () => {
    expect(getMessages(rootInitialState)).toMatchSnapshot()
  })
})
