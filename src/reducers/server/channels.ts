import {
  ChannelState,
  channelInitialState,
  reduceChannel,
} from "@app/reducers/channel";
import { STATUS, RAW, BROADCAST, NONE, RoutedAction } from "@app/Route";
import { RouteState } from "@app/reducers/route";
import { UserState } from "@app/reducers/server/user";

export interface ChannelsState {
  readonly [key: string]: ChannelState;
}

export const channelsInitialState: ChannelsState = {
  [RAW]: channelInitialState,
  [STATUS]: channelInitialState,
};

const registry: {
  [channelKey: string]: (
    channels: ChannelsState,
    action: RoutedAction,
    states: { active: RouteState; user: UserState },
  ) => ChannelsState;
} = {
  [NONE](channels) {
    return channels;
  },
  [BROADCAST](channels, action, params) {
    const broadcastedChannels: { [key: string]: ChannelState } = {};
    Object.keys(channels).forEach(key => {
      if (key !== RAW) {
        broadcastedChannels[key] = reduceChannel(channels[key], action, params);
      }
    });
    return { ...channels, ...broadcastedChannels };
  },
};

export const reduceChannels = (
  channels = channelsInitialState,
  action: RoutedAction,
  states: { active: RouteState; user: UserState },
): ChannelsState => {
  const channelKey = action.route.channelKey;

  if (registry.hasOwnProperty(channelKey)) {
    return registry[channelKey](channels, action, states);
  }

  return channelKey
    ? {
        ...channels,
        [channelKey]: reduceChannel(channels[channelKey], action, states),
      }
    : channels;
};
