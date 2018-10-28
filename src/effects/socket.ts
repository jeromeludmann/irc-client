import { Channel } from 'redux-saga'
import { takeEvery, call, put, take } from 'redux-saga/effects'
import * as SocketActions from '@app/actions/socket'
import * as OutgoingMessageActions from '@app/actions/messages/outgoing'
import { ADD_NEW_SERVER, AddNewServerAction } from '@app/actions/ui'
import { RoutedAction } from '@app/utils/Route'
import * as SocketUtils from '@app/utils/sockets'

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
    ? ((yield take(ADD_NEW_SERVER)) as AddNewServerAction).route.serverKey
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

  // TODO move to another saga
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
