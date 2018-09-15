import {
  selectServers,
  selectRoute,
  selectServer,
  selectUser,
  selectBuffer,
  selectMessages,
  selectInput,
} from '@app/reducers/_selectors'
import { rootInitialState } from '@app/reducers'
import { serverInitialState } from '@app/reducers/server'
import { BufferKey } from '@app/utils/Route'

describe('root selectors', () => {
  test('select servers', () => {
    expect(selectServers(rootInitialState)).toMatchSnapshot()
  })

  test('select route', () => {
    expect(selectRoute(rootInitialState)).toMatchSnapshot()
  })

  test('select server', () => {
    expect(selectServer(rootInitialState)).toMatchSnapshot()
  })
})

describe('server selectors', () => {
  const initialState = {
    servers: { server1: serverInitialState },
    route: { serverKey: 'server1', channelKey: BufferKey.STATUS },
  }

  test('select user', () => {
    expect(selectUser(initialState)).toMatchSnapshot()
  })

  test('select channel', () => {
    expect(selectBuffer(initialState)).toMatchSnapshot()
  })

  test('select messages', () => {
    expect(selectMessages(initialState)).toMatchSnapshot()
  })

  test('select input', () => {
    expect(selectInput(initialState)).toMatchSnapshot()
  })
})
