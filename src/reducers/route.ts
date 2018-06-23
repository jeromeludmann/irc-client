import { Route, STATUS } from "@app/Route";
import { SwitchRouteAction, SWITCH_CHANNEL } from "@app/actions/route";
import { JoinAction, JOIN } from "@app/actions/incoming";
import { RootState } from "@app/reducers";

export type RouteState = Route;

export type RouteAction = JoinAction | SwitchRouteAction;

export const routeInitialState: RouteState = {
  serverKey: "",
  channelKey: STATUS,
};

export const reduceRoute = (
  state: RootState,
  action: RouteAction,
): RouteState => {
  switch (action.type) {
    case JOIN:
      return action.payload.user.nick ===
        state.servers[action.route.serverKey].user.nick
        ? action.route
        : state.route;

    case SWITCH_CHANNEL:
      return action.route;

    default:
      return state.route;
  }
};
