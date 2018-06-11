import { Action } from "redux";
import reduceModes, { ModesState } from "@app/state/server/modes";
import reduceChannels, {
  ChannelRouterState,
  ChannelRouterAction,
} from "@app/state/server/channel-router";
import { Route } from "@app/actions/Route";
import { ActiveState } from "@app/state/active";

export type ServerState = {
  modes: ModesState;
  channels: ChannelRouterState;
};

export type ServerAction = Action;

interface ExtraParams {
  route: Route;
  active: ActiveState;
}

export default function reduceServer(
  state: ServerState,
  action: ServerAction,
  { route, active }: ExtraParams,
) {
  return {
    modes: reduceModes(state.modes),
    channels: reduceChannels(state.channels, action as ChannelRouterAction, {
      route,
      active,
    }),
  };
}
