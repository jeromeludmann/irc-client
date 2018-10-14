import { getBuffer } from '@app/state/buffer/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select buffer state', () => {
  it('should select buffer', () => {
    expect(getBuffer()(rootInitialState)).toMatchSnapshot()
  })
})
