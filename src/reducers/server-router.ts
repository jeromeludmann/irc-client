import reduceServer, {
  ServerState,
  ServerAction,
} from "@app/reducers/server/server";
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
  params: ExtraParams,
): ServerRouterState =>
  params.route.serverKey
    ? {
        ...servers,
        [params.route.serverKey]: reduceServer(
          servers[params.route.serverKey],
          action as ServerAction,
          params,
        ),
      }
    : servers;
