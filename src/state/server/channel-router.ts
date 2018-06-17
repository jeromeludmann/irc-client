import reduceChannel, {
  ChannelState,
  channelInitialState,
} from "@app/state/channel";
import { Route } from "@app/state/Route";
import { ActiveRouteState } from "@app/state/active";
import { Action } from "redux";

export interface ChannelRouterState {
  readonly [key: string]: ChannelState;
}

export type ChannelRouterAction = Action;

interface ExtraParams {
  readonly route: Route;
  readonly active: ActiveRouteState;
}

export const channelsInitialState: ChannelRouterState = {
  status: channelInitialState,
};

export default function reduceChannels(
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
