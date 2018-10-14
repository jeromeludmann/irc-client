import { Socket } from 'net'
import { eventChannel, END } from 'redux-saga'
import { takeEvery, call, put, take, select } from 'redux-saga/effects'
import {
  CONNECT_TO_SERVER,
  SEND_RAW_MESSAGE,
  DISCONNECT_FROM_SERVER,
  ConnectToServerAction,
  lookup,
  setConnectionEstablished,
  receiveRawMessages,
  setConnectionClosed,
  setConnectionFailed,
  SendRawMessageAction,
  DisconnectFromServerAction,
} from '@app/actions/socket'
import { sendQuit } from '@app/actions/messages/outgoing'
import { CRLF } from '@app/utils/helpers'
import { addNewServer } from '@app/actions/ui'
import { BufferKey } from '@app/utils/Route'
import { getServerKeys } from '@app/state/root/selectors'
import { connect, remove, send, end } from './socket'

export function* server() {
  yield takeEvery(CONNECT_TO_SERVER, connectToServer)
  yield takeEvery(SEND_RAW_MESSAGE, sendRawMessage)
  yield takeEvery(DISCONNECT_FROM_SERVER, disconnectFromServer)
}

function* connectToServer(action: ConnectToServerAction) {
  console.log('connectToServer: started', action)

  const {
    payload: { host, port, newConnection },
  } = action

  const serverKey = newConnection
    ? yield generateServerKey()
    : action.route.serverKey

  const socket: Socket = yield* connect(
    serverKey,
    host,
    port,
  )

  const socketChannel = yield call(createSocketChannel, serverKey, socket)

  try {
    while (true) {
      const socketAction = yield take(socketChannel)
      yield put(socketAction)
    }
  } finally {
    yield* remove(serverKey)

    console.log('connectToServer: ended', action)
  }
}

function* sendRawMessage(action: SendRawMessageAction) {
  console.log('sendRawMessage: started', action)

  yield* send(action.route.serverKey, action.payload.raw)

  if (action.embeddedAction !== undefined) {
    yield put(action.embeddedAction)
  }

  console.log('sendRawMessage: ended', action)
}

function* disconnectFromServer(action: DisconnectFromServerAction) {
  console.log('disconnectFromServer: started', action)

  yield put(sendQuit(action.route.serverKey, action.payload.quitMessage))
  yield* end(action.route.serverKey)

  console.log('disconnectFromServer: ended', action)
}

function* generateServerKey() {
  const existingServerKeys: string[] = yield select(getServerKeys)

  const serverKey: string = yield call(function generateKey(): string {
    const key = Math.random()
      .toString(36)
      .slice(2)
    return existingServerKeys.includes(key) ? generateKey() : key
  })

  yield put(addNewServer({ serverKey, bufferKey: BufferKey.NONE }))
  return serverKey
}

function createSocketChannel(serverKey: string, socket: Socket) {
  return eventChannel(emit => {
    let buffer = ''

    socket.on('lookup', (error, address, family, host) => {
      emit(lookup(serverKey, error, address, family, host))
    })

    socket.on('connect', () => {
      emit(setConnectionEstablished(serverKey))
    })

    socket.on('data', data => {
      buffer += data
      const messages = buffer.split(CRLF)
      buffer = messages.pop() || ''

      emit(receiveRawMessages(serverKey, messages))
    })

    socket.on('close', hadError => {
      emit(setConnectionClosed(serverKey, hadError))
      emit(END)
    })

    socket.on('error', ({ name, message, stack }) => {
      emit(setConnectionFailed(serverKey, name, message, stack))
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
    }
  })
}
