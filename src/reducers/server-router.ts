import reduceServer, { ServerState } from "@app/reducers/server";
import { ActiveWindowState } from "@app/reducers/active";
import { Action } from "redux";
import { Route } from "@app/Route";
import { UserState } from "@app/reducers/user";

export interface ServerRouterState {
  readonly [key: string]: ServerState;
}

export type ServerRouterAction = Action;

interface ExtraParams {
  readonly user: UserState;
  readonly route: Route;
  readonly active: ActiveWindowState;
}

export const serversInitialState: ServerRouterState = {};

export default (
  servers = serversInitialState,
  action: ServerRouterAction,
  { user, route, active }: ExtraParams,
): ServerRouterState =>
  route.server
    ? {
        ...servers,
        [route.server]: reduceServer(servers[route.server], action, {
          user,
          route,
          active,
        }),
      }
    : servers;
