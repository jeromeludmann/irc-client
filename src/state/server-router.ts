import reduceServer, { ServerState } from "@app/state/server";
import { RoutedAction, Route } from "@app/actions/Route";
import { ActiveState } from "@app/state/active";

export interface ServerRouterState {
  [key: string]: ServerState;
}

export type ServerRouterAction = RoutedAction;

interface ExtraParams {
  route: Route;
  active: ActiveState;
}

const initialState = {};

export default function reduceServers(
  servers: ServerRouterState = initialState,
  action: ServerRouterAction,
  { route, active }: ExtraParams,
): ServerRouterState {
  return route.server
    ? {
        ...servers,
        [route.server]: reduceServer(servers[route.server], action, {
          route,
          active,
        }),
      }
    : servers;
}
