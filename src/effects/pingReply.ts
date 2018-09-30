import { take, put } from 'redux-saga/effects'
import {
  RECEIVE_PING_FROM_SERVER,
  ReceivePingFromServerAction,
} from '@app/actions/messages/incoming'
import { sendPongToServer } from '@app/actions/messages/outgoing'

export function* pingReply() {
  for (;;) {
    const action: ReceivePingFromServerAction = yield take(
      RECEIVE_PING_FROM_SERVER,
    )
    yield put(sendPongToServer(action.route.serverKey, action.payload.key))
  }
}
