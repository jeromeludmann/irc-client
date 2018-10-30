import { getServerFactory, getBuffers } from '@app/state/server/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('getServerFactory()', () => {
  it('should get "getServer" selector', () => {
    expect(getServerFactory()(rootInitialState)).toMatchSnapshot()
  })
})

describe('getBuffers()', () => {
  it('should get buffers', () => {
    expect(getBuffers()(rootInitialState)).toMatchSnapshot()
  })
})
