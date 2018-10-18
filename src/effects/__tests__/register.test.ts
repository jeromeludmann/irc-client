import { registerToServer, register } from '../register'
import {
  CONNECTION_ESTABLISHED,
  setConnectionEstablished,
} from '@app/actions/socket'
import { select, put, takeEvery, call } from 'redux-saga/effects'
import { getServerSelector } from '@app/state/server/selectors'
import { sendUser, sendNick } from '@app/actions/messages/outgoing'

describe('register effects', () => {
  const gen = register()

  it('should watch CONNECTION_ESTABLISHED', () => {
    expect(gen.next().value).toEqual(
      takeEvery(CONNECTION_ESTABLISHED, registerToServer),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('register to server', () => {
  const serverKey = 'serverKey'
  const gen = registerToServer(setConnectionEstablished(serverKey))

  it('should get "getServer" selector', () => {
    expect(gen.next().value).toEqual(call(getServerSelector, serverKey))
  })

  it('should get server state', () => {
    const getServer = getServerSelector(serverKey)
    expect(gen.next(getServer).value).toEqual(select(getServer))
  })

  const server = { user: { nick: 'nick', user: 'user', real: 'real' } }

  it('should send USER message', () => {
    expect(gen.next(server).value).toEqual(
      put(sendUser(serverKey, server.user.user, server.user.real)),
    )
  })

  it('should send NICK message', () => {
    expect(gen.next().value).toEqual(put(sendNick(serverKey, server.user.nick)))
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})
