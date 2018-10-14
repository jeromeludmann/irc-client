import { getInput, getInputValue } from '@app/state/input/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select input state', () => {
  it('should select input', () => {
    expect(getInput()(rootInitialState)).toMatchSnapshot()
  })

  it('should select input value', () => {
    expect(getInputValue()(rootInitialState)).toMatchSnapshot()
  })
})
