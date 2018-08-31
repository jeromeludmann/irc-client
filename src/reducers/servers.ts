import { ServerState, reduceServer } from "@app/reducers/server";
import { RoutedAction, isStatus } from "@app/Route";
import { RouteState } from "@app/reducers/route";
import { CLOSE_WINDOW } from "@app/actions/ui";
import { LOOKUP_SUCCESS, LOOKUP_FAILED } from "@app/actions/socket";

export interface ServersState {
  readonly [key: string]: ServerState;
}

export const serversInitialState: ServersState = {};

// TODO rewrite me better
export const reduceServers = (
  servers = serversInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState },
): ServersState => {
  if (action.type === CLOSE_WINDOW) {
    if (isStatus(action.route.channelKey)) {
      const isLastWindow = Object.keys(servers).length <= 1;

      if (!isLastWindow) {
        const updatedServers = { ...servers };
        delete updatedServers[action.route.serverKey];
        return updatedServers;
      }
    }
  }

  return (action.route && servers.hasOwnProperty(action.route.serverKey)) ||
    (action.type === LOOKUP_SUCCESS || action.type === LOOKUP_FAILED)
    ? {
        ...servers,
        [action.route.serverKey]: reduceServer(
          servers[action.route.serverKey],
          action,
          extraStates,
        ),
      }
    : servers;
};
