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

export const serversInitialState: ServerRouterState = {};

export default function reduceServers(
  servers = serversInitialState,
  action: ServerRouterAction,
  { route, active }: ExtraParams,
): ServerRouterState {
  // tslint:disable-next-line
  console.log("action", action);

  const reducedServer = reduceServer(servers[route.server], action, {
    route,
    active,
  });
  console.log("reduced server", reducedServer);

  return route.server
    ? {
        ...servers,
        [route.server]: reducedServer,
      }
    : servers;
}
