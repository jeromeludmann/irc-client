import {
  ChannelState,
  channelInitialState,
  reduceChannel,
} from "@app/reducers/channel";
import {
  STATUS,
  RAW,
  BROADCAST_ALL,
  BROADCAST_NONE,
  RoutedAction,
  isRaw,
  BROADCAST_ACTIVE,
  isPrivate,
  isChannel,
} from "@app/Route";
import { RouteState } from "@app/reducers/route";
import { UserState } from "@app/reducers/server/user";
import { CLOSE_WINDOW, CloseWindowAction } from "@app/actions/ui";
import { JOIN_RECEIVED, PRIVMSG_RECEIVED } from "@app/actions/messages";

export interface ChannelsState {
  [key: string]: ChannelState;
}

export const channelsInitialState: ChannelsState = {
  [RAW]: channelInitialState,
  [STATUS]: channelInitialState,
};

type ChannelsReducer<A = RoutedAction> = (
  channels: ChannelsState,
  action: A,
  extraStates: { route: RouteState; user: UserState },
) => ChannelsState;

const broadcastHandlers: { [channelKey: string]: ChannelsReducer } = {
  [BROADCAST_NONE]: channels => channels,
  [BROADCAST_ACTIVE]: (channels, action, extraStates) => {
    const key = extraStates.route.channelKey;
    return {
      ...channels,
      [key]: reduceChannel(channels[key], action, extraStates),
    };
  },
  [BROADCAST_ALL]: (channels, action, extraStates) => {
    const broadcastedChannels: { [key: string]: ChannelState } = {};
    Object.keys(channels).forEach(key => {
      if (!isRaw(key)) {
        broadcastedChannels[key] = reduceChannel(
          channels[key],
          action,
          extraStates,
        );
      }
    });
    return { ...channels, ...broadcastedChannels };
  },
};

const handlers: { [action: string]: ChannelsReducer } = {
  [CLOSE_WINDOW]: (channels: ChannelsState, action: CloseWindowAction) => {
    const updatedChannels = { ...channels };

    if (
      isChannel(action.route.channelKey) ||
      isPrivate(action.route.channelKey)
    ) {
      delete updatedChannels[action.route.channelKey];
      return updatedChannels;
    }

    // close all server-related windows while closing status window
    Object.keys(channels).forEach(channelKey => {
      if (isChannel(channelKey) || isPrivate(channelKey)) {
        delete updatedChannels[channelKey];
      }
    });

    return updatedChannels;
  },
};

export const reduceChannels = (
  channels = channelsInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState; user: UserState },
): ChannelsState => {
  const channelKey = action.route.channelKey;

  // TODO will never happen since now we autoroute all actions
  if (!channelKey) {
    return channels;
  }

  if (broadcastHandlers.hasOwnProperty(channelKey)) {
    return broadcastHandlers[channelKey](channels, action, extraStates);
  }

  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](channels, action, extraStates);
  }

  if (
    channels.hasOwnProperty(channelKey) ||
    action.type === PRIVMSG_RECEIVED ||
    action.type === JOIN_RECEIVED
  ) {
    return {
      ...channels,
      [channelKey]: reduceChannel(channels[channelKey], action, extraStates),
    };
  }

  return channels;
};
