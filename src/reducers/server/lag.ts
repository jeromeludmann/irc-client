import {
  ReceivePongFromServerAction,
  RECEIVE_PONG_FROM_SERVER,
} from "@app/actions/msgIncoming";
import { Reducer, Action } from "redux";

export type ServerLagState = Readonly<number>;

export const serverLagInitialState = 0;

const handlers: { [action: string]: Reducer<ServerLagState> } = {
  [RECEIVE_PONG_FROM_SERVER]: (
    _serverLag,
    action: ReceivePongFromServerAction,
  ) => action.payload.lag,
};

export const reduceLag = (
  serverLag: ServerLagState = serverLagInitialState,
  action: Action,
): ServerLagState =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](serverLag, action)
    : serverLag;
