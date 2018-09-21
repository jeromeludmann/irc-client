import {
  selectServers,
  selectRoute,
  selectServer,
  selectServerName,
  selectUser,
  selectServerLag,
  selectUserModes,
  selectAvailableModes,
  selectBuffer,
  selectBuffers,
  selectActivity,
  selectInput,
  selectInputValue,
  selectInputDirtyValue,
  selectInputHistory,
  selectMessages,
} from '@app/reducers/selectors'
import { RootState } from '@app/reducers'
import { serverInitialState } from '@app/reducers/server'
import { BufferKey } from '@app/utils/Route'

describe('selectors', () => {
  const initialState: RootState = {
    servers: {
      serverKey: serverInitialState,
    },
    route: { serverKey: 'serverKey', bufferKey: BufferKey.STATUS },
  }

  it('should select servers', () => {
    expect(selectServers(initialState)).toMatchSnapshot()
  })

  it('should select route', () => {
    expect(selectRoute(initialState)).toMatchSnapshot()
  })

  it('should select server', () => {
    expect(selectServer(initialState)).toMatchSnapshot()
  })

  it('should select server name', () => {
    expect(selectServerName(initialState)).toMatchSnapshot()
  })

  it('should select user', () => {
    expect(selectUser(initialState)).toMatchSnapshot()
  })

  it('should select server lag', () => {
    expect(selectServerLag(initialState)).toMatchSnapshot()
  })

  it('should select user modes', () => {
    expect(selectUserModes(initialState)).toMatchSnapshot()
  })

  it('should select available modes', () => {
    expect(selectAvailableModes(initialState)).toMatchSnapshot()
  })

  it('should select buffers', () => {
    expect(selectBuffers(initialState)).toMatchSnapshot()
  })

  it('should select buffer', () => {
    expect(selectBuffer(initialState)).toMatchSnapshot()
  })

  it('should select activity', () => {
    expect(selectActivity(initialState)).toMatchSnapshot()
  })

  it('should select input', () => {
    expect(selectInput(initialState)).toMatchSnapshot()
  })

  it('should select input value', () => {
    expect(selectInputValue(initialState)).toMatchSnapshot()
  })

  it('should select input dirty value', () => {
    expect(selectInputDirtyValue(initialState)).toMatchSnapshot()
  })

  it('should select input history', () => {
    expect(selectInputHistory(initialState)).toMatchSnapshot()
  })

  it('should select input history', () => {
    expect(selectMessages(initialState)).toMatchSnapshot()
  })
})
