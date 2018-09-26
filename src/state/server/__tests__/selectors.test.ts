import {
  selectServer,
  selectServerName,
  selectUser,
  selectServerLag,
  selectUserModes,
  selectAvailableModes,
  selectBuffers,
} from '@app/state/server/selectors'
import { rootInitialState } from '@app/state/root/reducer'

describe('select server state', () => {
  it('should select server', () => {
    expect(selectServer(rootInitialState)).toMatchSnapshot()
  })

  it('should select server name', () => {
    expect(selectServerName(rootInitialState)).toMatchSnapshot()
  })

  it('should select user', () => {
    expect(selectUser(rootInitialState)).toMatchSnapshot()
  })

  it('should select server lag', () => {
    expect(selectServerLag(rootInitialState)).toMatchSnapshot()
  })

  it('should select user modes', () => {
    expect(selectUserModes(rootInitialState)).toMatchSnapshot()
  })

  it('should select available modes', () => {
    expect(selectAvailableModes(rootInitialState)).toMatchSnapshot()
  })

  it('should select buffers', () => {
    expect(selectBuffers(rootInitialState)).toMatchSnapshot()
  })
})
