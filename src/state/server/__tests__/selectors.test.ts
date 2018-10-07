import {
  getServer,
  getServerName,
  getUser,
  getServerLag,
  getUserModes,
  getAvailableModes,
  getBuffers,
} from '@app/state/server/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select server state', () => {
  it('should select server', () => {
    expect(getServer(rootInitialState)).toMatchSnapshot()
  })

  it('should select server name', () => {
    expect(getServerName(rootInitialState)).toMatchSnapshot()
  })

  it('should select user', () => {
    expect(getUser(rootInitialState)).toMatchSnapshot()
  })

  it('should select server lag', () => {
    expect(getServerLag(rootInitialState)).toMatchSnapshot()
  })

  it('should select user modes', () => {
    expect(getUserModes(rootInitialState)).toMatchSnapshot()
  })

  it('should select available modes', () => {
    expect(getAvailableModes(rootInitialState)).toMatchSnapshot()
  })

  it('should select buffers', () => {
    expect(getBuffers(rootInitialState)).toMatchSnapshot()
  })
})
