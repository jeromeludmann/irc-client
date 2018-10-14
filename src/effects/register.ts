import {
  ConnectionEstablishedAction,
  CONNECTION_ESTABLISHED,
} from '@app/actions/socket'
import { takeEvery, select, put } from 'redux-saga/effects'
import { sendUser, sendNick } from '@app/actions/messages/outgoing'
import { getServer } from '@app/state/server/selectors'
import { ServerState } from '@app/state/server/reducer'

export function* register() {
  yield takeEvery(CONNECTION_ESTABLISHED, function*(
    action: ConnectionEstablishedAction,
  ) {
    const { serverKey } = action.route

    const server: ServerState = yield select(getServer(serverKey))
    const { nick, user, real } = server.user

    yield put(sendUser(serverKey, user, real))
    yield put(sendNick(serverKey, nick))
  })
}
