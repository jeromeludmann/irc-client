import reduceServer, { ServerState } from "@app/state/server";
import { RoutedAction, Route } from "@app/actions/Route";
import { ActiveState } from "@app/state/active";

export interface ServerRouterState {
  readonly [key: string]: ServerState;
}

export type ServerRouterAction = RoutedAction;

interface ExtraParams {
  readonly route: Route;
  readonly active: ActiveState;
}

export default function reduceServers(
  servers: ServerRouterState,
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
