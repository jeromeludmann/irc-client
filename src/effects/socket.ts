import { Socket } from 'net'
import { eventChannel, END, Task } from 'redux-saga'
import { fork, call, put, take } from 'redux-saga/effects'
import * as OutgoingMessageActions from '@app/actions/messages/outgoing'
import { ADD_NEW_SERVER, AddNewServerAction } from '@app/actions/ui'
import * as SocketUtils from '@app/utils/sockets'
import {
  CONNECT_TO_SERVER,
  ConnectToServerAction,
  SEND_RAW_MESSAGE,
  DISCONNECT_FROM_SERVER,
  SendRawMessageAction,
  DisconnectFromServerAction,
  lookup,
  setConnectionEstablished,
  receiveRawMessages,
  setConnectionClosed,
  setConnectionFailed,
} from '@app/actions/socket'
import { RoutedAction } from '@app/utils/Route'
import { CRLF } from '@app/utils/helpers'

export function* socketHandler() {
  while (true) {
    const action = yield take(CONNECT_TO_SERVER)
    yield fork(connectToServer, action)
  }
}

export function* connectToServer(action: ConnectToServerAction) {
  console.log('connectToServer: started', action)

  const {
    payload: { host, port, newConnection },
  } = action

  const serverKey = newConnection
    ? ((yield take(ADD_NEW_SERVER)) as AddNewServerAction).route.serverKey
    : action.route.serverKey

  const socket = yield call(SocketUtils.connect, host, port)

  const tasks: Task[] = [
    yield fork(sendMessage, socket, serverKey),
    yield fork(disconnectFromServer, socket, serverKey),
  ]

  const socketChannel = yield call(createSocketChannel, serverKey, socket)

  try {
    while (true) {
      const socketAction = yield take(socketChannel)
      yield put(socketAction)
    }
  } finally {
    tasks.forEach(task => task.cancel())
    console.log('connectToServer: ended', action)
  }
}

export function* sendMessage(socket: Socket, serverKey: string) {
  console.log('sendMessage: started', serverKey)

  const predicate = (a: RoutedAction) =>
    a.type === SEND_RAW_MESSAGE && a.route.serverKey === serverKey

  try {
    while (true) {
      const action: SendRawMessageAction = yield take(predicate)

      // TODO will be call since we will use actionChannel
      yield fork(SocketUtils.send, socket, action.payload.raw)

      // TODO move to another saga?
      if (action.embeddedAction !== undefined) {
        yield put(action.embeddedAction)
      }
    }
  } finally {
    console.log('sendMessage: ended', serverKey)
  }
}

export function* disconnectFromServer(socket: Socket, serverKey: string) {
  console.log('disconnectFromServer: started', serverKey)

  const predicate = (a: RoutedAction) =>
    a.type === DISCONNECT_FROM_SERVER && a.route.serverKey === serverKey

  try {
    while (true) {
      const action: DisconnectFromServerAction = yield take(predicate)

      yield put(
        OutgoingMessageActions.sendQuit(
          action.route.serverKey,
          action.payload.quitMessage,
        ),
      )

      yield call(SocketUtils.close, socket)
    }
  } finally {
    console.log('disconnectFromServer: ended', serverKey)
  }
}

export function createSocketChannel(serverKey: string, socket: Socket) {
  return eventChannel<RoutedAction>(emit => {
    console.log('eventChannel: started', serverKey)
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
      // socket.end()
      console.log('eventChannel: ended', serverKey)
    }
  })
}
