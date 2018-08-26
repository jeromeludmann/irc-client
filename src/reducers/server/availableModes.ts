import { Reducer } from "redux";
import { ReplyMyInfoAction, RPL_MYINFO } from "@app/actions/messages";

export type AvailableServerModesState = {
  user: string[];
  channel: string[];
};

export type AvailableModesAction = ReplyMyInfoAction;

export const availableServerModesInitialState: AvailableServerModesState = {
  user: [],
  channel: []
};

const handlers: { [action: string]: Reducer<AvailableServerModesState> } = {
  [RPL_MYINFO]: (_, action: ReplyMyInfoAction) => ({
    user: action.payload.availableUserModes,
    channel: action.payload.availableChannelModes
  })
};

export const reduceAvailableServerModes = (
  availableModes = availableServerModesInitialState,
  action: AvailableModesAction
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](availableModes, action)
    : availableModes;
