import { Socket } from 'net'
import { eventChannel, END, buffers, Channel } from 'redux-saga'
import { fork, call, put, take, race, actionChannel } from 'redux-saga/effects'
import { ADD_NEW_SERVER, AddNewServerAction } from '@app/actions/ui'
import * as SocketUtils from '@app/utils/sockets'
import {
  CONNECT_TO_SERVER,
  ConnectToServerAction,
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
import {
  SEND_PRIVMSG,
  sendQuit,
  SendMessageAction,
  SEND_MESSAGE,
} from '@app/actions/messages/outgoing'
import { createAntiFloodChannel } from './flood'

export function* watchNewConnections() {
  try {
    console.log('[started] socket/watchNewConnections')

    while (true) {
      const action = yield take(CONNECT_TO_SERVER)
      yield fork(connectToServer, action)
    }
  } finally {
    console.log('[ended] socket/watchNewConnections')
  }
}

export function* connectToServer(action: ConnectToServerAction) {
  try {
    console.log('[started] socket/connectToServer')

    const {
      payload: { host, port, newConnection },
    } = action

    const serverKey = newConnection
      ? ((yield take(ADD_NEW_SERVER)) as AddNewServerAction).route.serverKey
      : action.route.serverKey

    const socket = yield call(SocketUtils.connect, host, port)
    yield fork(runSocketWorkers, serverKey, socket)
  } finally {
    console.log('[ended] socket/connectToServer')
  }
}

export function* runSocketWorkers(serverKey: string, socket: Socket) {
  try {
    console.log('[started] socket/runSocketWorkers')

    yield race({
      e1: call(receiveMessages, serverKey, socket),
      e2: call(sendMessages, serverKey, socket),
      e3: call(disconnectFromServer, serverKey, socket),
    })
  } finally {
    console.log('[ended] socket/runSocketWorkers')
  }
}

export function* receiveMessages(serverKey: string, socket: Socket) {
  try {
    console.log('[started] socket/receiveMessages')

    const socketChannel = yield call(createSocketChannel, serverKey, socket)

    while (true) {
      const socketAction = yield take(socketChannel)
      yield put(socketAction)
    }
  } finally {
    console.log('[ended] socket/receiveMessages')
  }
}

export function* sendMessages(serverKey: string, socket: Socket) {
  const subjectToAntiFlood = [SEND_PRIVMSG]

  try {
    console.log('[started] socket/sendMessages')

    const defaultMessageChannel = yield actionChannel(
      (action: SendMessageAction) =>
        action.group === SEND_MESSAGE &&
        !subjectToAntiFlood.includes(action.type) &&
        action.route.serverKey === serverKey,

      buffers.expanding(10),
    )

    const antiFloodMessageChannel = yield* createAntiFloodChannel(
      (action: SendMessageAction) =>
        action.group === SEND_MESSAGE &&
        subjectToAntiFlood.includes(action.type) &&
        action.route.serverKey === serverKey,

      {
        threshold: { number: 3, duration: 3000 },
        slowDown: 1000,
        refresh: 2000,
      },
    )

    yield fork(runOutgoingMessageLoop, socket, defaultMessageChannel)
    yield fork(runOutgoingMessageLoop, socket, antiFloodMessageChannel)
  } finally {
    console.log('[ended] socket/sendMessages')
  }
}

export function* runOutgoingMessageLoop(
  socket: Socket,
  channel: Channel<RoutedAction>,
) {
  try {
    console.log('[started] socket/runOutgoingMessageLoop')

    while (true) {
      const action: SendRawMessageAction = yield take(channel)
      yield fork(SocketUtils.send, socket, action.payload.raw)
    }
  } finally {
    console.log('[ended] socket/runOutgoingMessageLoop')
  }
}

export function* disconnectFromServer(serverKey: string, socket: Socket) {
  try {
    console.log('[started] socket/disconnectFromServer')

    const predicate = (a: RoutedAction) =>
      a.type === DISCONNECT_FROM_SERVER && a.route.serverKey === serverKey

    const action: DisconnectFromServerAction = yield take(predicate)

    yield put(sendQuit(action.route.serverKey, action.payload.quitMessage))
    yield fork(SocketUtils.close, socket)
  } finally {
    console.log('[ended] socket/disconnectFromServer')
  }
}

export function createSocketChannel(serverKey: string, socket: Socket) {
  return eventChannel<RoutedAction>(emit => {
    console.log('[started] socket/eventChannel')

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
      console.log('[ended] socket/eventChannel')
    }
  })
}
