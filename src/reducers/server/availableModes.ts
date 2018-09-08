import { Reducer, Action } from "redux";
import {
  ReplyMyInfoReceivedAction,
  RPL_MYINFO_RECEIVED,
} from "@app/actions/messages";

export type AvailableServerModesState = {
  user: string[];
  channel: string[];
};

export type AvailableModesAction = ReplyMyInfoReceivedAction;

export const availableServerModesInitialState: AvailableServerModesState = {
  user: [],
  channel: [],
};

const handlers: { [action: string]: Reducer<AvailableServerModesState> } = {
  [RPL_MYINFO_RECEIVED]: (_, action: ReplyMyInfoReceivedAction) => ({
    user: action.payload.availableUserModes,
    channel: action.payload.availableChannelModes,
  }),
};

export const reduceAvailableServerModes = (
  availableModes = availableServerModesInitialState,
  action: Action,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](availableModes, action)
    : availableModes;
