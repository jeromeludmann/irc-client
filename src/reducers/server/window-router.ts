import { Action } from "redux";
import reduceWindow, {
  WindowState,
  windowInitialState,
} from "@app/reducers/window";
import { Route, STATUS_WINDOW, RAW_WINDOW } from "@app/Route";
import { ActiveWindowState } from "@app/reducers/active";
import { UserState } from "@app/reducers/user";

export interface WindowRouterState {
  readonly [key: string]: WindowState;
}

export type WindowRouterAction = Action;

interface ExtraParams {
  readonly user: UserState;
  readonly route: Route;
  readonly active: ActiveWindowState;
}

export const windowRouterInitialState: WindowRouterState = {
  [RAW_WINDOW]: windowInitialState,
  [STATUS_WINDOW]: windowInitialState,
};

export default (
  windowRouter = windowRouterInitialState,
  action: WindowRouterAction,
  { user, route, active }: ExtraParams,
): WindowRouterState => {
  // // TODO broadcast actions if needed
  // if (!route.window) {
  //   return {
  //     ...windowRouter,
  //   };
  // } else {
  return route.window
    ? {
        ...windowRouter,
        [route.window]: reduceWindow(windowRouter[route.window], action, {
          user,
          active,
          route,
        }),
      }
    : windowRouter;
  // }
};
