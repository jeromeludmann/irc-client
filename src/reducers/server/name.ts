import { Action } from "redux";
import { mapReducer } from "@app/reducers/_map";
import { ReplyMyInfoAction, RPL_MYINFO } from "@app/actions/messages";

export type ServerNameState = string;

export const serverNameInitialState: ServerNameState = "<unknown>";

type ServerNameReducer<A = Action> = (
  name: ServerNameState,
  action: A,
) => ServerNameState;

const replyMyInfo: ServerNameReducer<ReplyMyInfoAction> = (_, action) =>
  action.payload.serverName;

const map: { [action: string]: ServerNameReducer } = {
  [RPL_MYINFO]: replyMyInfo,
};

export const reduceServerName = mapReducer<ServerNameState>(map);
