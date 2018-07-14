import { Action } from "redux";
import { Route, STATUS, isStatus } from "@app/Route";
import {
  SWITCH_WINDOW,
  SwitchWindowAction,
  CLOSE_WINDOW,
  CloseWindowAction,
} from "@app/actions/ui";
import { ServersState } from "@app/reducers/servers";
import { JoinAction, JOIN } from "@app/actions/messages";
import { mapReducer } from "@app/reducers/_map";

export type RouteState = Route;

export const routeInitialState: RouteState = {
  serverKey: "",
  channelKey: STATUS,
};

type RouteReducer<A = Action> = (
  state: RouteState,
  action: A,
  extraStates: { servers: ServersState },
) => RouteState;

const join: RouteReducer<JoinAction> = (route, action, extraStates) =>
  action.payload.user.nick ===
  extraStates.servers[action.route.serverKey].user.nick
    ? action.route
    : route;

const closeWindow: RouteReducer<CloseWindowAction> = (
  route,
  _,
  extraStates,
) => {
  if (isStatus(route.channelKey)) {
    const keys = Object.keys(extraStates.servers);
    return keys.length > 1
      ? {
          serverKey: keys.filter(key => key !== route.serverKey)[0],
          channelKey: STATUS,
        }
      : route;
  }

  return { ...route, channelKey: STATUS };
};

// TODO use extraStates and check if the given route exists
const switchRoute: RouteReducer<SwitchWindowAction> = (_, action) =>
  action.route;

const map: { [action: string]: RouteReducer } = {
  [JOIN]: join,
  [CLOSE_WINDOW]: closeWindow,
  [SWITCH_WINDOW]: switchRoute,
};

export const reduceRoute = mapReducer<RouteState, { servers: ServersState }>(
  map,
);
