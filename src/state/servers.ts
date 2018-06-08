import server, { ServerState } from "@app/state/server";
import { RootState } from "@app/state";
import { RoutedAction, ServerRoute } from "@app/Route";

export interface ServerListState {
  [key: string]: ServerState;
}

const serversInitialState = {};

export default function(
  servers: ServerListState = serversInitialState,
  action: RoutedAction<ServerRoute>,
): ServerListState {
  return action.route && action.route.server
    ? {
        ...servers,
        [action.route.server]: server(servers[action.route.server], action),
      }
    : servers;
}

export function selectServers(state: RootState) {
  return state.servers;
}
