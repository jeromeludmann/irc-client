import reduceChannel, { ChannelState } from "@app/state/channel";
import { RoutedAction, Route } from "@app/actions/Route";
import { ActiveState } from "@app/state/active";

export interface ChannelRouterState {
  readonly [key: string]: ChannelState;
}

export type ChannelRouterAction = RoutedAction;

interface ExtraParams {
  readonly route: Route;
  readonly active: ActiveState;
}

export const channelsInitialState: ChannelRouterState = {};

export default function(
  channels = channelsInitialState,
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
