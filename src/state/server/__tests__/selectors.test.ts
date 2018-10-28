import { getServerSelector, getBuffers } from '@app/state/server/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select server state', () => {
  it('should select server', () => {
    expect(getServerSelector()(rootInitialState)).toMatchSnapshot()
  })

  it('should select buffers', () => {
    expect(getBuffers()(rootInitialState)).toMatchSnapshot()
  })
})
