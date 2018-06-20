import { Action } from "redux";
import reduceActiveWindow, {
  ActiveWindowState,
  ActiveWindowAction,
  activeInitialState,
} from "@app/reducers/active";
import reduceServers, {
  ServerRouterState,
  serversInitialState,
  ServerRouterAction,
} from "@app/reducers/server-router";
import { Route } from "@app/Route";
import reduceUser, {
  UserState,
  userInitialState,
  UserAction,
} from "@app/reducers/user";

export type RootState = {
  readonly user: UserState;
  readonly servers: ServerRouterState;
  readonly active: ActiveWindowState;
};

type RootAction = Action;

export const rootInitialState = {
  user: userInitialState,
  servers: serversInitialState,
  active: activeInitialState,
};

export default (state = rootInitialState, action: RootAction): RootState => ({
  user: reduceUser(state.user, action as UserAction, { user: state.user }),
  servers: reduceServers(state.servers, action as ServerRouterAction, {
    user: state.user,
    route: (action as RootAction & { route: Route }).route || state.active,
    active: state.active,
  }),
  active: reduceActiveWindow(state.active, action as ActiveWindowAction, {
    user: state.user,
  }),
});
