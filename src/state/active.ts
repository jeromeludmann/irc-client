import {
  SetActiveRouteAction,
  SET_ACTIVE_ROUTE,
} from "@app/actions/ui/active-route";
import { Route } from "@app/state/Route";

export type ActiveRouteState = { server: string } & Route;

export type ActiveRouteAction = SetActiveRouteAction;

export const activeInitialState: ActiveRouteState = {
  server: "localhost", // TODO
  channel: "status",
};

export default function reduceActiveRoute(
  active = activeInitialState,
  action: ActiveRouteAction,
) {
  switch (action.type) {
    case SET_ACTIVE_ROUTE:
      return {
        server: action.payload.server,
        channel: action.payload.channel,
      };

    default:
      return active;
  }
}
