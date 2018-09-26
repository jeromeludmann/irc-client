import { Middleware } from 'redux'
import {
  ReceivePongFromServerAction,
  RECEIVE_PONG_FROM_SERVER,
} from '@app/actions/messages/incoming'
import {
  SendPingToServerAction,
  SEND_PING_TO_SERVER,
} from '@app/actions/messages/outgoing'

type LagAction = SendPingToServerAction | ReceivePongFromServerAction

export const lag: Middleware = () => next => (action: LagAction) => {
  next(action.type in handlers ? handlers[action.type](action) : action)
}

const handlers: { [action: string]: (action: LagAction) => LagAction } = {
  [SEND_PING_TO_SERVER]: (action: SendPingToServerAction) => {
    timestamps[action.payload.key] = Date.now()
    return action
  },

  [RECEIVE_PONG_FROM_SERVER]: (action: ReceivePongFromServerAction) => {
    if (!(action.payload.key in timestamps)) {
      // tslint:disable-next-line
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

const timestamps: { [key: string]: number } = {}
