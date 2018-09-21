import {
  selectInput,
  selectInputValue,
  selectInputDirtyValue,
  selectInputHistory,
} from '@app/state/input/selectors'
import { selectMessages } from '@app/state/messages/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select input state', () => {
  it('should select input', () => {
    expect(selectInput(rootInitialState)).toMatchSnapshot()
  })

  it('should select input value', () => {
    expect(selectInputValue(rootInitialState)).toMatchSnapshot()
  })

  it('should select input dirty value', () => {
    expect(selectInputDirtyValue(rootInitialState)).toMatchSnapshot()
  })

  it('should select input history', () => {
    expect(selectInputHistory(rootInitialState)).toMatchSnapshot()
  })

  it('should select input history', () => {
    expect(selectMessages(rootInitialState)).toMatchSnapshot()
  })
})
