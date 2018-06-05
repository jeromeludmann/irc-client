import { ChannelScope } from "@app/types";
import { pipeReducer } from "@app/pipeReducer";
import channel, { ChannelState } from "@app/state/channel";

export type ChannelMapState = {
  [key: string]: ChannelState;
};

interface ChannelsAction {
  type: "ADD_CHANNEL";
  payload: ChannelScope;
}

const channelsInitialState: ChannelMapState = {};

export default function(
  channels = channelsInitialState,
  action: ChannelsAction,
): ChannelMapState {
  return pipeReducer({
    key: action.payload && action.payload.channel,
    reducer: channel,
    actionTypes: {
      add: "ADD_CHANNEL",
      remove: "REMOVE_CHANNEL",
    },
  })(channels, action);
}
