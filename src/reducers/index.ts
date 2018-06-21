import { Action } from "redux";
import reduceActiveWindow, {
  WindowState,
  WindowAction,
  windowInitialState,
} from "@app/reducers/window";
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
  readonly active: WindowState;
};

type RootAction = Action;

export const rootInitialState = {
  user: userInitialState,
  servers: serversInitialState,
  active: windowInitialState,
};

export default (state = rootInitialState, action: RootAction): RootState => ({
  user: reduceUser(state.user, action as UserAction, { user: state.user }),
  servers: reduceServers(state.servers, action as ServerRouterAction, {
    user: state.user,
    route: (action as RootAction & { route: Route }).route || state.active,
    active: state.active,
  }),
  active: reduceActiveWindow(state.active, action as WindowAction, {
    user: state.user,
  }),
});
