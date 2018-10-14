import { rootInitialState } from '@app/state/root/reducer'
import { getServers } from '@app/state/root/selectors'

describe('select root state', () => {
  it('should select servers', () => {
    expect(getServers(rootInitialState)).toMatchSnapshot()
  })
})
