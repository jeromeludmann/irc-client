import { Dispatch } from 'redux'
import {
  SendPingToServerAction,
  SEND_PING_TO_SERVER,
} from '@app/actions/messages/outgoing'
import {
  ReceivePongFromServerAction,
  RECEIVE_PONG_FROM_SERVER,
} from '@app/actions/messages/incoming'

type LagAction = SendPingToServerAction | ReceivePongFromServerAction

export function lag() {
  return (next: Dispatch) => (action: LagAction) => {
    next(action.type in handlers ? handlers[action.type](action) : action)
  }
}

const timestamps: { [key: string]: number } = {}

const handlers: { [action: string]: (action: LagAction) => LagAction } = {
  [SEND_PING_TO_SERVER](action: SendPingToServerAction) {
    timestamps[action.payload.key] = Date.now()
    return action
  },

  [RECEIVE_PONG_FROM_SERVER](action: ReceivePongFromServerAction) {
    if (!(action.payload.key in timestamps)) {
      console.log(
        `key of PongFromServerReceivedAction ${
          action.payload.key
        } was not found`,
      )
      return action
    }

    action.payload.lag = Date.now() - timestamps[action.payload.key]
    delete timestamps[action.payload.key]
    return action
  },
}
