import { takeEvery, put, call, select } from 'redux-saga/effects'
import { CloseWindowAction, CLOSE_WINDOW, addNewServer } from '@app/actions/ui'
import { isChannel, isStatus, isRaw, BufferKey } from '@app/utils/Route'
import { sendPart } from '@app/actions/messages/outgoing'
import {
  disconnectFromServer,
  CONNECT_TO_SERVER,
  ConnectToServerAction,
} from '@app/actions/socket'
import { generateKey } from '@app/utils/generateKey'
import { getServerKeys } from '@app/state/root/selectors'

export function* watch() {
  yield takeEvery(CLOSE_WINDOW, closeWindowProperly)
  yield takeEvery(CONNECT_TO_SERVER, addNewServerIfNeeded)
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

export function* addNewServerIfNeeded(action: ConnectToServerAction) {
  if (!action.payload.newConnection) {
    return
  }

  const existingServerKeys: string[] = yield select(getServerKeys)
  const serverKey: string = yield call(generateKey, existingServerKeys)

  yield put(
    addNewServer({
      serverKey,
      bufferKey: BufferKey.NONE,
    }),
  )
}
