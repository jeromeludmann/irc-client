import { Socket } from 'net'
import { eventChannel, END } from 'redux-saga'
import { takeEvery, call, put, take, select } from 'redux-saga/effects'
import * as SocketActions from '@app/actions/socket'
import * as OutgoingMessageActions from '@app/actions/messages/outgoing'
import { CRLF } from '@app/utils/helpers'
import { addNewServer } from '@app/actions/ui'
import { BufferKey } from '@app/utils/Route'
import { getServerKeys } from '@app/state/root/selectors'
import * as SocketUtils from '@app/utils/sockets'
import { generateKey } from '@app/utils/generateKey'

export function* socket() {
  yield takeEvery(SocketActions.CONNECT_TO_SERVER, connectToServer)
  yield takeEvery(SocketActions.SEND_RAW_MESSAGE, sendMessage)
  yield takeEvery(SocketActions.DISCONNECT_FROM_SERVER, disconnectFromServer)
}

export function* connectToServer(action: SocketActions.ConnectToServerAction) {
  console.log('connectToServer: started', action)

  const {
    payload: { host, port, newConnection },
  } = action

  const serverKey = newConnection
    ? yield call(getNewServerKey)
    : action.route.serverKey

  const socket: Socket = yield call(SocketUtils.connect, serverKey, host, port)
  const socketChannel = yield call(createSocketChannel, serverKey, socket)

  try {
    while (true) {
      const socketAction = yield take(socketChannel)
      yield put(socketAction)
    }
  } finally {
    yield call(SocketUtils.remove, serverKey)

    console.log('connectToServer: ended', action)
  }
}

export function* sendMessage(
  action: SocketActions.SendRawMessageAction<OutgoingMessageActions.SendMessageAction | void>,
) {
  console.log('sendRawMessage: started', action)

  yield call(SocketUtils.send, action.route.serverKey, action.payload.raw)

  if (action.embeddedAction !== undefined) {
    yield put(action.embeddedAction)
  }

  console.log('sendRawMessage: ended', action)
}

export function* disconnectFromServer(
  action: SocketActions.DisconnectFromServerAction,
) {
  console.log('disconnectFromServer: started', action)

  yield put(
    OutgoingMessageActions.sendQuit(
      action.route.serverKey,
      action.payload.quitMessage,
    ),
  )
  yield call(SocketUtils.close, action.route.serverKey)

  console.log('disconnectFromServer: ended', action)
}

export function* getNewServerKey() {
  const existingServerKeys: string[] = yield select(getServerKeys)
  const serverKey: string = yield call(generateKey, existingServerKeys)
  yield put(addNewServer({ serverKey, bufferKey: BufferKey.NONE }))
  return serverKey
}

export function createSocketChannel(serverKey: string, socket: Socket) {
  return eventChannel(emit => {
    let buffer = ''

    socket.on('lookup', (error, address, family, host) => {
      emit(SocketActions.lookup(serverKey, error, address, family, host))
    })

    socket.on('connect', () => {
      emit(SocketActions.setConnectionEstablished(serverKey))
    })

    socket.on('data', data => {
      buffer += data
      const messages = buffer.split(CRLF)
      buffer = messages.pop() || ''

      emit(SocketActions.receiveRawMessages(serverKey, messages))
    })

    socket.on('close', hadError => {
      emit(SocketActions.setConnectionClosed(serverKey, hadError))
      emit(END)
    })

    socket.on('error', ({ name, message, stack }) => {
      emit(SocketActions.setConnectionFailed(serverKey, name, message, stack))
      emit(END)
    })

    socket.on('end', () => {
      console.warn('unhandled socket end')
    })

    socket.on('timeout', () => {
      console.warn('unhandled socket timeout')
    })

    return () => {
      console.log('end of socket channel', serverKey)
      socket.end()
    }
  })
}
