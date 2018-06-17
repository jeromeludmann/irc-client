import reduceServer, { ServerState } from "@app/state/server";
import { ActiveRouteState } from "@app/state/active";
import { Action } from "redux";
import { Route } from "@app/state/Route";

export interface ServerRouterState {
  readonly [key: string]: ServerState;
}

export type ServerRouterAction = Action;

interface ExtraParams {
  readonly route: Route;
  readonly active: ActiveRouteState;
}

export const serversInitialState: ServerRouterState = {};

export default function reduceServers(
  servers = serversInitialState,
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
