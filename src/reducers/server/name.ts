import { Action, Reducer } from "redux";
import {
  ReceiveReplyMyInfoAction,
  RECEIVE_RPL_MYINFO,
} from "@app/actions/msgIncoming";

export type ServerNameState = Readonly<string>;

export const serverNameInitialState = "<unknown>";

const handlers: { [action: string]: Reducer } = {
  [RECEIVE_RPL_MYINFO]: (_, action: ReceiveReplyMyInfoAction) =>
    action.payload.serverName,
};

export const reduceServerName = (
  name: ServerNameState = serverNameInitialState,
  action: Action,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](name, action)
    : name;
