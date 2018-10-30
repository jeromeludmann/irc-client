import { rootInitialState } from '@app/state/root/reducer'
import { getServers, getServerKeys } from '@app/state/root/selectors'

describe('getServers()', () => {
  it('should get servers', () => {
    expect(getServers(rootInitialState)).toMatchSnapshot()
  })
})

describe('getServerKeys()', () => {
  it('should get server keys', () => {
    expect(getServerKeys(rootInitialState)).toMatchSnapshot()
  })
})
