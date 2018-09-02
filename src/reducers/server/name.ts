import { Action, Reducer } from "redux";
import { ReplyMyInfoReceivedAction, RPL_MYINFO_RECEIVED } from "@app/actions/messages";

export type ServerNameState = string;

export const serverNameInitialState: ServerNameState = "<unknown>";

const handlers: { [action: string]: Reducer } = {
  [RPL_MYINFO_RECEIVED]: (_, action: ReplyMyInfoReceivedAction) => action.payload.serverName,
};

export const reduceServerName = (
  name: ServerNameState = serverNameInitialState,
  action: Action,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](name, action)
    : name;
