import { Action } from "redux";
import { mapReducer } from "@app/reducers/_map";
import { ReplyMyInfoAction, RPL_MYINFO } from "@app/actions/messages";

export type ServerAvailableModesState = {
  user: string[];
  channel: string[];
};

export const serverAvailableModesInitialState: ServerAvailableModesState = {
  user: [],
  channel: [],
};

type AvailableModesReducer<A = Action> = (
  state: ServerAvailableModesState,
  action: A,
) => ServerAvailableModesState;

const replyMyInfo: AvailableModesReducer<ReplyMyInfoAction> = (_, action) => ({
  user: action.payload.availableUserModes,
  channel: action.payload.availableChannelModes,
});

const map: { [action: string]: AvailableModesReducer } = {
  [RPL_MYINFO]: replyMyInfo,
};

export const reduceServerAvailableModes = mapReducer<ServerAvailableModesState>(
  map,
);
