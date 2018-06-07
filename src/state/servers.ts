import server, { ServerState } from "@app/state/server";
import { RootState } from "@app/state";
import { RoutedAction, ServerRoute } from "@app/Route";

export interface ServerListState {
  [key: string]: ServerState;
}

export default function(
  servers: ServerListState = {},
  action: RoutedAction<ServerRoute>,
): ServerListState {
  return action.route && action.route.server
    ? {
        ...servers,
        [action.route.server]: server(servers[action.route.server], action),
      }
    : servers;
}

export function getServers(state: RootState) {
  return state.servers;
}
