import { takeEvery, put } from 'redux-saga/effects'
import {
  RECEIVE_PING_FROM_SERVER,
  ReceivePingFromServerAction,
} from '@app/actions/messages/incoming'
import { sendPongToServer } from '@app/actions/messages/outgoing'

export function* watch() {
  yield takeEvery(RECEIVE_PING_FROM_SERVER, replyWithPong)
}

export function* replyWithPong(action: ReceivePingFromServerAction) {
  yield put(sendPongToServer(action.route.serverKey, action.payload.key))
}
