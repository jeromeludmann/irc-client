import { ServerState, reduceServer } from "@app/reducers/server";
import { RoutedAction } from "@app/Route";
import { RouteState } from "@app/reducers/route";

export interface ServersState {
  readonly [key: string]: ServerState;
}

export const serversInitialState: ServersState = {};

export const reduceServers = (
  servers = serversInitialState,
  action: RoutedAction,
  states: { active: RouteState },
): ServersState =>
  action.route && action.route.serverKey
    ? {
        ...servers,
        [action.route.serverKey]: reduceServer(
          servers[action.route.serverKey],
          action,
          states,
        ),
      }
    : servers;
