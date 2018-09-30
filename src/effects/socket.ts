import { Socket, SocketConnectOpts } from 'net'
import { eventChannel, END } from 'redux-saga'
import { takeEvery, getContext, call, fork, put } from 'redux-saga/effects'
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
import { AnyAction } from 'redux'
import { IRC_MESSAGE_LENGTH, CRLF } from '@app/utils/helpers'
import { sendQuit } from '@app/actions/messages/outgoing'

interface SocketMap {
  [key: string]: Socket
}

export function* socket() {
  yield takeEvery(CONNECT_TO_SERVER, connect)
  yield takeEvery(SEND_RAW_MESSAGE, send)
  yield takeEvery(DISCONNECT_FROM_SERVER, disconnect)
}

function* connect(action: ConnectToServerAction) {
  console.log('connect saga started', action)

  const {
    payload: { host, port },
    route: { serverKey },
  } = action

  const sockets = yield getContext('sockets')

  if (serverKey in sockets) {
    sockets[serverKey].end()
  } else {
    sockets[serverKey] = new Socket()
  }

  yield call(
    (options: SocketConnectOpts) =>
      Promise.resolve(sockets[serverKey].connect(options)),
    { host, port },
  )

  yield fork(receive, serverKey)

  console.log('connect saga ended', action)
}

function* receive(serverKey: string) {
  console.log('receive worker started', serverKey)

  const sockets = yield getContext('sockets')

  const socketEventChannel = yield call(
    createSocketEventChannel,
    serverKey,
    sockets,
  )

  yield takeEvery(socketEventChannel, function*(action: AnyAction) {
    console.log('receiving action from event channel', action)
    yield put(action)
  })

  console.log('receive worker ended', serverKey)
}

function* send(action: SendRawMessageAction) {
  console.log('send worker started', action)

  const {
    payload: { raw },
    route: { serverKey },
    embeddedAction,
  } = action

  const sockets = yield getContext('sockets')

  yield call(
    str => Promise.resolve(sockets[serverKey].write(str)),
    raw.slice(0, IRC_MESSAGE_LENGTH) + CRLF,
  )

  if (embeddedAction !== undefined) {
    yield put(embeddedAction)
  }

  console.log('send worker ended', action)
}

function* disconnect(action: DisconnectFromServerAction) {
  console.log('disconnect worker started', action)

  yield put(sendQuit(action.route.serverKey, action.payload.quitMessage))
  const sockets = yield getContext('sockets')
  yield call(() => Promise.resolve(sockets[action.route.serverKey].end()))

  console.log('disconnect worker ended', action)
}

function createSocketEventChannel(serverKey: string, sockets: SocketMap) {
  return eventChannel(emit => {
    let buffer = ''

    sockets[serverKey].on('lookup', (error, address, family, host) => {
      emit(lookup(serverKey, error, address, family, host))
    })

    sockets[serverKey].on('connect', () => {
      emit(setConnectionEstablished(serverKey))
    })

    sockets[serverKey].on('data', data => {
      buffer += data
      const messages = buffer.split(CRLF)
      buffer = messages.pop() || ''

      emit(receiveRawMessages(serverKey, messages))
    })

    sockets[serverKey].on('close', hadError => {
      emit(setConnectionClosed(serverKey, hadError))
      emit(END)
    })

    sockets[serverKey].on('error', ({ name, message, stack }) => {
      emit(setConnectionFailed(serverKey, name, message, stack))
      emit(END)
    })

    sockets[serverKey].on('end', () => {
      console.warn('unhandled socket end')
    })

    sockets[serverKey].on('timeout', () => {
      console.warn('unhandled socket timeout')
    })

    return () => {
      console.log('eventChannel ended', serverKey)
      delete sockets[serverKey]
    }
  })
}
