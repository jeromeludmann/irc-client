import { eventChannel } from 'redux-saga'
import { takeEvery, call, take, put } from 'redux-saga/effects'
import * as ServerEffects from '../socket'
import * as SocketActions from '@app/actions/socket'
import * as OutgoingMessageActions from '@app/actions/messages/outgoing'
import * as SocketUtils from '@app/utils/sockets'
import { ADD_NEW_SERVER } from '@app/actions/ui'

describe('server effects', () => {
  const watch = ServerEffects.watch()

  it('should watch CONNECT_TO_SERVER', () => {
    expect(watch.next().value).toEqual(
      takeEvery(SocketActions.CONNECT_TO_SERVER, ServerEffects.connectToServer),
    )
  })

  it('should watch SEND_RAW_MESSAGE', () => {
    expect(watch.next().value).toEqual(
      takeEvery(SocketActions.SEND_RAW_MESSAGE, ServerEffects.sendMessage),
    )
  })

  it('should watch DISCONNECT_FROM_SERVER', () => {
    expect(watch.next().value).toEqual(
      takeEvery(
        SocketActions.DISCONNECT_FROM_SERVER,
        ServerEffects.disconnectFromServer,
      ),
    )
  })

  it('should be done', () => {
    expect(watch.next().done).toBeTruthy()
  })
})

describe('connect to server', () => {
  const host = 'irc.network'
  const port = 6667

  const connectToServer = ServerEffects.connectToServer(
    SocketActions.connectToServer('serverKey', host, port),
  )

  const serverKey = 'serverKey'

  it('should connect socket', () => {
    expect(connectToServer.next(serverKey).value).toEqual(
      call(SocketUtils.connect, serverKey, host, port),
    )
  })

  const socketChannel = eventChannel(() => () => {
    /* mocked */
  })

  it('should watch action from socket channel', () => {
    expect(connectToServer.next(socketChannel).value).toEqual(
      takeEvery(socketChannel, put),
    )
  })

  it('should be done', () => {
    expect(connectToServer.next().done).toBeTruthy()
  })
})

describe('connect to server (with new connection)', () => {
  const connectToServer = ServerEffects.connectToServer(
    SocketActions.connectToServer('serverKey', 'irc.network', 6667, true),
  )

  it('should wait for ADD_NEW_SERVER', () => {
    expect(connectToServer.next().value).toEqual(take(ADD_NEW_SERVER))
  })
})

describe('send message (QUIT)', () => {
  const action = OutgoingMessageActions.sendQuit('serverKey', 'goodbye')
  const sendMessage = ServerEffects.sendMessage(action)

  it('should send message', () => {
    expect(sendMessage.next().value).toEqual(
      call(SocketUtils.send, action.route.serverKey, action.payload.raw),
    )
  })

  it('should be done', () => {
    expect(sendMessage.next().done).toBeTruthy()
  })
})

describe('send message (PRIVMSG)', () => {
  const action = OutgoingMessageActions.sendPrivmsg(
    'serverKey',
    '#channel',
    'hello',
  )

  const sendMessage = ServerEffects.sendMessage(action)

  it('should send message', () => {
    expect(sendMessage.next().value).toEqual(
      call(SocketUtils.send, action.route.serverKey, action.payload.raw),
    )
  })

  it('should dispatch embedded action if needed', () => {
    expect(sendMessage.next().value).toEqual(put(action.embeddedAction!))
  })

  it('should be done', () => {
    expect(sendMessage.next().done).toBeTruthy()
  })
})

describe('disconnect from server', () => {
  const action = SocketActions.disconnectFromServer('serverKey', 'goodbye')
  const disconnectFromServer = ServerEffects.disconnectFromServer(action)

  it('should send QUIT message', () => {
    expect(disconnectFromServer.next().value).toEqual(
      put(
        OutgoingMessageActions.sendQuit(
          action.route.serverKey,
          action.payload.quitMessage,
        ),
      ),
    )
  })

  it('should close connection', () => {
    expect(disconnectFromServer.next().value).toEqual(
      call(SocketUtils.close, action.route.serverKey),
    )
  })

  it('should be done', () => {
    expect(disconnectFromServer.next().done).toBeTruthy()
  })
})
