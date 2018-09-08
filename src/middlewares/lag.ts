import { Middleware } from "redux";
import {
  ReceivePongFromServerAction,
  RECEIVE_PONG_FROM_SERVER,
} from "@app/actions/msgIncoming";
import {
  SendPingToServerAction,
  SEND_PING_TO_SERVER,
} from "@app/actions/msgOutgoing";

type LagAction = SendPingToServerAction | ReceivePongFromServerAction;

export const lag: Middleware = () => next => (action: LagAction) => {
  next(
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](action)
      : action,
  );
};

const handlers: { [action: string]: (action: LagAction) => LagAction } = {
  [SEND_PING_TO_SERVER]: (action: SendPingToServerAction) => {
    timestamps[action.payload.key] = Date.now();
    return action;
  },

  [RECEIVE_PONG_FROM_SERVER]: (action: ReceivePongFromServerAction) => {
    if (!timestamps.hasOwnProperty(action.payload.key)) {
      // tslint:disable-next-line
      console.log(
        `key of PongFromServerReceivedAction ${
          action.payload.key
        } was not found`,
      );
      return action;
    }

    action.payload.lag = Date.now() - timestamps[action.payload.key];
    delete timestamps[action.payload.key];
    return action;
  },
};

const timestamps: { [key: string]: number } = {};
