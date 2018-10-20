import { Socket } from 'net'
import { END } from 'redux-saga'
import { takeEvery, call, take, put, select } from 'redux-saga/effects'
import * as ServerEffects from '../socket'
import * as SocketActions from '@app/actions/socket'
import * as OutgoingMessageActions from '@app/actions/messages/outgoing'
import * as SocketUtils from '@app/utils/sockets'
import { getServerKeys } from '@app/state/root/selectors'
import { generateKey } from '@app/utils/generateKey'
import { addNewServer } from '@app/actions/ui'
import { BufferKey } from '@app/utils/Route'

describe('server effects', () => {
  const gen = ServerEffects.socket()

  it('should watch CONNECT_TO_SERVER', () => {
    expect(gen.next().value).toEqual(
      takeEvery(SocketActions.CONNECT_TO_SERVER, ServerEffects.connectToServer),
    )
  })

  it('should watch SEND_RAW_MESSAGE', () => {
    expect(gen.next().value).toEqual(
      takeEvery(SocketActions.SEND_RAW_MESSAGE, ServerEffects.sendMessage),
    )
  })

  it('should watch DISCONNECT_FROM_SERVER', () => {
    expect(gen.next().value).toEqual(
      takeEvery(
        SocketActions.DISCONNECT_FROM_SERVER,
        ServerEffects.disconnectFromServer,
      ),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('connect to server', () => {
  const host = 'irc.network'
  const port = 6667

  const gen = ServerEffects.connectToServer(
    SocketActions.connectToServer('serverKey', host, port),
  )

  const serverKey = 'serverKey'

  it('should connect socket', () => {
    expect(gen.next(serverKey).value).toEqual(
      call(SocketUtils.connect, serverKey, host, port),
    )
  })

  const socket = new Socket()

  it('should create socket channel', () => {
    expect(gen.next(socket).value).toEqual(
      call(ServerEffects.createSocketChannel, serverKey, socket),
    )
  })

  const socketChannel = ServerEffects.createSocketChannel(serverKey, socket)

  it('should watch action from socket channel', () => {
    expect(gen.next(socketChannel).value).toEqual(take(socketChannel))
  })

  it('should dispatch END action', () => {
    expect(gen.next(END).value).toEqual(put(END))
  })

  it('should watch END action from socket channel', () => {
    expect(gen.next().value).toEqual(take(socketChannel))
  })

  it('should remove socket', () => {
    expect(gen.return!(END).value).toEqual(call(SocketUtils.remove, serverKey))
  })

  it('should be done', () => {
    expect(gen.next().value).toBeTruthy()
  })
})

describe('connect to server (with new connection)', () => {
  const gen = ServerEffects.connectToServer(
    SocketActions.connectToServer('serverKey', 'irc.network', 6667, true),
  )

  it('should generate server key', () => {
    expect(gen.next().value).toEqual(call(ServerEffects.getNewServerKey))
  })
})

describe('send message (QUIT)', () => {
  const action = OutgoingMessageActions.sendQuit('serverKey', 'goodbye')
  const gen = ServerEffects.sendMessage(action)

  it('should send message', () => {
    expect(gen.next().value).toEqual(
      call(SocketUtils.send, action.route.serverKey, action.payload.raw),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('send message (PRIVMSG)', () => {
  const action = OutgoingMessageActions.sendPrivmsg(
    'serverKey',
    '#channel',
    'hello',
  )

  const gen = ServerEffects.sendMessage(action)

  it('should send message', () => {
    expect(gen.next().value).toEqual(
      call(SocketUtils.send, action.route.serverKey, action.payload.raw),
    )
  })

  it('should dispatch embedded action if needed', () => {
    expect(gen.next().value).toEqual(put(action.embeddedAction!))
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('disconnect from server', () => {
  const action = SocketActions.disconnectFromServer('serverKey', 'goodbye')
  const gen = ServerEffects.disconnectFromServer(action)

  it('should send QUIT message', () => {
    expect(gen.next().value).toEqual(
      put(
        OutgoingMessageActions.sendQuit(
          action.route.serverKey,
          action.payload.quitMessage,
        ),
      ),
    )
  })

  it('should close connection', () => {
    expect(gen.next().value).toEqual(
      call(SocketUtils.close, action.route.serverKey),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('get new server key', () => {
  const gen = ServerEffects.getNewServerKey()

  it('should get server keys from state', () => {
    expect(gen.next().value).toEqual(select(getServerKeys))
  })

  const existingServerKeys = ['serverKey']

  it('should generate key', () => {
    expect(gen.next(existingServerKeys).value).toEqual(
      call(generateKey, existingServerKeys),
    )
  })

  const serverKey = 'serverKey2'

  it('should add new server slot', () => {
    expect(gen.next(serverKey).value).toEqual(
      put(addNewServer({ serverKey, bufferKey: BufferKey.NONE })),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})
