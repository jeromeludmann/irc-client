import { ChannelScope } from "@app/types";
import { pipeToReducer } from "@app/pipeToReducer";
import channel, { ChannelState } from "@app/state/channel";

export interface ChannelListState {
  [key: string]: ChannelState;
}

export const ChannelListTypes = {
  ADD: "CHANNEL/ADD",
  REMOVE: "CHANNEL/REMOVE",
};

interface AddChannelAction {
  type: typeof ChannelListTypes.ADD;
  payload: ChannelScope;
}

interface RemoveChannelAction {
  type: typeof ChannelListTypes.REMOVE;
  payload: ChannelScope;
}

type Action = { scope: ChannelScope } & (
  | AddChannelAction
  | RemoveChannelAction);

const initialState: ChannelListState = {};

export default function(
  channels = initialState,
  action: Action,
): ChannelListState {
  return pipeToReducer({
    key: action.scope && action.scope.channel,
    reducer: channel,
    actionTypes: {
      add: ChannelListTypes.ADD,
      remove: ChannelListTypes.REMOVE,
    },
  })(channels, action);
}
