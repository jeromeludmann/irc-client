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
import { JOIN, PRIVMSG } from "@app/actions/messages";

export interface ChannelsState {
  readonly [key: string]: ChannelState;
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

const closeWindow: ChannelsReducer<CloseWindowAction> = (channels, action) => {
  const updatedChannels = { ...channels };

  if (
    isChannel(action.route.channelKey) ||
    isPrivate(action.route.channelKey)
  ) {
    delete updatedChannels[action.route.channelKey];
    return updatedChannels;
  }

  Object.keys(channels).forEach(channelKey => {
    if (isChannel(channelKey) || isPrivate(channelKey)) {
      delete updatedChannels[channelKey];
    }
  });

  return updatedChannels;
};

// const join: ChannelsReducer<JoinAction> = (channels, action, extraStates) => ({
//   ...channels,
//   [action.payload.channel]: reduceChannel(
//     channels[action.payload.channel],
//     action,
//     extraStates,
//   ),
// });

// const privmsg: ChannelsReducer<PrivmsgAction> = (
//   channels,
//   action,
//   extraStates,
// ) => {
//   if (!isChannel(action.route.channelKey)) {
//     // create channel key node
//   }
//   if (!channels.hasOwnProperty(action.route.channelKey)) {
//     return {
//       ...channels,
//       [action.route.channelKey]: reduceChannel(
//         channels[action.route.channelKey],
//         action,
//         extraStates,
//       ),
//     };
//   }

//   return channels;
// };

const broadcastActive: ChannelsReducer = (channels, action, extraStates) => {
  const key = extraStates.route.channelKey;
  return {
    ...channels,
    [key]: reduceChannel(channels[key], action, extraStates),
  };
};

const broadcastAll: ChannelsReducer = (channels, action, extraStates) => {
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
};

const map: { [action: string]: ChannelsReducer } = {
  [CLOSE_WINDOW]: closeWindow,
};

const routes: { [channelKey: string]: ChannelsReducer } = {
  [BROADCAST_NONE]: channels => channels,
  [BROADCAST_ACTIVE]: broadcastActive,
  [BROADCAST_ALL]: broadcastAll,
};

export const reduceChannels = (
  channels = channelsInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState; user: UserState },
): ChannelsState => {
  const channelKey = action.route.channelKey;

  if (!channelKey) {
    return channels;
  }

  if (routes.hasOwnProperty(channelKey)) {
    return routes[channelKey](channels, action, extraStates);
  }

  if (map.hasOwnProperty(action.type)) {
    return map[action.type](channels, action, extraStates);
  }

  if (
    channels.hasOwnProperty(channelKey) ||
    action.type === PRIVMSG ||
    action.type === JOIN
  ) {
    return {
      ...channels,
      [channelKey]: reduceChannel(channels[channelKey], action, extraStates),
    };
  }

  return channels;
};
