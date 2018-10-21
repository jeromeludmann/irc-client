import { takeEvery, call, put } from 'redux-saga/effects'
import {
  RECEIVE_PONG_FROM_SERVER,
  ReceivePongFromServerAction,
} from '@app/actions/messages/incoming'
import { updateServerLag } from '@app/actions/ui'
import { computeLag } from '@app/utils/lag'

export function* watch() {
  yield takeEvery(RECEIVE_PONG_FROM_SERVER, computeServerLag)
}

export function* computeServerLag(action: ReceivePongFromServerAction) {
  console.log('receivePong: started', action)

  const time: number = yield call(computeLag, action.payload.key)
  yield put(updateServerLag(action.route.serverKey, time))

  console.log('receivePong: ended', action)
}
