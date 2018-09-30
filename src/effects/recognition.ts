import {
  ConnectionEstablishedAction,
  CONNECTION_ESTABLISHED,
} from '@app/actions/socket'
import { takeEvery, select, put } from 'redux-saga/effects'
import { RootState } from '@app/state/root/reducer'
import { sendUser, sendNick } from '@app/actions/messages/outgoing'

export function* recognition() {
  yield takeEvery(CONNECTION_ESTABLISHED, register)
}

function* register(action: ConnectionEstablishedAction) {
  const { serverKey } = action.route

  const state: RootState = yield select()
  const { nick, user, real } = state.servers[serverKey].user

  yield put(sendUser(serverKey, user, real))
  yield put(sendNick(serverKey, nick))
}
