import { Action } from "redux";
import { Route, STATUS, isStatus, RoutedAction } from "@app/Route";
import {
  SWITCH_WINDOW,
  SwitchWindowAction,
  CLOSE_WINDOW,
  CloseWindowAction
} from "@app/actions/ui";
import { ServersState } from "@app/reducers/servers";
import { ReceiveJoinAction, RECEIVE_JOIN } from "@app/actions/msgIncoming";

export type RouteState = Route;

export const routeInitialState: RouteState = {
  serverKey: "",
  channelKey: STATUS
};

type RouteReducer<A = Action> = (
  state: RouteState,
  action: A,
  extraStates: { servers: ServersState }
) => RouteState;

const handlers: { [action: string]: RouteReducer } = {
  [RECEIVE_JOIN]: (route, action: ReceiveJoinAction, extraStates) =>
    action.payload.user.nick ===
    extraStates.servers[action.route.serverKey].user.nick
      ? action.route
      : route,

  [CLOSE_WINDOW]: (route, _action: CloseWindowAction, extraStates) => {
    if (isStatus(route.channelKey)) {
      const keys = Object.keys(extraStates.servers);
      return keys.length > 1
        ? {
            serverKey: keys.filter(key => key !== route.serverKey)[0],
            channelKey: STATUS
          }
        : route;
    }

    return { ...route, channelKey: STATUS };
  },

  // TODO use extraStates and check if the given route exists
  [SWITCH_WINDOW]: (_, action: SwitchWindowAction) => action.route
};

export const reduceRoute = (
  routeState = routeInitialState,
  action: RoutedAction,
  extraStates: { servers: ServersState }
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](routeState, action, extraStates)
    : routeState;
