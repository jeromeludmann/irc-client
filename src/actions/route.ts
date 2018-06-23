import { Action } from "redux";
import { Route } from "@app/Route";

export const SWITCH_CHANNEL = "UI/SWITCH_WINDOW";

export interface SwitchRouteAction extends Action<typeof SWITCH_CHANNEL> {
  route: Route;
}

export function switchWindow(route: Route): SwitchRouteAction {
  return {
    type: SWITCH_CHANNEL,
    route,
  };
}
