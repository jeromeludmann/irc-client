import {
  RouteState,
  RouteAction,
  routeInitialState,
  reduceRoute,
} from "@app/reducers/route";
import {
  ServersState,
  serversInitialState,
  reduceServers,
} from "@app/reducers/servers";
import { RoutedAction } from "@app/Route";

export interface RootState {
  readonly servers: ServersState;
  readonly route: RouteState;
}

export const rootInitialState = {
  servers: serversInitialState,
  route: routeInitialState,
};

export const reduce = (
  state = rootInitialState,
  action: RoutedAction,
): RootState => ({
  servers: reduceServers(state.servers, action, { active: state.route }),
  route: reduceRoute(state, action as RouteAction),
});
