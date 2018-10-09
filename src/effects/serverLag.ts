import { takeEvery, call, put } from 'redux-saga/effects'
import {
  SEND_PING_TO_SERVER,
  SendPingToServerAction,
} from '@app/actions/messages/outgoing'
import {
  RECEIVE_PONG_FROM_SERVER,
  ReceivePongFromServerAction,
} from '@app/actions/messages/incoming'
import { updateServerLag } from '@app/actions/ui'

export function* serverLag() {
  yield takeEvery(SEND_PING_TO_SERVER, sendPing)
  yield takeEvery(RECEIVE_PONG_FROM_SERVER, receivePong)
}

function* sendPing(action: SendPingToServerAction) {
  console.log('sendPing: started', action)

  yield* ServerLagEffects.registerTime(action)

  console.log('sendPing: ended', action)
}

function* receivePong(action: ReceivePongFromServerAction) {
  console.log('receivePong: started', action)

  const time = yield* ServerLagEffects.computeTime(action)
  yield put(updateServerLag(action.route.serverKey, time))

  console.log('receivePong: ended', action)
}

interface ServerLags {
  [key: string]: number
}

class ServerLagEffects {
  public static *registerTime(pingAction: SendPingToServerAction) {
    const {
      payload: { key },
      route: { serverKey },
    } = pingAction
    const pingKey = serverKey + key
    console.log('registerTime', pingKey)

    return yield call(() =>
      Promise.resolve((this.entries[pingKey] = Date.now())),
    )
  }

  public static *computeTime(pongAction: ReceivePongFromServerAction) {
    const {
      payload: { key },
      route: { serverKey },
    } = pongAction
    const pongKey = serverKey + key
    console.log('computeTime', pongKey)

    const serverLags: ServerLags = yield call(() =>
      Promise.resolve(this.entries),
    )

    if (!(pongKey in serverLags)) {
      throw new Error(`computeTime: key ${pongKey} not found`)
    }

    const computedTime = yield call(() =>
      Promise.resolve(Date.now() - serverLags[pongKey]),
    )

    yield* this.removeEntry(pongAction)

    return computedTime
  }

  private static entries: ServerLags = {}

  private static *removeEntry(
    action: SendPingToServerAction | ReceivePongFromServerAction,
  ) {
    const {
      payload: { key },
      route: { serverKey },
    } = action

    yield call(() => {
      delete this.entries[serverKey + key]
      return Promise.resolve()
    })
  }
}
