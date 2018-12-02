import {
  ConnectionEstablishedAction,
  CONNECTION_ESTABLISHED,
} from '@app/actions/socket'
import { take, fork, call, select, put } from 'redux-saga/effects'
import { sendUser, sendNick } from '@app/actions/messages/outgoing'
import { ServerState } from '@app/state/server/reducer'
import { getServerFactory } from '@app/state/server/selectors'

export function* runRegister() {
  while (true) {
    const action: ConnectionEstablishedAction = yield take(
      CONNECTION_ESTABLISHED,
    )

    yield fork(registerToServer, action)
  }
}

export function* registerToServer(action: ConnectionEstablishedAction) {
  const { serverKey } = action.route

  const getServer = yield call(getServerFactory, serverKey)
  const server: ServerState = yield select(getServer)
  const { nick, user, real } = server.user

  yield put(sendUser(serverKey, user, real))
  yield put(sendNick(serverKey, nick))
}
