import {
  PongFromServerReceivedAction,
  PONG_FROM_SERVER_RECEIVED,
} from "@app/actions/messages";
import { Reducer, Action } from "redux";

export type ServerLagState = number;

export const serverLagInitialState = 0;

const handlers: { [action: string]: Reducer<ServerLagState> } = {
  [PONG_FROM_SERVER_RECEIVED]: (
    _serverLag,
    action: PongFromServerReceivedAction,
  ) => action.payload.lag,
};

export const reduceLag = (
  serverLag: ServerLagState = serverLagInitialState,
  action: Action,
): ServerLagState =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](serverLag, action)
    : serverLag;
