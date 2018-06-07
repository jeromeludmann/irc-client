import channel, { ChannelState } from "@app/state/channel";
import { RoutedAction, ChannelRoute } from "@app/Route";

export interface ChannelListState {
  [key: string]: ChannelState;
}

const initialState = {
  status: {
    messages: [],
    input: { value: "", history: [] },
    unread: false,
  },
};

export default function(
  channels: ChannelListState = initialState,
  action: RoutedAction<ChannelRoute>,
): ChannelListState {
  return action.route && action.route.channel
    ? {
        ...channels,
        [action.route.channel]: channel(channels[action.route.channel], action),
      }
    : channels;
}
