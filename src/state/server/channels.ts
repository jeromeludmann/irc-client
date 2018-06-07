import { Scope } from "@app/types";
import { pipeToReducer } from "@app/pipeToReducer";
import channel, { ChannelState } from "@app/state/channel";
import {
  AddChannelAction,
  RemoveChannelAction,
  ChannelListTypes,
} from "@app/actions/channel";

export interface ChannelListState {
  [key: string]: ChannelState;
}

export default function(
  channels: ChannelListState = {},
  action: { scope: Scope } & (AddChannelAction | RemoveChannelAction),
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
