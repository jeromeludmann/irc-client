import { Action } from "redux";
import reduceModes, {
  ModesState,
  modesInitialState,
} from "@app/reducers/server/modes";
import { ActiveWindowState } from "@app/reducers/active";
import reduceWindowRouter, {
  WindowRouterState,
  windowRouterInitialState,
  WindowRouterAction,
} from "@app/reducers/server/window-router";
import { Route } from "@app/Route";
import { UserState } from "@app/reducers/user";

export type ServerState = {
  readonly modes: ModesState;
  readonly windows: WindowRouterState;
};

export type ServerAction = Action;

interface ExtraParams {
  user: UserState;
  route: Route;
  active: ActiveWindowState;
}

export const serverInitialState: ServerState = {
  modes: modesInitialState,
  windows: windowRouterInitialState,
};

export default (
  server = serverInitialState,
  action: ServerAction,
  params: ExtraParams,
): ServerState => ({
  modes: reduceModes(server.modes),
  windows: reduceWindowRouter(
    server.windows,
    action as WindowRouterAction,
    params,
  ),
});
