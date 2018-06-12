import { Action } from "redux";
import { RoutedAction } from "@app/actions/Route";
import reduceActive, {
  ActiveState,
  ActiveAction,
  activeInitialState,
} from "@app/state/active";
import reduceServers, {
  ServerRouterState,
  ServerRouterAction,
  serversInitialState,
} from "@app/state/server-router";

export type RootState = {
  readonly servers: ServerRouterState;
  readonly active: ActiveState;
};

type RootAction = Action;

export const rootInitialState = {
  servers: serversInitialState,
  active: activeInitialState,
};

export default function reduce(state: RootState, action: RootAction) {
  return {
    servers: reduceServers(state.servers, action as ServerRouterAction, {
      route: (action as RoutedAction).route || state.active,
      active: state.active,
    }),
    active: reduceActive(state.active, action as ActiveAction),
  };
}
