import reduceChannel, { ChannelState } from "@app/state/channel";
import { RoutedAction, Route } from "@app/actions/Route";
import { ActiveState } from "@app/state/active";
import { inputInitialState } from "@app/state/input";

export interface ChannelRouterState {
  [key: string]: ChannelState;
}

export type ChannelRouterAction = RoutedAction;

interface ExtraParams {
  route: Route;
  active: ActiveState;
}

const initialState = {
  status: {
    messages: [],
    input: inputInitialState,
    unread: false,
  },
};

export default function(
  channels: ChannelRouterState = initialState,
  action: ChannelRouterAction,
  { route, active }: ExtraParams,
): ChannelRouterState {
  return route.channel
    ? {
        ...channels,
        [route.channel]: reduceChannel(channels[route.channel], action, {
          active,
        }),
      }
    : channels;
}
