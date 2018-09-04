import { Middleware } from "redux";
import {
  SendPingToServerAction,
  PongFromServerReceivedAction,
  SEND_PING_TO_SERVER,
  PONG_FROM_SERVER_RECEIVED,
} from "@app/actions/messages";

type LagAction = SendPingToServerAction | PongFromServerReceivedAction;

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

  [PONG_FROM_SERVER_RECEIVED]: (action: PongFromServerReceivedAction) => {
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
