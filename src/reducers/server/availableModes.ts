import { Reducer } from "redux";
import { ReplyMyInfoAction, RPL_MYINFO } from "@app/actions/messages";
import { RoutedAction } from "@app/Route";

export type AvailableServerModesState = {
  user: string[];
  channel: string[];
};

export const availableServerModesInitialState: AvailableServerModesState = {
  user: [],
  channel: [],
};

const handlers: { [action: string]: Reducer<AvailableServerModesState> } = {
  [RPL_MYINFO]: (_, action: ReplyMyInfoAction) => ({
    user: action.payload.availableUserModes,
    channel: action.payload.availableChannelModes,
  }),
};

export const reduceAvailableServerModes = (
  availableModes = availableServerModesInitialState,
  action: RoutedAction,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](availableModes, action)
    : availableModes;
