import { RPL_MYINFO, ReplyMyInfoAction } from "@app/actions/incoming";

export type ServerNameState = string;

export type ServerNameAction = ReplyMyInfoAction;

export const serverNameInitialState: ServerNameState = "<unknown>";

export const reduceServerName = (
  name = serverNameInitialState,
  action: ServerNameAction,
) => {
  switch (action.type) {
    case RPL_MYINFO:
      return action.payload.serverName;

    default:
      return name;
  }
};
