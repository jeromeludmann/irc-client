import {
  RouteState,
  routeInitialState,
  reduceRoute,
} from "@app/reducers/route";
import {
  ServersState,
  serversInitialState,
  reduceServers,
} from "@app/reducers/servers";
import { RoutedAction } from "@app/Route";
import { Reducer } from "redux";

export type AppState = Readonly<{
  servers: ServersState;
  route: RouteState;
}>;

export const rootInitialState = {
  servers: serversInitialState,
  route: routeInitialState,
};

export const reduce: Reducer<AppState, RoutedAction> = (
  state = rootInitialState,
  action,
) => ({
  servers: reduceServers(state.servers, action, { route: state.route }),
  route: reduceRoute(state.route, action, { servers: state.servers }),
});
