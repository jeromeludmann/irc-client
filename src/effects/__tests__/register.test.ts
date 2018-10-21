import * as RegisterEffects from '../register'
import {
  CONNECTION_ESTABLISHED,
  setConnectionEstablished,
} from '@app/actions/socket'
import { select, put, takeEvery, call } from 'redux-saga/effects'
import { getServerSelector } from '@app/state/server/selectors'
import { sendUser, sendNick } from '@app/actions/messages/outgoing'

describe('register effects', () => {
  const watch = RegisterEffects.watch()

  it('should watch CONNECTION_ESTABLISHED', () => {
    expect(watch.next().value).toEqual(
      takeEvery(CONNECTION_ESTABLISHED, RegisterEffects.registerToServer),
    )
  })

  it('should be done', () => {
    expect(watch.next().done).toBeTruthy()
  })
})

describe('register to server', () => {
  const serverKey = 'serverKey'
  const registerToServer = RegisterEffects.registerToServer(
    setConnectionEstablished(serverKey),
  )

  it('should get "getServer" selector', () => {
    expect(registerToServer.next().value).toEqual(
      call(getServerSelector, serverKey),
    )
  })

  it('should get server state', () => {
    const getServer = getServerSelector(serverKey)
    expect(registerToServer.next(getServer).value).toEqual(select(getServer))
  })

  const server = { user: { nick: 'nick', user: 'user', real: 'real' } }

  it('should send USER message', () => {
    expect(registerToServer.next(server).value).toEqual(
      put(sendUser(serverKey, server.user.user, server.user.real)),
    )
  })

  it('should send NICK message', () => {
    expect(registerToServer.next().value).toEqual(
      put(sendNick(serverKey, server.user.nick)),
    )
  })

  it('should be done', () => {
    expect(registerToServer.next().done).toBeTruthy()
  })
})
