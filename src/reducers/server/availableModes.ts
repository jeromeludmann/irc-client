import { Reducer, AnyAction } from "redux";
import {
  ReceiveReplyMyInfoAction,
  RECEIVE_RPL_MYINFO,
} from "@app/actions/msgIncoming";

export type AvailableServerModesState = Readonly<{
  user: string[];
  channel: string[];
}>;

export type AvailableModesAction = ReceiveReplyMyInfoAction;

export const availableServerModesInitialState: AvailableServerModesState = {
  user: [],
  channel: [],
};

const handlers: { [action: string]: Reducer<AvailableServerModesState> } = {
  [RECEIVE_RPL_MYINFO]: (_, action: ReceiveReplyMyInfoAction) => ({
    user: action.payload.availableUserModes,
    channel: action.payload.availableChannelModes,
  }),
};

export const reduceAvailableServerModes = (
  availableModes = availableServerModesInitialState,
  action: AnyAction,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](availableModes, action)
    : availableModes;
