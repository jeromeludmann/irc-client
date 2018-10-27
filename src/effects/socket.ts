import { Channel } from 'redux-saga'
import { takeEvery, call, put, select } from 'redux-saga/effects'
import * as SocketActions from '@app/actions/socket'
import * as OutgoingMessageActions from '@app/actions/messages/outgoing'
import { addNewServer } from '@app/actions/ui'
import { BufferKey, RoutedAction } from '@app/utils/Route'
import { getServerKeys } from '@app/state/root/selectors'
import * as SocketUtils from '@app/utils/sockets'
import { generateKey } from '@app/utils/generateKey'

export function* watch() {
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

  const socketChannel: Channel<RoutedAction> = yield call(
    SocketUtils.connect,
    serverKey,
    host,
    port,
  )

  yield takeEvery(socketChannel, put)
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
