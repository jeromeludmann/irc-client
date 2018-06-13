import { Action } from "redux";
import reduceModes, {
  ModesState,
  modesInitialState,
} from "@app/state/server/modes";
import reduceChannels, {
  ChannelRouterState,
  ChannelRouterAction,
  channelsInitialState,
} from "@app/state/server/channel-router";
import { Route } from "@app/state/Route";
import { ActiveRouteState } from "@app/state/active";

export type ServerState = {
  readonly modes: ModesState;
  readonly channels: ChannelRouterState;
};

export type ServerAction = Action;

interface ExtraParams {
  route: Route;
  active: ActiveRouteState;
}
export const serverInitialState: ServerState = {
  channels: channelsInitialState,
  modes: modesInitialState,
};

export default function reduceServer(
  server = serverInitialState,
  action: ServerAction,
  { route, active }: ExtraParams,
): ServerState {
  return {
    modes: reduceModes(server.modes),
    channels: reduceChannels(server.channels, action as ChannelRouterAction, {
      route,
      active,
    }),
  };
}
