import { takeEvery, call, put } from 'redux-saga/effects'
import {
  RECEIVE_PONG_FROM_SERVER,
  ReceivePongFromServerAction,
} from '@app/actions/messages/incoming'
import { updateServerLag } from '@app/actions/ui'

export function* lag() {
  yield takeEvery(RECEIVE_PONG_FROM_SERVER, receivePong)
}

function* receivePong(action: ReceivePongFromServerAction) {
  console.log('receivePong: started', action)

  const time: number = yield* computeServerLag(action.payload.key)
  yield put(updateServerLag(action.route.serverKey, time))

  console.log('receivePong: ended', action)
}

function* computeServerLag(pongTime: number) {
  return yield call(() => Promise.resolve(Date.now() - pongTime))
}
