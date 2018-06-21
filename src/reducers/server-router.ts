import reduceServer, { ServerState } from "@app/reducers/server";
import { WindowState } from "@app/reducers/window";
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
  readonly active: WindowState;
}

export const serversInitialState: ServerRouterState = {};

export default (
  servers = serversInitialState,
  action: ServerRouterAction,
  { user, route, active }: ExtraParams,
): ServerRouterState =>
  route.serverKey
    ? {
        ...servers,
        [route.serverKey]: reduceServer(servers[route.serverKey], action, {
          user,
          route,
          active,
        }),
      }
    : servers;
