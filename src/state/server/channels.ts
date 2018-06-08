import channel, { ChannelState } from "@app/state/channel";
import { RoutedAction, ChannelRoute } from "@app/Route";
import { valueInitialState } from "@app/state/input/value";
import { historyInitialState } from "@app/state/input/history";

export interface ChannelListState {
  [key: string]: ChannelState;
}

const initialState = {
  status: {
    messages: [],
    input: {
      value: valueInitialState,
      dirtyValue: valueInitialState,
      history: historyInitialState,
    },
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
