import { CloseWindowAction, CLOSE_WINDOW } from '@app/actions/ui'
import { isChannel, isStatus, isRaw } from '@app/utils/Route'
import { sendPart } from '@app/actions/messages/outgoing'
import { takeEvery, put } from 'redux-saga/effects'
import { disconnectFromServer } from '@app/actions/socket'

export function* watch() {
  yield takeEvery(CLOSE_WINDOW, closeWindowProperly)
}

export function* closeWindowProperly(action: CloseWindowAction) {
  if (isChannel(action.route.bufferKey)) {
    const channel = action.route.bufferKey
    return yield put(sendPart(action.route.serverKey, channel))
  }

  if (isStatus(action.route.bufferKey) || isRaw(action.route.bufferKey)) {
    yield put(disconnectFromServer(action.route.serverKey))
  }
}
