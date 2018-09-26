import { rootInitialState } from '@app/state/root/reducer'
import { selectServers } from '@app/state/root/selectors'

describe('select root state', () => {
  it('should select servers', () => {
    expect(selectServers(rootInitialState)).toMatchSnapshot()
  })
})
